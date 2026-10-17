import { Navigate } from "react-router-dom";

const GuestRoute = ({ isAuthenticated, children, isLoading, user }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    const roles = user?.roles || [];
console.log("GuestRoute user:", user);
console.log("GuestRoute roles:", roles);
    if (roles.includes("ADMIN")) {
      return <Navigate to="/admin/profile" replace />;
    }

    if (roles.includes("ORGANIZER")) {
      return <Navigate to="/organizer/profile" replace />;
    }

    if (roles.includes("SERVICE_PROVIDER")) {
      return <Navigate to="/partner/profile" replace />;
    }

    return <Navigate to="/user/profile" replace />;
  }

  return children;
};

export default GuestRoute;
