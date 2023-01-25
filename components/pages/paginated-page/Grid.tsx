/* eslint-disable jsx-a11y/control-has-associated-label */
import { gql, useQuery } from "@apollo/client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { Card, DebouncedInput, Filter, Spinner } from "~/components";
import { useFilter, usePagination, useSort } from "~/components/hooks";
import { ProductCategories, ProductObject, enumToOptions } from "~/utils";
import Pagination from "./Pagination";

const GetPaginatedProductsQuery = gql`
  query GetPaginatedProductsQuery(
    $limit: Int!
    $offset: Int
    $filter: [ProductFilterInput]
    $searchKey: String
    $orderBy: ProductSortInput
  ) {
    getPaginatedProducts(
      input: {
        limit: $limit
        offset: $offset
        filter: $filter
        searchKey: $searchKey
        orderBy: $orderBy
      }
    ) {
      totalCount
      data {
        id
        name
        brand
        skuId
        media {
          src
        }
        categories
        price
        popularity
      }
    }
  }
`;

interface GetProducts {
  getPaginatedProducts: {
    data: Array<ProductObject>;
    totalCount: number;
  };
}

const ITEMS_PER_PAGE = 10;

const PaginatedGrid = () => {
  const { loading, data, refetch } = useQuery<GetProducts>(
    GetPaginatedProductsQuery,
    {
      variables: {
        limit: ITEMS_PER_PAGE,
        offset: 0,
        orderBy: {},
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const [productData, setProductData] = useState<
    GetProducts["getPaginatedProducts"] | null
  >();
  const columns = useMemo<ColumnDef<ProductObject>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
      },
      {
        header: "SKU ID",
        accessorKey: "skuId",
      },
      {
        header: "Brand",
        accessorKey: "brand",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Ingredients",
        accessorKey: "ingredients",
      },
      {
        header: "Media",
        accessorKey: "media",
      },
    ],
    []
  );

  useEffect(() => {
    if (data && data?.getPaginatedProducts) {
      setProductData(data.getPaginatedProducts);
    }
  }, [data]);

  const grid = useReactTable({
    data: productData?.data ? productData.data : [],
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    //
    // debugTable: true,
  });

  const pagination = usePagination({
    pageChangeHandler: (settings) => {
      if (!loading) {
        refetch({
          limit: settings.limit,
          offset: settings.offset,
        });
      }
    },
    totalCount: productData?.totalCount,
    ItemsPerPage: ITEMS_PER_PAGE,
  });

  const filters = useFilter({
    filterChangeHandler: (settings) => {
      if (!loading) {
        pagination.setPage(0);
        refetch({
          limit: pagination.getPageSize,
          offset: 0,
          filter: settings?.filterArray,
          searchKey: settings?.search,
        });
      }
    },
  });

  const sortBy = useSort({
    sortByChangeHandler: (settings) => {
      if (!loading) {
        pagination.setPage(0);
        refetch({
          limit: pagination.getPageSize,
          offset: 0,
          filter: filters.getFilters()?.filterArray,
          searchKey: filters.getFilters()?.search,
          orderBy: {
            ...(settings?.sortKey
              ? { [settings?.sortKey]: settings?.sortDirection }
              : {}),
          },
        });
      }
    },
  });

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="md:pr-8 flex flex-col pb-4">
        <p className="font-bold py-3 text-lg">Filter by</p>
        <div className="flex flex-col gap-y-8 h-full">
          <Filter
            value=""
            label="Categories"
            filterKey="categories"
            filterOptions={enumToOptions(ProductCategories)}
            onChange={(value) =>
              filters.applyFilter(value.filterKey, value.filterValue)
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-8 grow pb-10 items-center w-full">
        <div className="absolute top-4 md:w-[50%] right-4 md:right-auto self-start">
          <DebouncedInput
            id="searchBox"
            value=""
            placeholder="Search products"
            trigger="debounce"
            onChange={(value) => filters.searchFilter(value)}
          />
        </div>
        <div className="w-full flex justify-between md:items-center flex-col md:flex-row gap-y-2">
          <p>
            Showing {pagination.getPageSize} of over{" "}
            <span className="font-semibold"> {pagination.getTotalCount} </span>
            products
          </p>
          <div>
            <label htmlFor="cars" className="flex items-center text-xs">
              <p className="font-semibold pr-1">Sort by:</p>
              <select
                name="cars"
                id="cars"
                className="bg-gray-100 border p-1 rounded"
                onChange={(e) => {
                  const [sortKey, sortDirection] = e.target.value.split(
                    "-"
                  ) as [string, "ascending" | "descending"];
                  sortBy.setSortBy({ sortKey, sortDirection });
                }}
              >
                <option value="-descending">Relevance</option>
                <option value="popularity-descending">Featured</option>
                <option value="price-ascending">Price: Low to High</option>
                <option value="price-descending">Price: High to Low</option>
                <option value="createdAt-descending">Newest Arrivals</option>
              </select>
            </label>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center h-full justify-center">
            <Spinner width={10} height={10} />
          </div>
        ) : (
          <div className="w-min sm:w-full pt-4 grid grid-flow-row grid-cols-[repeat(auto-fit,225px)] gap-6 grow auto-rows-max">
            {grid.getRowModel().flatRows.map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Card key={idx} data={item.original as ProductObject} />
            ))}
          </div>
        )}
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};

export default PaginatedGrid;
