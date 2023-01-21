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
    <div>
      {data?.getProducts &&
        data.getProducts.map((item) => <Card key={item.id} data={item} />)}
    </div>
  );
};

export default Index;
