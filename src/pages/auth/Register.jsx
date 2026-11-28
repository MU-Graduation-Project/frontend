import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

import { useRegisterMutation } from "../../store/authApi";
// import { setCredentials } from "../../store/authSlice";
import { registerSchema } from "../../validation/authSchemas";
import { useState } from "react";
import { toast } from "react-toastify";
function Register() {

  const navigate = useNavigate();
const [activeMode, setActiveMode] = useState("Personal");
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
      password: "",
       confirmPassword: ""
    }
  });
const onSubmit = async (formData) => {
  try {
    // await registerUser(formData).unwrap();
    const { confirmPassword, ...registerData } = formData;

    await registerUser(registerData).unwrap();
sessionStorage.setItem("registrationMode", activeMode);
    navigate("/auth/verify-email", {
      state: { email: formData.email }
    });
  } catch (error) {
    toast.error(
      error?.data?.message || "Registration failed. Please try again."
    );
  }
};


  return (
    <div>
      <h1 className="text-[#E77C36] font-semibold text-3xl text-center my-3">
        Register to [Name]
      </h1>

      <div className="flex justify-center">
        <p className="text-[#7D6B60] text-center w-[290px]">
          discover events, book tickets, and bring your own events to life.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="my-2 flex flex-col gap-px">
            <label htmlFor="firstName" className="my-2 text-sm">
              First name
            </label>
            <input
              id="firstName"
              placeholder="Enter your first name"
              {...register("firstName")}
              className={`border rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.firstName ? "border-red-500 focus:border-red-500" : "border-bordergrey focus:border-lightorange"}`}
              required
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>
          <div className="my-2 my-2 flex flex-col gap-px">
            <label htmlFor="lastName" className="my-2 text-sm">
              Last name
            </label>
            <input
              id="lastName"
              placeholder="Enter your last name"
              {...register("lastName")}
              className={`border rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.lastName ? "border-red-500 focus:border-red-500" : "border-bordergrey focus:border-lightorange"}`}
              required
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
        </div>
        <div className="my-2 flex flex-col gap-px">
          <label htmlFor="email" className="my-2 text-sm">
            Email
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            type="email"
            {...register("email")}
            className={`border rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.firstName ? "border-red-500 focus:border-red-500" : "border-bordergrey focus:border-lightorange"}`}
            required
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className=" my-2 flex flex-col gap-px">
          <label htmlFor="password" className="my-2 text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className={`border rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.password ? "border-red-500 focus:border-red-500" : "border-bordergrey focus:border-lightorange"}`}
            required
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="my-2 flex flex-col gap-px">
          <label htmlFor="confirmPassword" className="my-2 text-sm">
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className={`border rounded-lg w-full p-2 focus:outline-none focus:border-2
    ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-bordergrey focus:border-lightorange"}`}
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="mt-5">
          <p className="text-sm text-[#4A4A4A] mb-2">Select account type</p>

          <div className="flex justify-start gap-6">
            {/* Personal */}
            <label className="flex items-center gap-2 cursor-pointer text-[#3A3A3A] font-medium select-none">
              <span className="relative flex items-center justify-center w-4 h-4 rounded-full border border-[#E67E35] has-[:checked]:border-[#E67E35] has-[:checked]:[&>span]:scale-100">
                <input
                  type="radio"
                  name="mode"
                  value="Personal"
                  checked={activeMode === "Personal"}
                  onChange={() => setActiveMode("Personal")}
                  className="sr-only"
                />
                <span className="w-2 h-2 rounded-full bg-[#E67E35] scale-0 transition-transform duration-150" />
              </span>
              Personal
            </label>

            {/* Provider */}
            <label className="flex items-center gap-2 cursor-pointer text-[#3A3A3A] font-medium select-none">
              <span className="relative flex items-center justify-center w-4 h-4 rounded-full border border-[#9E938C] has-[:checked]:border-[#E67E35] has-[:checked]:[&>span]:scale-100">
                <input
                  type="radio"
                  name="mode"
                  value="Provider"
                  checked={activeMode === "Provider"}
                  onChange={() => setActiveMode("Provider")}
                  className="sr-only"
                />
                <span className="w-2 h-2 rounded-full bg-[#E67E35] scale-0 transition-transform duration-150" />
              </span>
              Provider
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-background font-[500] bg-primary my-5 rounded-3xl"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <br />
        <div className="text-center">
          <Link to="/auth/login">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
