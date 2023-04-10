import { useState } from "react";
import EmailValidation from "@containers/EmailValidation";
import SendEmail from "@containers/SendEmail";

const PasswordRecovery = () => {
  const [email, setEmail] = useState(null);

  const validateSendEmail = () => {
    if (email) {
      return <SendEmail email={email} />;
    } else {
      return <EmailValidation setEmail={setEmail} />;
    }
  };

  return <>{validateSendEmail()}</>;
};

export default PasswordRecovery;
