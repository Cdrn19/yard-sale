import PropTypes from "prop-types";
import { useShoppingCart } from "@hooks/useShoppingCart";
import ImageSlider from "@components/imageSlider";
import "@styles/ProductInfo.scss";

import close from "@icons/icon_close.png";
import shoppingCars from "@icons/icon_shopping_cart.svg";

const ProductInfo = ({ product, handleToggle }) => {
  const { addToCart, state } = useShoppingCart();

  const handleClick = (item) => {
    addToCart(item);
  };

  return (
    <div className="product-info">
      <button
        className="product-info__button--close"
        onClick={() => handleToggle()}
      >
        <img src={close} alt="close" className="product-info__button-close" />
      </button>
      <ImageSlider images={product.images} alt={product.title} />
      <div className="product-info__container">
        <div className="product-info__description">
          <p>{product.price} USD</p>
          <p>{product.title}</p>
          <p>{product.description}</p>
        </div>
        <button
          className={`product-info__button--add
            ${state?.cart.includes(product) ? `active` : null}`}
          onClick={() => !state?.cart.includes(product) && handleClick(product)}
        >
          <img src={shoppingCars} alt="add to cart" />
          {state?.cart.includes(product) ? `Added to cart` : `Add to cart`}
        </button>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  handleToggle: PropTypes.func,
};

export default ProductInfo;
