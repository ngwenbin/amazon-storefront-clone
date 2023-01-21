import { generateRandomProducts } from "../utils";

export const resolvers = {
  Query: {
    getProducts() {
      const products = generateRandomProducts();
      return products;
    },
  },
};
