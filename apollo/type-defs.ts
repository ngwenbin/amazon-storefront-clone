import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  enum Categories {
    BOOKS
    GROCERY
    AUTOMOTIVE
    GARDEN
    CRAFTS
    COLLECTIBLES
    FOOD
  }

  enum Sort {
    ascending
    descending
  }

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
    categories: Categories!
    ingredients: String
    media: [File]
    price: Float
    popularity: Float
  }

  type GetProducts {
    data: [Product]!
    totalCount: Int!
  }

  input ProductFilterInput {
    name: String
    brand: String
    description: String
    categories: String
    ingredients: String
  }

  input ProductSortInput {
    createdAt: Sort
    price: Sort
    popularity: Sort
  }

  input PaginationInput {
    limit: Int!
    offset: Int
    filter: [ProductFilterInput]
    searchKey: String
    orderBy: ProductSortInput
  }

  type Query {
    viewer: User
    getProducts(input: PaginationInput!): GetProducts!
    getPaginatedProducts(input: PaginationInput!): GetProducts!
  }
`;
