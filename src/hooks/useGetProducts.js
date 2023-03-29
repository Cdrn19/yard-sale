import { useState, useEffect } from "react";
import axios from "axios";

const useGetProducts = (API) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

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
