import Link from "next/link";
import { useState } from "react";
import { PaginatedGrid } from "../components";
import { ProductObject } from "../utils";

const IndexPage = () => {
  const [_productData, _setProductData] = useState<Array<ProductObject>>([]);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="min-w-[268px] font-bold text-base">Filter by</div>
        <div className="w-full">
          <PaginatedGrid />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
