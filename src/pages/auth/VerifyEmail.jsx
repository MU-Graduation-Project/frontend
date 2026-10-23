import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import {
  useVerifyEmailMutation,
  useResendVerificationMutation
} from "../../store/authApi";

import { verifyEmailSchema } from "../../validation/authSchemas";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: location.state?.email || "",
      otp: ""
    }
  });

  const onSubmit = async (formData) => {
    try {
      await verifyEmail(formData).unwrap();

      toast.success("Email verified successfully.");

      navigate("/auth/login", {
        state: { email: formData.email }
      });
    } catch (error) {
      toast.error(error?.data?.message || "Email verification failed.");
    }
  };

  const handleResend = async () => {
    const isEmailValid = await trigger("email");

    if (!isEmailValid) return;

    try {
      await resendVerification({
        email: getValues("email")
      }).unwrap();

      toast.success("A new verification code has been sent.");
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to resend verification code."
      );
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <p>Enter your email and the verification code we sent you.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="otp">OTP</label>

          <input
            id="otp"
            type="text"
            placeholder="Enter verification code"
            {...register("otp")}
          />

          {errors.otp && <p>{errors.otp.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <button type="button" onClick={handleResend} disabled={isResending}>
        {isResending ? "Resending..." : "Resend OTP"}
      </button>
    </div>
  );
}

export default VerifyEmail;
