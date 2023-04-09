import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@hooks/useAuth";
import "@styles/Login.scss";

import logo from "@logos/logo_yard_sale.svg";
import close from "@icons/icon_close.png";

const Login = ({ handleLoginToggle, width }) => {
  const [toggle, setToggle] = useState([false, false]);
  const form = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/");
      width && handleLoginToggle();
    }
  }, [auth.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (data.email && data.password) {
      !auth.isLoading && auth.signIn(data);
      setToggle([false, false]);
    } else if (!data.email || !data.password) {
      if (!data.password & !data.email) {
        setToggle([true, true]);
      } else if (!data.email) {
        setToggle([true, false]);
      } else if (!data.password) {
        setToggle([false, true]);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <button
          className="login-container__button"
          onClick={() => handleLoginToggle()}
        >
          <img src={close} alt="close" className="mobile-nav__button-close" />
        </button>
        <img src={logo} alt="logo" className="login-container__logo" />
        <form action="/" className="login__form" ref={form}>
          <label
            htmlFor="email"
            className={`login__form--label ${
              (auth.error === 401 || toggle[0]) && "error"
            }`}
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            autoComplete="on"
            placeholder="hello@yardsale.com"
            id="email"
            className={`login__form--input-mail input ${
              (auth.error === 401 || toggle[0]) && "error"
            }
            `}
          />
          <label
            htmlFor="password"
            className={`login__form--label ${
              (auth.error === 401 || toggle[1]) && "error"
            }`}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="*********"
            id="password"
            className={`login__form--input-password input ${
              (auth.error === 401 || toggle[1]) && "error"
            }`}
          />
          <p className="login__form--input-error">
            {auth.error === 401 && "invalid user ID and password combination"}
          </p>
          <button
            className={`login__form--login-button ${
              auth.isLoading ? `active` : null
            }`}
            onClick={handleSubmit}
          >
            Log in
          </button>
          <Link to="/passwordrecovery">Forgot my password</Link>
        </form>
        <button
          className="login__signup-button"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleLoginToggle: PropTypes.func,
  width: PropTypes.bool,
};

export default Login;
