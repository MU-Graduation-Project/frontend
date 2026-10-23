
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "../../store/authApi";
import { changePasswordSchema } from "../../validation/authSchemas";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";
function ChangePassword() {
    const dispatch = useDispatch();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await changePassword(data).unwrap();
        dispatch(logout());
      toast.success("Password changed successfully", response);
     
    } catch (error) {
           const errorMessage =
             error?.data?.message ||
             error?.data?.error ||
             "Change password failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h1>Change Password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="password">Current Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="border"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            className="border"
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword