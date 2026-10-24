import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/authApi";
import { logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
      toast.error(error||"Backend logout failed");
    }
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className="flex justify-between text-3xl">
      navbar
      {!isAuthenticated ? (
        <div className="flex gap-2">
          <NavLink to="/auth/register">Register</NavLink>
          <NavLink to="/auth/login">Login</NavLink>
        </div>
      ) : (
        <button onClick={handleLogout} disabled={isLoading} className="text-red-500">
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      )}
    </div>
  );
};

export default Navbar;
