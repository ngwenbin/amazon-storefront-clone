import { generateRandomProducts } from "../utils";

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getProducts() {
      const products = generateRandomProducts();
      return products;
    },
  },
};
