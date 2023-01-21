import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { ProductObject } from "../utils";

const GetProductsQuery = gql`
  query GetProductsQuery {
    getProducts {
      name
    }
  }
`;

interface GetProducts {
  getProducts: Array<ProductObject>;
}

const Index = () => {
  const { data } = useQuery<GetProducts>(GetProductsQuery);

  return (
    <div>{data?.getProducts && data.getProducts.map((item) => item.name)}</div>
  );
};

export default Index;
