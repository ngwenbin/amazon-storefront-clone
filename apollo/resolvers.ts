/* eslint-disable @typescript-eslint/no-unused-vars */
import { randNumber } from "@ngneat/falso";
import { GraphQLError } from "graphql";
import { delay, fuzzyObjectKeySearch } from "~/utils";
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
          input: { limit, offset, filter: filters, searchKey },
        } = args;
        const elementStart = offset ?? 0;
        const elementEnd = limit + elementStart;
        const maxDataSize = data.data.length;
        let processedData = JSON.parse(JSON.stringify(data.data));
        if (filters) {
          filters.forEach((filterKey) => {
            const [key, val] = Object.entries(filterKey)[0];
            processedData = processedData.filter((dataObj) =>
              dataObj[key]
                .toLowerCase()
                .includes(
                  (typeof val === "string" ? val : val.toString()).toLowerCase()
                )
            );
          });
        }
        if (searchKey) {
          processedData = fuzzyObjectKeySearch(
            searchKey,
            processedData,
            "name"
          );
        }
        const products = processedData.slice(
          elementStart,
          elementEnd > maxDataSize ? maxDataSize : elementEnd
        );

        return { data: products, totalCount: processedData.length };
      } catch (err) {
        const error = err as Error;
        throw new GraphQLError(error.message);
      }
    },
  },
};
