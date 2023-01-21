import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type File {
    src: String!
    name: String
    size: String
    format: String
  }

  type Product {
    id: ID!
    name: String
    createdAt: String!
    skuId: String
    brand: String
    description: String
    ingredients: String
    media: [File]
  }

  type Query {
    viewer: User
    getProducts: [Product]!
  }
`;
