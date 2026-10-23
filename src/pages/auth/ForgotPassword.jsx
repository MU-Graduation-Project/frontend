import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useForgotPasswordMutation } from "../../store/authApi";
import { forgotPasswordSchema } from "../../validation/authSchemas";

function ForgotPassword() {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (formData) => {
    try {
      await forgotPassword(
        formData
      ).unwrap();

      toast.success("Reset code sent to your email.");

      navigate("/auth/reset-password", {
        state: { email: formData.email }
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send reset code.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a reset code.</p>

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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
