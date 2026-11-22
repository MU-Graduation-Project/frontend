import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import {
  useVerifyEmailMutation,
  useResendVerificationMutation
} from "../../store/authApi";
import { useRef } from "react";
import { verifyEmailSchema } from "../../validation/authSchemas";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
function VerifyEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
const otpRefs = useRef([]);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: location.state?.email || "",
      otp: "",
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: ""
    }
  });

  const onSubmit = async (formData) => {
    try {
     const response= await verifyEmail(formData).unwrap();

      toast.success("Email verified successfully.");

      // navigate("/auth/login", {
      //   state: { email: formData.email }
      // });
           dispatch(
              setCredentials({
                user: response.user,
                accessToken: response.tokens.accessToken,
                refreshToken: response.tokens.refreshToken
              })
            );
            navigate("/auth/choice");
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
      <div className="text-center mb-5 flex flex-col items-center justify-center w-full">
        <MdEmail className="text-7xl text-[#E77C36] " />
        <h2 className="text-[#E77C36] font-semibold text-3xl text-center my-3">
          Verify Email
        </h2>
        <p className="text-[#7D6B60] text-center w-[250px]">
          Enter the 6-digit code sent to your email address.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="mt-3">
          <label htmlFor="otp" className="my-2 text-sm">
            OTP
          </label>

          {/* <input
            id="otp"
            type="text"
            placeholder="Enter verification code"
            {...register("otp")}
          /> */}
          <div className="flex justify-between gap-1.5 sm:gap-2">
            {Array.from({ length: 6 }).map((_, index) => {
              const otpField = register(`otp${index}`);

              return (
                <input
                  key={index}
                  id={index === 0 ? "otp0" : undefined}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-11 h-12 sm:w-12 sm:h-13 text-center border border-[#B8A69A] rounded-xl text-lg sm:text-xl focus:border-[#E77C36] outline-none"
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

          {errors.otp && <p>{errors.otp.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-background font-[500] bg-primary my-5 rounded-3xl"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleResend}
        disabled={isResending}
        className="w-full py-2 text-background font-[500] bg-primary my-1 rounded-3xl"
      >
        {isResending ? "Resending..." : "Resend OTP"}
      </button>
    </div>
  );
}

export default VerifyEmail;
