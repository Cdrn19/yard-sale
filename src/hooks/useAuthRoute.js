import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export function AuthRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return !auth.user ? (
    <Navigate to="/signin" state={{ from: location }} replace />
  ) : (
    children
  );
}

AuthRoute.propTypes = {
  children: PropTypes.element,
};
