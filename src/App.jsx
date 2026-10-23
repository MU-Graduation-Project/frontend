import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CheckAuth from "./components/common/CheckAuth";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { useCheckAuthQuery } from "./store/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./store/authSlice";
import GuestRoute from "./components/common/GuestRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const UserProfile = lazy(() => import("./pages/userPages/UserProfile"));
const ChangePassword = lazy(() => import("./pages/userPages/ChangePassword"));
const OrganizerProfile = lazy(
  () => import("./pages/organizerPages/OrganizerProfile")
);
const PartnerProfile = lazy(
  () => import("./pages/partnerPages/PartnerProfile")
);
const AdminProfile = lazy(() => import("./pages/adminPages/AdminProfile"));

const EventPlan = lazy(() => import("./pages/organizerPages/EventPlan"));
const UnAuth = lazy(() => import("./pages/UnAuth"));
function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useCheckAuthQuery();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      if (data?.user && data?.tokens?.accessToken) {
        dispatch(
          setCredentials({
            user: data.user,
            accessToken: data.tokens.accessToken
          })
        );
      }

      setIsAuthChecked(true);
    }
  }, [data, isLoading, isFetching, dispatch]);

  const authLoading = isLoading || isFetching || !isAuthChecked;

  return (
    <div className="app">
      <ToastContainer />
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Suspense fallback={<div className="p-6">Loading...</div>}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/unauthorized" element={<UnAuth />} />
            </Route>

            {/* Auth Routes */}
            <Route
              path="/auth"
              element={
                <GuestRoute
                  isAuthenticated={isAuthenticated}
                  isLoading={authLoading}
                  user={user}
                >
                  <AuthLayout />
                </GuestRoute>
              }
            >
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/auth/verify-email" element={<VerifyEmail />} />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />

              <Route path="/auth/reset-password" element={<ResetPassword />} />
            </Route>

            {/* User */}
            <Route
              path="/user"
              element={
                <CheckAuth
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isLoading={authLoading}
                >
                  <MainLayout />
                </CheckAuth>
              }
            >
              <Route path="profile" element={<UserProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>

            {/* Organizer */}
            <Route
              path="/organizer"
              element={
                <CheckAuth
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isLoading={authLoading}
                >
                  <MainLayout />
                </CheckAuth>
              }
            >
              <Route path="profile" element={<OrganizerProfile />} />
              <Route path="plan" element={<EventPlan />} />
            </Route>

            {/* Partner */}
            <Route
              path="/partner"
              element={
                <CheckAuth
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isLoading={authLoading}
                >
                  <MainLayout />
                </CheckAuth>
              }
            >
              <Route path="profile" element={<PartnerProfile />} />
            </Route>

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <CheckAuth
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isLoading={authLoading}
                >
                  <MainLayout />
                </CheckAuth>
              }
            >
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
