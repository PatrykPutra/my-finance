import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationProvider";

function PrivateRoute() {
  const user = useAuthentication();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;