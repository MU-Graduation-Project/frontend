import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { IoIosLock } from "react-icons/io";
import { useResetPasswordMutation } from "../../store/authApi";
import { resetPasswordSchema } from "../../validation/authSchemas";
import { useRef,useEffect } from "react";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
function ResetPassword() {
  const location = useLocation();
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const email = location.state?.email || "";
const [showPassword, setShowPassword] = useState(false);
const hasRedirected = useRef(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      otp: "",
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      password: "",
      confirmPassword: ""
    }
  });

  // const onSubmit = async (formData) => {
  //   if (!email) {
  //     toast.error("Please start from the Forgot Password page.");
  //     return;
  //   }
  // await resetPassword({
  //   email: formData.email,
  //   otp: formData.otp,
  //   password: formData.password
  // }).unwrap();
  //   try {
  //     await resetPassword({
  //       email: formData.email,
  //       // otp: formData.otp,
  //       otp,
  //       password: formData.password
  //     }).unwrap();

  //     toast.success("Password reset successfully.");

  //     navigate("/auth/login", {
  //       state: { email }
  //     });
  //   } catch (error) {
  //     toast.error(error?.data?.message || "Failed to reset password.");
  //   }
  // };

  const onSubmit = async (formData) => {
    if (!email) {
      toast.error("Please start from the Forgot Password page.");
      return;
    }

    try {
      await resetPassword({
        email: formData.email,
        otp: formData.otp,
        password: formData.password
      }).unwrap();

      toast.success("Password reset successfully.");

      navigate("/auth/login", {
        state: { email }
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password.");
    }
  };

useEffect(() => {
  if (!email && !hasRedirected.current) {
    hasRedirected.current = true;

    toast.error("Please request a reset code first");
    navigate("/auth/forgot-password", { replace: true });
  }
}, [email, navigate]);
if (!email) return null;

  return (
    <div className="flex flex-col items-center  w-[290px] md:w-[350px]">
      <div className="text-center mb-5 flex flex-col items-center justify-center w-full">
        <IoIosLock className="text-7xl text-[#E77C36] " />
        <h2 className="text-[#E77C36] font-semibold text-3xl text-center my-3">
          Reset Password
        </h2>
        <p className="text-[#7D6B60] text-center">
          Enter the 6-digit code sent to your email address.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div>
          <label htmlFor="email" className="my-2 text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            readOnly
            {...register("email")}
            className={`border rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.email ? "border-red-500 focus:border-red-500" : "border-bordergrey focus:border-lightorange"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="my-2">
          <label htmlFor="otp" className="my-2 text-sm">
            OTP
          </label>

          {/* <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            {...register("otp")}
            className="border rounded-2xl"
          /> */}

          <div className="flex gap-2">
            {Array.from({ length: 6 }).map((_, index) => {
              const otpField = register(`otp${index}`);

              return (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="md:w-14 md:h-14 w-10 h-10 text-center border border-[#B8A69A] rounded-xl text-xl focus:border-[#E77C36] outline-none"
                  {...otpField}
                  ref={(el) => {
                    otpField.ref(el);
                    otpRefs.current[index] = el;
                  }}
                  onChange={(e) => {
                    const value = e.target.value;

                    otpField.onChange(e);

                    const otpValues = Array.from({ length: 6 }, (_, i) =>
                      getValues(`otp${i}`)
                    );

                    otpValues[index] = value;

                    setValue("otp", otpValues.join(""), {
                      shouldValidate: true
                    });

                    if (value && index < 5) {
                      otpRefs.current[index + 1]?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !e.target.value && index > 0) {
                      otpRefs.current[index - 1]?.focus();
                    }
                  }}
                />
              );
            })}
          </div>

          {errors.otp && (
            <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-px relative">
          <label htmlFor="password" className="my-2 text-sm">
            New Password
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
            placeholder="Enter new password"
            className={`rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.password ? "border-1 border-red-500 focus:border-red-500" : " border-1 border-bordergrey focus:border-lightorange"}`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-px relative">
          <label htmlFor="confirmPassword" className="my-2 text-sm">
            Confirm New Password
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
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            {...register("confirmPassword")}
            className={`rounded-lg w-full p-2 focus:outline-none focus:border-2
${errors.password ? "border-1 border-red-500 focus:border-red-500" : " border-1 border-bordergrey focus:border-lightorange"}`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-background font-[500] bg-primary my-5 rounded-3xl"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
