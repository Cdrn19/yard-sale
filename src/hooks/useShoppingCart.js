import { useState, useContext, createContext } from "react";
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

export const useShoppingCart = () => {
  return useContext(CartStateContext);
};

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

  const removeFromCart = (id) => {
    setState({
      cart: state.cart.filter((product) => product.id !== id),
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
