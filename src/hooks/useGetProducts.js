import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useGetProducts = (API) => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    await axios
      .get(API)
      .then(({ data }) => {
        console.log(data);
        setProducts(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return products;
};

export default useGetProducts;
