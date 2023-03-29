import Search from "@containers/Search";
import endPoints from "@api";
import useGetProducts from "@hooks/useGetProducts";

const API = endPoints.products.all;

const Home = () => {
  const products = useGetProducts(API);

  return (
    <>
      <Search products={products} />
    </>
  );
};

export default Home;
