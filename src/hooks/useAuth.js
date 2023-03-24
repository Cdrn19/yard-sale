import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@api";

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);

  const signIn = async (credentials) => {
    await axios
      .post(endPoints.auth.login, credentials, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(async function ({ data }) {
        const token = data.access_token;
        if (token) {
          Cookie.set("token", token, { expires: 5 });
          axios.defaults.headers.Authorization = `Bearer ${token}`;
          const { data: user } = await axios.get(endPoints.auth.profile);
          setUser(user);
          setError([]);
        }
      })
      .catch(({ response }) => {
        setError(response.status);
      });
  };

  return { user, error, signIn };
}

ProviderAuth.propTypes = {
  children: PropTypes.element,
};
