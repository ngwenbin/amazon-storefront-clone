import { useState } from "react";
import { Grid } from "../components";
import { ProductObject } from "../utils";

const Index = () => {
  const [_productData, _setProductData] = useState<Array<ProductObject>>([]);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="min-w-[268px] font-bold text-base">Filter by</div>
        <div className="flex flex-col w-full">
          Search bar
          <Grid />
        </div>
      </div>
    </div>
  );
};

export default Index;
