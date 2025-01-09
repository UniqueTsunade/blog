import { useAuth } from "@/shared/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  redirectPath: string;
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath,
  children,
}) => {
  const location = useLocation();
  const {isAuthenticated} = useAuth();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
