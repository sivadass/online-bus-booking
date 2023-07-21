import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthStateContext } from "../../contexts/auth";

const Protected = ({ children }) => {
  const { isLoggedIn = false } = useContext(AuthStateContext);
  let location = useLocation();
  if (!isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
};

export default Protected;
