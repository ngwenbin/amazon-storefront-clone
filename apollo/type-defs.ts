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

  enum Categories {
    BOOKS
    GROCERY
    AUTOMOTIVE
    GARDEN
    CRAFTS
    COLLECTIBLES
    FOOD
  }

  type Product {
    id: ID!
    name: String
    createdAt: String!
    skuId: String
    brand: String
    description: String
    categories: Categories!
    ingredients: String
    media: [File]
  }

  type GetProducts {
    data: [Product]!
    totalCount: Int!
  }

  input ProductFilterInput {
    categories: String
  }

  input PaginationInput {
    limit: Int!
    offset: Int
    filter: ProductFilterInput
  }

  type Query {
    viewer: User
    getProducts(input: PaginationInput!): GetProducts!
    getPaginatedProducts(input: PaginationInput!): GetProducts!
  }
`;
