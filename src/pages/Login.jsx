import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import "@styles/Login.scss";

import logo from "@logos/logo_yard_sale.svg";

const Login = () => {
  const [toggle, setToggle] = useState([false, false]);
  const form = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (data.email && data.password) {
      await auth
        .signIn(data)
        .then(() => auth.error.length !== 0 && navigate("/"));
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
            className={`login__form--input-password input ${
              (auth.error === 401 || toggle[1]) && "error"
            }`}
          />
          <p className="login__form--input-error">
            {auth.error === 401 && "invalid user ID and password combination"}
          </p>
          <button className="login__form--login-button" onClick={handleSubmit}>
            Log in
          </button>
          <a href="/">Forgot my password</a>
        </form>
        <button className="login__signup-button">Sign up</button>
      </div>
    </div>
  );
};

export default Login;
