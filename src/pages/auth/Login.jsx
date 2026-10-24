

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../store/authApi";
import { setCredentials } from "../../store/authSlice";
import { loginSchema } from "../../validation/authSchemas";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

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
      <h1>Login</h1>
      <p>Enter your email and password to login</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="me-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="border rounded-2xl"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="me-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="border rounded-2xl"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <br />
        <Link to="/auth/forgot-password">forgot password?</Link>
        <br />
        <Link to="/auth/register">No account?</Link>
      </form>
    </div>
  );
}

export default Login;
