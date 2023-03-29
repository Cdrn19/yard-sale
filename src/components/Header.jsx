import { useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "@hooks/useShoppingCart";
import { useAuth } from "@hooks/useAuth";
import Menu from "@components/Menu";
import MobileMenu from "@containers/MobileMenu";
import MyOrder from "@containers/MyOrder";
import "@styles/Header.scss";

import menu from "@icons/icon_menu.svg";
import logo from "@logos/logo_yard_sale.svg";
import shoppingCars from "@icons/icon_shopping_cart.svg";
import arrow from "@icons/arrow.svg";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [orderToggle, setOrderToggle] = useState(false);
  const { state } = useShoppingCart();
  const auth = useAuth();

  const handleMobileToggle = () => {
    setMobileToggle(!mobileToggle);
    setOrderToggle(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
    setOrderToggle(false);
  };

  const handleOrderToggle = () => {
    setOrderToggle(!orderToggle);
    setToggle(false);
    setMobileToggle(false);
  };

  const width = window.innerWidth <= 413;

  return (
    <nav className="main-nav">
      <button className="main-nav__button" onClick={handleMobileToggle}>
        <img src={menu} alt="menu" className="main-nav__button-menu" />
      </button>
      <div className="main-nav__left">
        {width & orderToggle ? (
          <h1 onClick={handleOrderToggle}>Shopping Cart</h1>
        ) : (
          <a href="/">
            <img src={logo} alt="logo" className="main-nav__logo" />
          </a>
        )}
        <ul>
          <li>
            <a href="/">All</a>
          </li>
          <li>
            <a href="/">Clothes</a>
          </li>
          <li>
            <a href="/">Electronics</a>
          </li>
          <li>
            <a href="/">Furnitures</a>
          </li>
          <li>
            <a href="/">Toys</a>
          </li>
          <li>
            <a href="/">Others</a>
          </li>
        </ul>
      </div>
      <div className="main-nav__right">
        <ul>
          {auth.user === null ? (
            <li
              className="main-nav__right--sign-in"
              onClick={(handleToggle, handleOrderToggle)}
            >
              <Link to="/signin">Sign in</Link>
            </li>
          ) : (
            <li className="main-nav__right--email" onClick={handleToggle}>
              <p>{auth.user.email}</p>
              <img src={arrow} alt="arrow" />
            </li>
          )}
          {(!width || (width && !orderToggle)) && (
            <li
              className="main-nav__right--shopping-cart"
              onClick={handleOrderToggle}
            >
              <img src={shoppingCars} alt="shopping cart" />
              {state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
            </li>
          )}
        </ul>
      </div>
      {toggle && <Menu handleToggle={() => handleToggle()} />}
      {mobileToggle && (
        <MobileMenu
          handleMobileToggle={() => handleMobileToggle()}
          auth={auth}
        />
      )}
      {orderToggle && <MyOrder width={width} />}
    </nav>
  );
};

export default Header;
