import { useState } from "react";
import EmailValidation from "@containers/EmailValidation";

const PasswordRecovery = () => {
  const [email, setEmail] = useState(null);

  const validateSendEmail = () => {
    return <EmailValidation setEmail={setEmail} />;
  };

  return <>{validateSendEmail()}</>;
};

export default PasswordRecovery;
