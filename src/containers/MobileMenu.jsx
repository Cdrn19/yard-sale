import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "@styles/MobileMenu.scss";

import close from "@icons/icon_close.png";

const MobileMenu = ({ handleMobileToggle, auth }) => {
  return (
    <nav className="mobile-nav">
      <div className="mobile-nav--container">
        <button
          className="mobile-nav__button"
          onClick={() => handleMobileToggle()}
        >
          <img src={close} alt="close" className="mobile-nav__button-close" />
        </button>
        <h1 className="mobile-nav__up--title">CATEGORIES</h1>
        <div className="mobile-nav__up">
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
        <div className="mobile-nav__down">
          <ul>
            {auth.user === null ? (
              <li className="mobile-nav__down--login-in">
                <Link to="/login" onClick={() => handleMobileToggle()}>
                  Log in
                </Link>
              </li>
            ) : (
              <>
                <li className="mobile-nav__down--orders">
                  <Link to="/orders" onClick={() => handleMobileToggle()}>
                    My orders
                  </Link>
                </li>
                <li className="mobile-nav__down--account">
                  <Link to="/account" onClick={() => handleMobileToggle()}>
                    My account
                  </Link>
                </li>
                <li className="mobile-nav__down--sign-out">
                  <p>{auth.user.email}</p>
                  <button onClick={() => handleMobileToggle()}>Sign out</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

MobileMenu.propTypes = {
  handleMobileToggle: PropTypes.func,
  auth: PropTypes.object,
};

export default MobileMenu;
