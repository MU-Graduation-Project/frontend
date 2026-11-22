

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../store/authApi";
import { setCredentials } from "../../store/authSlice";
import { loginSchema } from "../../validation/authSchemas";
import Google from '../../Images/devicon_google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: location.state?.email || "",
      password: ""
    }
  });

  const onSubmit = async (formData) => {
 
    try {
      const response = await login(formData).unwrap();
     toast.success("Welcome")

      if (!response?.user || !response?.tokens?.accessToken) {
        // console.log("Invalid login response:", response);
        toast.error(response)
        return;
      }
   

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.tokens.accessToken,
          refreshToken: response.tokens.refreshToken
        })
      );

      navigate("/user/profile");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Login failed. Please check your email and password."
      );
    }
  };

  return (
    <div>
      <div className="text-center w-[290px] md:w-[350px] mb-5">
        <h1 className="text-[#E77C36] font-semibold text-3xl text-center my-3">
          ًWelcome Back !
        </h1>
        <p className="text-[#7D6B60] text-center">
          Your next great experience starts right where you left off.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-px">
          <label htmlFor="email" className="my-2 text-sm">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`border rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.email ? "border-red-500 focus:border-red-500" : "border-bordergrey focus:border-lightorange"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-px relative">
          <label htmlFor="password" className="my-2 text-sm ">
            Password
          </label>
          {showPassword ? (
            <IoEyeOffOutline
              onClick={() => setShowPassword(false)}
              className="absolute text-bordergrey right-5 top-12 text-2xl cursor-pointer"
            />
          ) : (
            <IoEyeOutline
              onClick={() => setShowPassword(true)}
              className="absolute text-bordergrey right-5 top-12 text-2xl cursor-pointer"
            />
          )}
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className={`rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.password ? "border-1 border-red-500 focus:border-red-500" : " border-1 border-bordergrey focus:border-lightorange"}`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="text-right">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-[#7D6B60] text-right "
          >
            forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-background font-[500] bg-primary my-5 rounded-3xl"
        >
          {isLoading ? "Logging In..." : "Log In"}
        </button>
        <br />
        <div className="relative flex items-center justify-center ">
          <div className="absolute bg-[#3B3029] w-full h-[1px]"></div>

          <span className="relative bg-white px-2 z-10 text-xs">Or</span>
        </div>
        <button className="flex justify-center gap-1 items-center text-[#633E2B] w-full py-2  font-[500]  my-5 rounded-3xl border-[#633E2B] border-1">
          <img src={Google} alt="Googleicon" className="w-[20px] h-[20px]" />
          Continue with Google
        </button>
        <div className="text-center">
          <Link to="/auth/register" className="text-xs  ">
            Don’t have an account? Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
