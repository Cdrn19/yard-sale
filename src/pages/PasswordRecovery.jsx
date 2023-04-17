import { Helmet } from "react-helmet-async";
import ForgotPassword from "@containers/ForgotPassword";

const PasswordRecovery = () => {
  return (
    <>
      <Helmet>
        <title>Yard Sale | Password Recovery</title>
      </Helmet>
      <ForgotPassword />
    </>
  );
};

export default PasswordRecovery;
