import { Navigate } from "react-router-dom";

// const GuestRoute = ({ isAuthenticated, children, isLoading, user }) => {
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isAuthenticated) {
//     const roles = user?.roles || [];

//     if (roles.includes("ADMIN")) {
//       return <Navigate to="/admin/profile" replace />;
//     }

//     // if (roles.includes("ORGANIZER")) {
//     //   return <Navigate to="/organizer/profile" replace />;
//     // }

//     if (roles.includes("SERVICE_PROVIDER")) {
//       return <Navigate to="/partner/profile" replace />;
//     }
//        if (roles.includes("USER")) {
//          return <Navigate to="/user/profile" replace />;
//        }

//   }

//   return children;
// };

// export default GuestRoute;
const GuestRoute = ({ isAuthenticated, children, isLoading, user }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Allow authenticated users to access onboarding pages
  const allowedPaths = [
    "/auth/completeEventGoerProfile",
    "/auth/become-partner"
  ];

  if (allowedPaths.includes(window.location.pathname)) {
    return children;
  }

  if (isAuthenticated) {
    const roles = user?.roles || [];

    if (roles.includes("ADMIN")) {
      return <Navigate to="/admin/profile" replace />;
    }

    if (roles.includes("SERVICE_PROVIDER")) {
      return <Navigate to="/partner/profile" replace />;
    }

    if (roles.includes("USER")) {
      return <Navigate to="/user/profile" replace />;
    }
  }

  return children;
};

export default GuestRoute;