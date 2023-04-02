import PropTypes from "prop-types";
import ProductItem from "@components/ProductItem";
import ProductInfo from "@components/ProductInfo";
import "@styles/ProductList.scss";
import { useState } from "react";

const ProductList = ({ products }) => {
  const [toggle, setToggle] = useState({});

  const handleToggle = (product) => {
    product
      ? setToggle({ toggle: true, product })
      : setToggle((toggle.toggle = false));
  };

  return (
    <div className="product-list">
      <div className="product-list__container">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product?.id}
            handleToggle={(product) => handleToggle(product)}
          />
        ))}
      </div>
      {toggle.toggle && (
        <ProductInfo
          product={toggle.product}
          handleToggle={() => handleToggle()}
        />
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
