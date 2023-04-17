import { Helmet } from "react-helmet-async";
import Login from "@containers/Login";

const SignIn = () => {
  return (
    <>
      <Helmet>
        <title>Yard Sale | Sign in</title>
      </Helmet>
      <Login />
    </>
  );
};

export default SignIn;
