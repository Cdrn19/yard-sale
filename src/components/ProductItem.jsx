import PropTypes from "prop-types";
import { useShoppingCart } from "@hooks/useShoppingCart";
import "@styles/ProductItem.scss";

import iconAddToCart from "@icons/bt_add_to_cart.svg";
import iconAddedToCart from "@icons/bt_added_to_cart.svg";

const ProductItem = ({ product, handleToggle }) => {
  const { addToCart, state } = useShoppingCart();

  const handleClick = (item) => {
    addToCart(item);
  };

  return (
    <div className="Product-item">
      <img
        src={product?.images[0]}
        alt={product?.title}
        onClick={() => handleToggle(product)}
      />
      <div className="Product-info">
        <div onClick={() => handleToggle(product)}>
          <p>{product?.price} USD</p>
          <p>{product?.title}</p>
        </div>
        <figure>
          {state?.cart.includes(product) ? (
            <img
              className="Product-info__added"
              src={iconAddedToCart}
              alt="added to cart"
            />
          ) : (
            <img
              className="product-info__add"
              src={iconAddToCart}
              alt="add to cart"
              onClick={() => handleClick(product)}
            />
          )}
        </figure>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
  handleToggle: PropTypes.func,
};

export default ProductItem;
