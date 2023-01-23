/* eslint-disable @typescript-eslint/no-unused-vars */
import { randNumber } from "@ngneat/falso";
import { GraphQLError } from "graphql";
import { delay } from "../utils";
import data from "./mockData.json";

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    async getProducts(_parent, args, _context, _info) {
      try {
        console.log("GETTING PRODUCTS", args);
        await delay(randNumber({ min: 400, max: 1000, precision: 100 }));
        const {
          input: { limit, offset },
        } = args;

        const elementStart = offset ?? 0;
        const elementEnd = limit + elementStart;
        const maxDataSize = data.data.length;
        const products = data.data.slice(
          elementStart,
          elementEnd > maxDataSize ? maxDataSize : elementEnd
        );

        return { data: products, totalCount: data.data.length };
      } catch (err) {
        const error = err as Error;
        throw new GraphQLError(error.message);
      }
    },
    async getPaginatedProducts(_parent, args, _context, _info) {
      try {
        console.log("GETTING PAGINTED PRODUCTS", args);
        await delay(randNumber({ min: 400, max: 1000, precision: 100 }));
        const {
          input: { limit, offset },
        } = args;

        const elementStart = offset ?? 0;
        const elementEnd = limit + elementStart;
        const maxDataSize = data.data.length;
        const products = data.data.slice(
          elementStart,
          elementEnd > maxDataSize ? maxDataSize : elementEnd
        );

        return { data: products, totalCount: data.data.length };
      } catch (err) {
        const error = err as Error;
        throw new GraphQLError(error.message);
      }
    },
  },
};
