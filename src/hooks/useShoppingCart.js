import { useState, createContext } from "react";
import PropTypes from "prop-types";

const CartStateContext = createContext();

export function ProviderCart({ children }) {
  const state = useProvideCart();
  return (
    <CartStateContext.Provider value={state}>
      {children}
    </CartStateContext.Provider>
  );
}

const initialState = {
  cart: [],
};

const useProvideCart = () => {
  const [state, setState] = useState(initialState);

  const addToCart = (payload) => {
    setState({
      cart: [...state.cart, payload],
    });
  };

  const removeFromCart = (indexValue) => {
    setState({
      cart: state.cart.filter((_, index) => index !== indexValue),
    });
  };

  return {
    state,
    addToCart,
    removeFromCart,
  };
};

ProviderCart.propTypes = {
  children: PropTypes.element,
};

export default useProvideCart;
