import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import Menu from "@components/Menu";
import "@styles/Header.scss";

import menu from "@icons/icon_menu.svg";
import logo from "@logos/logo_yard_sale.svg";
import shoppingCars from "@icons/icon_shopping_cart.svg";
import arrow from "@icons/arrow.svg";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const auth = useAuth();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="main-nav">
      <button className="main-nav__button">
        <img src={menu} alt="menu" className="main-nav__button-menu" />
      </button>
      <div className="main-nav__left">
        <a href="/">
          <img src={logo} alt="logo" className="main-nav__logo" />
        </a>
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
            <li className="main-nav__right--sign-in">
              <Link to="/login">Sign in</Link>
            </li>
          ) : (
            <li className="main-nav__right--email" onClick={handleToggle}>
              <p>{auth.user.email}</p>
              <img src={arrow} alt="arrow" />
            </li>
          )}
          <li className="main-nav__right--shopping-cart">
            <img src={shoppingCars} alt="shopping cart" />
            <div>6</div>
          </li>
        </ul>
      </div>
      {toggle && <Menu handleToggle={() => handleToggle()} />}
    </nav>
  );
};

export default Header;
