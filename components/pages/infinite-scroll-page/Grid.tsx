import { gql, useLazyQuery } from "@apollo/client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ProductObject } from "../../../utils";
import Card from "../../Card";

const GetProductsQuery = gql`
  query GetProductsQuery($limit: Int!, $offset: Int) {
    getProducts(input: { limit: $limit, offset: $offset }) {
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
  getProducts: {
    data: Array<ProductObject>;
    totalCount: number;
  };
}

const ITEMS_PER_PAGE = 10;

const InfiniteScrollGrid = () => {
  const [fetchData, { loading, data, fetchMore }] = useLazyQuery<GetProducts>(
    GetProductsQuery,
    {
      variables: {
        limit: ITEMS_PER_PAGE,
      },
    }
  );
  const [productData, setProductData] = useState<
    GetProducts["getProducts"] | null
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
      },
    });
  }, []);

  useEffect(() => {
    if (data && data?.getProducts) {
      setProductData(data.getProducts);
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

  return (
    <div className="flex flex-col">
      {loading ? (
        <p>Is Loading</p>
      ) : (
        <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,225px)] gap-6 grow">
          {grid.getRowModel().flatRows.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={idx} data={item.original as ProductObject} />
          ))}
        </div>
      )}
      <div>
        <button
          type="button"
          className="border py-2 px-4 rounded my-8 border-gray-300 w-min whitespace-nowrap"
          onClick={() =>
            fetchMore({
              variables: {
                offset: data.getProducts.data.length,
              },
            })
          }
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default InfiniteScrollGrid;
