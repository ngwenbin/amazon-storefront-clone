import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import merge from "deepmerge";
import { useMemo } from "react";
import { schema } from "./schema";

let apolloClient;

function createIsomorphLink() {
  if (typeof window === "undefined") {
    return new SchemaLink({ schema });
  }
  return new HttpLink({
    uri: "/api/graphql",
    credentials: "same-origin",
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const apolloInstance = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = apolloInstance.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    apolloInstance.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return apolloInstance;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = apolloInstance;

  return apolloInstance;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
