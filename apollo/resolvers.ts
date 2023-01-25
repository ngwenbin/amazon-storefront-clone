/* eslint-disable @typescript-eslint/no-unused-vars */
import { randNumber } from "@ngneat/falso";
import dayjs from "dayjs";
import fuzzysort from "fuzzysort";
import { GraphQLError } from "graphql";
import isEmpty from "lodash/isEmpty";
import data from "./mockData.json";

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    async getProducts(_parent, args, _context, _info) {
      try {
        console.log("GETTING PAGINTED PRODUCTS", args);
        const {
          input: { limit, offset, filter: filters, searchKey, orderBy },
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
          processedData = fuzzysort
            .go(searchKey, processedData, {
              key: "name",
              threshold: -5000,
            })
            .map((s) => s.obj);
        }

        if (!isEmpty(orderBy)) {
          const [key, value] = Object.entries(orderBy)[0];
          const sortOrder = value === "descending" ? -1 : 1;
          if (key === "createdAt") {
            processedData.sort((a, b) => {
              const newA = dayjs(a[key]);
              const newB = dayjs(b[key]);
              return newA.diff(newB) * sortOrder;
            });
          } else {
            processedData.sort((a, b) => {
              const newA =
                typeof a[key] !== "string" ? a[key].toString() : a[key];
              const newB =
                typeof b[key] !== "string" ? b[key].toString() : b[key];
              return (
                newA
                  .toLowerCase()
                  .localeCompare(newB.toLowerCase(), undefined, {
                    numeric: true,
                  }) * sortOrder
              );
            });
          }
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
    async getPaginatedProducts(_parent, args, _context, _info) {
      try {
        console.log("GETTING PAGINTED PRODUCTS", args);
        const {
          input: { limit, offset, filter: filters, searchKey, orderBy },
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
          processedData = fuzzysort
            .go(searchKey, processedData, {
              key: "name",
              threshold: -5000,
            })
            .map((s) => s.obj);
        }

        if (!isEmpty(orderBy)) {
          const [key, value] = Object.entries(orderBy)[0];
          const sortOrder = value === "descending" ? -1 : 1;
          if (key === "createdAt") {
            processedData.sort((a, b) => {
              const newA = dayjs(a[key]);
              const newB = dayjs(b[key]);
              return newA.diff(newB) * sortOrder;
            });
          } else {
            processedData.sort((a, b) => {
              const newA =
                typeof a[key] !== "string" ? a[key].toString() : a[key];
              const newB =
                typeof b[key] !== "string" ? b[key].toString() : b[key];
              return (
                newA
                  .toLowerCase()
                  .localeCompare(newB.toLowerCase(), undefined, {
                    numeric: true,
                  }) * sortOrder
              );
            });
          }
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
