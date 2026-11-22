import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
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
      <div className="text-center w-[290px] md:w-[350px] mb-5">
        <h2 className="text-lightorange font-semibold text-3xl text-center my-3">
          Forgot your password?
        </h2>
        <p className="text-[#7D6B60] text-center">
          No worries. Enter your email and we'll send you a code to get back in.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="me-2 text-sm">
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-background font-[500] bg-primary my-5 rounded-3xl"
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </button>
        <Link to="/auth/login">
          <div className="flex gap-2 items-center justify-center">
            <MdOutlineKeyboardArrowLeft />
            <span>Back to sign in</span>
          </div>
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
