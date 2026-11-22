import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/authApi";
import { logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
const Navbar = () => {
  const [logoutUser, { isLoading }] = useLogoutMutation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


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
    <div className="relative flex flex-col lg:flex-row md:justify-between p-3 items-center xl:px-12 ">
      <div className="w-full flex justify-between items-center lg:w-auto">
        <h2 className="font-bold text-4xl text-primary">Logo</h2>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-4xl text-primary lg:hidden"
        >
          <RxHamburgerMenu />
        </button>
      </div>


      <div className="hidden lg:block relative text-secondary">
        <input
          className="w-full border border-secondary focus:outline-none py-1 px-9 rounded-2xl"
          placeholder="Search"
        />
        <IoIosSearch className="absolute top-1 left-2 text-2xl" />
      </div>

   
      <div className="hidden lg:flex text-secondary font-semibold gap-5">
        <span>Explore Events</span>
        <span>How it works</span>
        <span>For Business</span>
      </div>

  
      <div className="hidden lg:block">
        {!isAuthenticated ? (
          <div className="flex gap-2">
            <NavLink to="/auth/register">
              <button className="bg-primary text-background p-2 rounded-3xl w-[80px]">
                Register
              </button>
            </NavLink>

            <NavLink to="/auth/login">
              <button className="bg-primary text-background p-2 rounded-3xl w-[80px]">
                Login
              </button>
            </NavLink>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="text-white p-2 rounded-3xl bg-primary"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>

       
        <div
          className={`lg:hidden w-full flex flex-col items-center gap-5 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 py-5" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="relative text-secondary w-full">
            <input
              className="w-full border border-secondary focus:outline-none py-2 px-9 rounded-2xl"
              placeholder="Search"
            />
            <IoIosSearch className="absolute top-2 left-2 text-2xl" />
          </div>

          <div className="flex flex-col items-center gap-4 text-secondary font-semibold">
            <span>Explore Events</span>
            <span>How it works</span>
            <span>For Business</span>
          </div>

          {!isAuthenticated ? (
            <div className="flex gap-2">
              <NavLink to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                <button className="bg-primary text-background p-2 rounded-3xl w-[80px]">
                  Register
                </button>
              </NavLink>

              <NavLink to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <button className="bg-primary text-background p-2 rounded-3xl w-[80px]">
                  Login
                </button>
              </NavLink>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="text-red-500"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      
    </div>
  );
};

export default Navbar;
