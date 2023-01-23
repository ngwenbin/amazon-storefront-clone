/* eslint-disable jsx-a11y/control-has-associated-label */
import { gql, useQuery } from "@apollo/client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ProductCategories, ProductObject } from "../../../utils";
import Card from "../../Card";
import DebouncedInput from "../../DebouncedInput";
import Spinner from "../../Spinner";
import { usePagination } from "../../hooks";
import Pagination from "./Pagination";

const GetPaginatedProductsQuery = gql`
  query GetPaginatedProductsQuery(
    $limit: Int!
    $offset: Int
    $filter: ProductFilterInput
  ) {
    getPaginatedProducts(
      input: { limit: $limit, offset: $offset, filter: $filter }
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
      },
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
    pageChangeHandler: (settings) =>
      refetch({
        limit: settings.limit,
        offset: settings.offset,
      }),
    totalCount: productData?.totalCount,
    ItemsPerPage: ITEMS_PER_PAGE,
  });

  const onFilterCallback = (updatedFilter: any) => {
    pagination.setPage(0);
    refetch({
      limit: pagination.getPageSize(),
      offset: 0,
      filter: { ...updatedFilter },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center h-full justify-center">
        <Spinner width={10} height={10} />
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="pr-8">
        <p className="font-semibold pb-8 py-3">Filter by</p>
        <div className="flex flex-col gap-y-4">
          <div>
            <datalist id="categories-list">
              {Object.values(ProductCategories).map((listValue) => (
                <option value={listValue} key={listValue} />
              ))}
            </datalist>
          </div>
          <DebouncedInput
            id="categories"
            value=""
            onChange={(value) =>
              value && onFilterCallback({ categories: value })
            }
            list="categories-list"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-8 grow">
        <DebouncedInput
          id="searchBox"
          value=""
          onChange={(value) => console.log("Search", value)}
        />
        <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,225px)] gap-6 grow">
          {grid.getRowModel().flatRows.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={idx} data={item.original as ProductObject} />
          ))}
        </div>
        <div>
          <Pagination pagination={pagination} />
        </div>
      </div>
    </div>
  );
};

export default PaginatedGrid;
