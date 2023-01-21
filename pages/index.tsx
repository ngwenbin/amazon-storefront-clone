import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Card from "../components/Card";
import { ProductObject } from "../utils";

const GetProductsQuery = gql`
  query GetProductsQuery {
    getProducts {
      id
      name
      brand
      skuId
      media {
        src
      }
    }
  }
`;

interface GetProducts {
  getProducts: Array<ProductObject>;
}

const Index = () => {
  const { data } = useQuery<GetProducts>(GetProductsQuery);

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="min-w-[268px] font-bold text-base">Filter by</div>
        <div className="flex flex-col w-full">
          Search bar
          <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,225px)] gap-6 grow">
            {data?.getProducts &&
              data.getProducts.map((item) => (
                <Card key={item.id} data={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
