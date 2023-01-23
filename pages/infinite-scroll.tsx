import { useState } from "react";
import { InfiniteScrollGrid } from "../components";
import { ProductObject } from "../utils";

const InfiniteScrollPage = () => {
  const [_productData, _setProductData] = useState<Array<ProductObject>>([]);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="min-w-[268px] font-bold text-base">Filter by</div>
        <div className="w-full">
          <InfiniteScrollGrid />
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollPage;
