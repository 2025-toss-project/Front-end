import { Navigate, Outlet, useLocation } from "react-router-dom";
import PageUrls from "../constants/PageUrls";

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!auth) {
    return <Navigate to={PageUrls.LOGIN} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
