import { useState, useContext, createContext, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = Cookie.get("token");
    const recoveryLogin = async () => {
      setIsLoading(true);
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      await axios
        .get(endPoints.auth.profile)
        .then(({ data: user }) => {
          setUser(user);
        })
        .catch(({ response }) => {
          setIsLoading(false);
          setError(response.status);
          Cookie.remove("token");
        });
    };
    token && recoveryLogin(token);
  }, []);

  const signIn = async (credentials) => {
    setIsLoading(true);
    await axios
      .post(endPoints.auth.login, credentials, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(async function ({ data }) {
        setError([]);
        setIsLoading(false);
        const token = data.access_token;
        if (token) {
          Cookie.set("token", token, { expires: 5 });
          axios.defaults.headers.Authorization = `Bearer ${token}`;
          const { data: user } = await axios.get(endPoints.auth.profile);
          setUser(user);
        }
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError(response.status);
      });
  };

  return { user, error, isLoading, signIn };
}

ProviderAuth.propTypes = {
  children: PropTypes.element,
};
