import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useResetPasswordMutation } from "../../store/authApi";
import { resetPasswordSchema } from "../../validation/authSchemas";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      otp: "",
      password: "",
      confirmPassword: ""
    }
  });

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

  if (!email) {
    return (
      <div>
        <p>Please request a reset code first.</p>
        <Link to="/auth/forgot-password">Go to Forgot Password</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" readOnly {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            {...register("otp")}
          />
          {errors.otp && <p>{errors.otp.message}</p>}
        </div>

        <div>
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter new password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
