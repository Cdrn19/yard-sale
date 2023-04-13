import { useState } from "react";
import EmailValidation from "@components/EmailValidation";
import SendEmail from "@components/SendEmail";

const forgotPassword = ({ LoginToggle, handleCloseRecovery }) => {
  const [email, setEmail] = useState(null);

  const mobileStyles = {
    div: {
      position: "absolute",
      backgroundColor: "white",
      zIndex: "3",
      width: "100vw",
      height: "100vh",
      top: "0",
      left: "0",
    },
  };

  const validateSendEmail = () => {
    if (email) {
      return (
        <SendEmail
          email={email}
          LoginToggle={LoginToggle}
          handleCloseRecovery={() => handleCloseRecovery()}
        />
      );
    } else {
      return (
        <EmailValidation
          setEmail={setEmail}
          LoginToggle={LoginToggle}
          handleCloseRecovery={() => handleCloseRecovery()}
        />
      );
    }
  };

  return (
    <div style={LoginToggle && mobileStyles.div}>{validateSendEmail()}</div>
  );
};

export default forgotPassword;
