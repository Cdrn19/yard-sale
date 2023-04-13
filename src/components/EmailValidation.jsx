import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@hooks/useAuth";
import "@styles/EmailValidation.scss";

import logo from "@logos/logo_yard_sale.svg";

const EmailValidation = ({ setEmail }) => {
  const [toggle, setToggle] = useState(false);
  const form = useRef(null);
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form?.current);
    const data = {
      email: formData.get("email"),
    };
    if (data.email) {
      if (!auth.isLoading) {
        auth.checkEmail(data);
        setEmail(data);
      }
      setToggle(false);
    } else if (!data.email) {
      setToggle(true);
    }
  };

  return (
    <div className="email-validation">
      <div className="email-validation__container">
        <img src={logo} alt="logo" className="email-validation__logo" />
        <h1 className="email-validation__title">Password recovery</h1>
        <p className="email-validation__subtitle">
          Inform the email address used to create your account
        </p>
        <form action="/" className="email-validation__form" ref={form}>
          <label
            htmlFor="email"
            className={`email-validation__form--label ${toggle && "error"}`}
          >
            Email address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className={`email-validation__form--input input-email ${
              toggle && "error"
            }`}
          />
          <button
            className={`email-validation__form--login-button ${
              auth.isLoading ? `active` : null
            }`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <Link to="/signin">Back to Login</Link>
      </div>
    </div>
  );
};

EmailValidation.propTypes = {
  setEmail: PropTypes.func,
};

export default EmailValidation;
