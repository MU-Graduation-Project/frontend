import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

import { useRegisterMutation } from "../../store/authApi";
// import { setCredentials } from "../../store/authSlice";
import { registerSchema } from "../../validation/authSchemas";
import { toast } from "react-toastify";
function Register() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });
const onSubmit = async (formData) => {
  try {
    await registerUser(formData).unwrap();

    navigate("/auth/verify-email", {
      state: { email: formData.email }
    });
  } catch (error) {
    toast.error(
      error?.data?.message || "Registration failed. Please try again."
    );
  }
};
  // const onSubmit = async (formData) => {
  //   try {
  //     const response = await registerUser(formData).unwrap();

  //     if (response?.user && response?.tokens?.accessToken) {
  //       dispatch(
  //         setCredentials({
  //           user: response.user,
  //           accessToken: response.tokens.accessToken,
  //           refreshToken: response.tokens.refreshToken
  //         })
  //       );

  //       navigate("/");
  //     } else {
  //       navigate("/auth/login");
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error?.data?.message || "Registration failed. Please try again."
  //     );
  //   }
  // };

  return (
    <div>
      <h1>Register</h1>
      <p>Create your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <label htmlFor="firstName" className="me-2">
            First name
          </label>
          <input
            id="firstName"
            {...register("firstName")}
            className="border rounded-2xl"
            required
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div className="my-2">
          <label htmlFor="lastName" className="me-2">
            Last name
          </label>
          <input
            id="lastName"
            {...register("lastName")}
            className="border rounded-2xl"
            required
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div className="my-2">
          <label htmlFor="email" className="me-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="border rounded-2xl"
            required
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="my-2">
          <label htmlFor="password" className="me-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="border rounded-2xl"
            required
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <br />
        <Link to="/auth/login">Already have an account?</Link>
      </form>
    </div>
  );
}

export default Register;
