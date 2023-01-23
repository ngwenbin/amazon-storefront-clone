import { gql, useLazyQuery } from "@apollo/client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ProductObject } from "../../../utils";
import Card from "../../Card";
import Pagination from "./Pagination";

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
        <Pagination
          totalCount={productData?.totalCount}
          onPageChangeCb={(settings) =>
            fetchData({
              variables: {
                offset: settings.offset,
                limit: settings.limit,
              },
            })
          }
          initialPageSize={10}
        />
      </div>
    </div>
  );
};

export default PaginatedGrid;
