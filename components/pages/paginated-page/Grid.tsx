import { gql, useLazyQuery } from "@apollo/client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ProductObject } from "../../../utils";
import Card from "../../Card";
import Spinner from "../../Spinner";
import { usePagination } from "../../hooks";

const GetPaginatedProductsQuery = gql`
  query GetPaginatedProductsQuery($limit: Int!, $offset: Int) {
    getPaginatedProducts(input: { limit: $limit, offset: $offset }) {
      totalCount
      data {
        id
        name
        brand
        skuId
        media {
          src
        }
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
  const [fetchData, { loading, data }] = useLazyQuery<GetProducts>(
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
    fetchData({
      variables: {
        limit: ITEMS_PER_PAGE,
        offset: 0,
      },
    });
  }, []);

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
      fetchData({
        variables: {
          limit: settings.limit,
          offset: settings.offset,
        },
      }),
    totalCount: productData?.totalCount,
    ItemsPerPage: ITEMS_PER_PAGE,
  });

  if (loading) {
    return (
      <div className="flex items-center h-full justify-center">
        <Spinner width={10} height={10} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,225px)] gap-6 grow">
        {grid.getRowModel().flatRows.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={idx} data={item.original as ProductObject} />
        ))}
      </div>
      <div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border rounded p-1 disabled:bg-gray-100"
              onClick={() => pagination.firstPage()}
              disabled={!pagination.canPrevPage}
            >
              {"<<"}
            </button>
            <button
              type="button"
              className="border rounded p-1 disabled:bg-gray-100"
              onClick={() => pagination.prevPage()}
              disabled={!pagination.canPrevPage}
            >
              {"<"}
            </button>
            <button
              type="button"
              className="border rounded p-1 disabled:bg-gray-100"
              onClick={() => pagination.nextPage()}
              disabled={!pagination.canNextPage}
            >
              {">"}
            </button>
            <button
              type="button"
              className="border rounded p-1 disabled:bg-gray-100"
              onClick={() => pagination.lastPage()}
              disabled={!pagination.canNextPage}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {pagination.getCurrPage() + 1} of {pagination.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={pagination.getCurrPage() + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  pagination.setPage(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              onChange={(e) => {
                pagination.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <Pagination
          totalCount={productData?.totalCount}
          onPageChangeCb={(settings) => loadProducts(settings)}
          initialPageSize={10}
        /> */}
      </div>
    </div>
  );
};

export default PaginatedGrid;
