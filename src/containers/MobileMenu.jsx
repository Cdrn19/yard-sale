import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Login from "@containers/Login";
import "@styles/MobileMenu.scss";

import close from "@icons/icon_close.png";

const MobileMenu = ({ handleMobileToggle, auth }) => {
  const [LoginToggle, setLoginToggle] = useState(false);

  const handleLoginToggle = () => {
    setLoginToggle(!LoginToggle);
  };

  const width = window.innerWidth <= 413;

  return (
    <>
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
                <Link to="/" onClick={() => handleMobileToggle()}>
                  All
                </Link>
              </li>
              <li>
                <Link to="/clothes" onClick={() => handleMobileToggle()}>
                  Clothes
                </Link>
              </li>
              <li>
                <Link to="/electronics" onClick={() => handleMobileToggle()}>
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/furnitures" onClick={() => handleMobileToggle()}>
                  Furnitures
                </Link>
              </li>
              <li>
                <Link to="/toys" onClick={() => handleMobileToggle()}>
                  Toys
                </Link>
              </li>
              <li>
                <Link to="/others" onClick={() => handleMobileToggle()}>
                  Others
                </Link>
              </li>
            </ul>
          </div>
          <div className="mobile-nav__down">
            <ul>
              {auth.user === null ? (
                width ? (
                  <li className="mobile-nav__down--login-in">
                    <button onClick={() => handleLoginToggle()}>Log in</button>
                  </li>
                ) : (
                  <li className="mobile-nav__down--login-in">
                    <Link to="/signin" onClick={() => handleMobileToggle()}>
                      Log in
                    </Link>
                  </li>
                )
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
                    <button
                      onClick={() => auth.signOut() & handleMobileToggle()}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {LoginToggle && (
        <Login
          handleLoginToggle={() => handleLoginToggle()}
          handleMobileToggle={() => handleMobileToggle()}
          LoginToggle={LoginToggle}
        />
      )}
    </>
  );
};

MobileMenu.propTypes = {
  handleMobileToggle: PropTypes.func,
  auth: PropTypes.object,
};

export default MobileMenu;
