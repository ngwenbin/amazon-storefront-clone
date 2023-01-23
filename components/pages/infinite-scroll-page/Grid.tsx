import { NetworkStatus, gql, useLazyQuery } from "@apollo/client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ProductObject } from "../../../utils";
import Card from "../../Card";
import Spinner from "../../Spinner";

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
  const [fetchData, { loading, data, fetchMore, networkStatus }] =
    useLazyQuery<GetProducts>(GetProductsQuery, {
      notifyOnNetworkStatusChange: true,
      variables: {
        limit: ITEMS_PER_PAGE,
      },
    });
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

  if (loading && networkStatus !== NetworkStatus.fetchMore) {
    return (
      <div className="flex items-center h-full justify-center">
        <Spinner width={10} height={10} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full grid grid-flow-row grid-cols-[repeat(auto-fit,225px)] gap-6 grow">
        {grid.getRowModel().flatRows.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={idx} data={item.original as ProductObject} />
        ))}
      </div>
      <button
        type="button"
        className="border py-2 px-4 rounded my-8 border-gray-300 hover:bg-gray-200"
        onClick={() =>
          fetchMore({
            variables: {
              offset: data.getProducts.data.length,
            },
          })
        }
      >
        <div className="flex gap-x-1 items-center">
          {networkStatus === NetworkStatus.fetchMore ? (
            <Spinner width={4} />
          ) : null}
          Load More
        </div>
      </button>
    </div>
  );
};

export default InfiniteScrollGrid;
