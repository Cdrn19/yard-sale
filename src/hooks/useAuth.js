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
          setIsLoading(false);
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

  const checkEmail = async (email) => {
    setError([]);
    setIsLoading(true);
    await axios
      .post(endPoints.users.check, email, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setError([]);
        setIsLoading(false);
        !data.isAvailable && setIsLoading(false);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError(response.statu);
      });
  };

  const signUp = async (credentials) => {
    setError([]);
    setIsLoading(true);
    await axios
      .post(endPoints.users.create, credentials, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(async ({ data }) => {
        const credentials = JSON.stringify({
          email: data.email,
          password: data.password,
        });
        setError([]);
        setIsLoading(false);
        signIn(credentials);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError(response.status);
      });
  };

  const signIn = async (credentials) => {
    setError([]);
    setIsLoading(true);
    await axios
      .post(endPoints.auth.login, credentials, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then(async ({ data }) => {
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

  const update = async (data) => {
    setError([]);
    setIsLoading(true);
    await axios
      .put(`${endPoints.users.update}${user.id}`, data)
      .then(({ data: user }) => setUser(user) & setIsLoading(false))
      .catch(({ response }) => {
        setIsLoading(false);
        setError(response.status);
      });
  };

  const signOut = () => {
    setUser(null);
    Cookie.remove("token");
    delete axios.defaults.headers.Authorization;
  };

  return {
    user,
    error,
    isLoading,
    checkEmail,
    signUp,
    signIn,
    update,
    signOut,
  };
}

ProviderAuth.propTypes = {
  children: PropTypes.element,
};
