import { useParams } from "react-router-dom";
import Search from "@containers/Search";
import endPoints from "@api";
import useGetProducts from "@hooks/useGetProducts";

const Home = () => {
  const { category } = useParams();
  const api =
    (!category && endPoints.products.all) ||
    (category && endPoints.categories[category]);
  const products = useGetProducts(api);

  return (
    <>
      <Search products={products} />
    </>
  );
};

export default Home;
