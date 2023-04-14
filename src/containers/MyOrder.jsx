import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import OrderItem from "@components/OrderItem";
import { useShoppingCart } from "@hooks/useShoppingCart";
import "@styles/MyOrder.scss";

import arrowLeft from "@icons/arrow-left.svg";

const MyOrder = ({ width }) => {
  const { state, removeFromCart } = useShoppingCart();

  const sumCart = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = state.cart.reduce(reducer, 0);
    return sum;
  };

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  return (
    <div className="my-order">
      {!width && (
        <div className="my-order__container">
          <img src={arrowLeft} alt="arrow" />
          <h1 className="my-order__Title">Shopping cart</h1>
        </div>
      )}
      <div className="my-order__content--product">
        {state.cart.map((product) => (
          <OrderItem
            key={product.id}
            product={product}
            handleRemove={(item) => handleRemove(item)}
          />
        ))}
      </div>
      <div className="my-order__content--sum">
        <div className="my-order__order">
          <p>
            <span>Total</span>
          </p>
          <p>{sumCart()} USD</p>
        </div>
        <Link to="/checkout" className="my-order__order--Primary-Button">
          Checkout
        </Link>
      </div>
    </div>
  );
};

MyOrder.propTypes = {
  width: PropTypes.bool,
};

export default MyOrder;
