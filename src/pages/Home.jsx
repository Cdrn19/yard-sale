import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Yard Sale | Home</title>
        <meta
          name="description"
          content="We are your best option for garage sale"
        />
        <meta name="keywords" content="Sale, Articles, Garage, Home, Buy" />
      </Helmet>
      <Search products={products} />
    </>
  );
};

export default Home;
