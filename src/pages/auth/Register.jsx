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
        <div>
          <label htmlFor="firstName">First name</label>
          <input id="firstName" {...register("firstName")} required />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" {...register("lastName")} required />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} required />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            required
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>

        <Link to="/auth/login">Already have an account?</Link>
      </form>
    </div>
  );
}

export default Register;
