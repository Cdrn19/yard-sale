import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@hooks/useAuth";
import ForgotPassword from "@containers/ForgotPassword";
import "@styles/Login.scss";

import logo from "@logos/logo_yard_sale.svg";
import close from "@icons/icon_close.png";

const Login = ({ handleLoginToggle, handleMobileToggle, LoginToggle }) => {
  const [toggle, setToggle] = useState([false, false]);
  const [forgotPwToggle, setforgotPwToggle] = useState(false);
  const form = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleCloseAll = () => {
    handleLoginToggle();
    handleMobileToggle();
  };

  const handleCloseRecovery = () => {
    setforgotPwToggle(false);
  };

  const mobileStyles = {
    login: {
      position: "absolute",
      backgroundColor: "white",
      zIndex: "2",
      width: "100vw",
      height: "100vh",
      top: "0",
      left: "0",
    },
    loginContainer__button: {
      display: "block",
    },
  };

  useEffect(() => {
    if (auth.user) {
      navigate("/");
      LoginToggle && handleLoginToggle();
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
    <>
      <div className="login" style={LoginToggle && mobileStyles.login}>
        <div className="login-container">
          {LoginToggle && (
            <button
              className="login-container__button"
              style={LoginToggle && mobileStyles.loginContainer__button}
              onClick={() => handleLoginToggle()}
            >
              <img
                src={close}
                alt="close"
                className="mobile-nav__button-close"
              />
            </button>
          )}
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
          </form>
          {LoginToggle ? (
            <button onClick={() => setforgotPwToggle(true)}>
              Forgot my password
            </button>
          ) : (
            <Link to="/passwordrecovery">Forgot my password</Link>
          )}
          <button
            className="login__signup-button"
            onClick={() =>
              navigate("/signup") & (LoginToggle && handleCloseAll())
            }
          >
            Sign up
          </button>
        </div>
      </div>
      {forgotPwToggle && (
        <ForgotPassword
          LoginToggle={LoginToggle}
          handleCloseRecovery={() => handleCloseRecovery()}
        />
      )}
    </>
  );
};

Login.propTypes = {
  handleLoginToggle: PropTypes.func,
  handleMobileToggle: PropTypes.func,
  LoginToggle: PropTypes.bool,
};

export default Login;
