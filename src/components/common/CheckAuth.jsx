
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children, isLoading }) => {
  const location = useLocation();


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading authentication...
      </div>
    );
  }

  const pathname = location.pathname;


  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const userRoles = [
    ...new Set(["USER", ...(Array.isArray(user?.roles) ? user.roles : [])])
  ];


  if (pathname.startsWith("/admin") && !userRoles.includes("ADMIN")) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (pathname.startsWith("/organizer") && !userRoles.includes("ORGANIZER")) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    pathname.startsWith("/partner") &&
    !userRoles.includes("SERVICE_PROVIDER")
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default CheckAuth;