import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/authApi";
import { logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    if (!isAuthenticated || isLoading) return;

    try {
      await logoutUser().unwrap();
    } catch (error) {
      console.error("Backend logout failed:", error);
    }
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div>
      navbar
      {!isAuthenticated ? (
        <>
          <NavLink to="/auth/register">Register</NavLink>
          <NavLink to="/auth/login">Login</NavLink>
        </>
      ) : (
        <button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      )}
    </div>
  );
};

export default Navbar;
