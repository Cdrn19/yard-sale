import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "@styles/SendEmail.scss";
import { useAuth } from "@hooks/useAuth";

import logo from "@logos/logo_yard_sale.svg";
import mail from "@icons/mail.svg";

const SendEmail = ({ email }) => {
  const auth = useAuth();
  const handleClick = () => {
    !auth.isLoading && auth.checkEmail(email);
  };

  return (
    <div className="send-email">
      <div className="send-email__container">
        <img src={logo} alt="logo" className="send-email__logo" />
        <h1 className="send-email__title">Email has been sent!</h1>
        <p className="send-email__subtitle">
          Please check your inbox for instructions on how to reset the password
        </p>
        <div className="send-email__email-image">
          <img src={mail} alt="email" />
        </div>
        <Link to="/signin" className="send-email__login-button">
          Login
        </Link>
        <p className="send-email__resend">
          <span>Didn&apos;t receive the email?&nbsp;</span>
          <button onClick={handleClick}>Resend</button>
        </p>
      </div>
    </div>
  );
};

SendEmail.propTypes = {
  email: PropTypes.object,
};

export default SendEmail;
