import PropTypes from "prop-types";
import useProvideCart from "@hooks/useShoppingCart";
import "@styles/ProductItem.scss";

import iconAddToCart from "@icons/bt_add_to_cart.svg";
import iconAddedToCart from "@icons/bt_added_to_cart.svg";

const ProductItem = ({ product }) => {
  const { addToCart, state } = useProvideCart();

  const handleClick = (item) => {
    addToCart(item);
  };

  return (
    <div className="Product-item">
      <img src={product?.image} alt={product?.title} />
      <div className="Product-info">
        <div>
          <p>{product?.price} USD</p>
          <p>{product?.title}</p>
        </div>
        <figure onClick={() => handleClick(product)}>
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
            />
          )}
        </figure>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
