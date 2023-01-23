import { useState } from "react";
import { PaginatedGrid } from "../components";
import { ProductObject } from "../utils";

const IndexPage = () => {
  const [_productData, _setProductData] = useState<Array<ProductObject>>([]);
  return (
    <div className="p-4 h-full">
      <div className="w-full h-full">
        <PaginatedGrid />
      </div>
    </div>
  );
};

export default IndexPage;
