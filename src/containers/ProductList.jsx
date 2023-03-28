import PropTypes from "prop-types";
import ProductItem from "@components/ProductItem";
import "@styles/ProductList.scss";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      <div className="product-list__container">
        {products.map((product) => (
          <ProductItem product={product} key={product?.id} />
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
