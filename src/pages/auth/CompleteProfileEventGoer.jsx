import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCompleteEventGoerProfileMutation,useGetInterestsQuery } from "../../store/eventGoerApi";
import { completeEventGoerSchema } from "../../validation/authSchemas";
import { toast } from "react-toastify";
import { useState } from "react";
import { useLazyCheckAuthQuery } from "../../store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";

const CompleteProfileEventGoer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refreshAuth] = useLazyCheckAuthQuery();
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors }
    } = useForm({
      resolver: zodResolver(completeEventGoerSchema),
      defaultValues: {
        city: "",
        interests: [],
        otherInterest: ""
      }
    });
  const [selectedInterest, setSelectedInterest] = useState(false);
    const showOther = watch("interests").includes("Other");
    const otherInterest = watch("otherInterest") || "";
  const [completeEventGoerProfile, { isLoading }] =
    useCompleteEventGoerProfileMutation();
const { data: predictions, isLoading: interestsLoading } = useGetInterestsQuery(
  {
    q: otherInterest,
    page: 1,
    limit: 10
  }
);
  const interestOptions = [
    "Technology",
    "Music",
    "Sports",
    "Art",
    "Business",
    "Education",
    "Entertainment",
    "Science"
  ];




  const onSubmit = async (formData) => {
    try {
 const finalData = {
   city: formData.city,
   interests: [
     ...formData.interests.filter((item) => item !== "Other"),
     ...(formData.interests.includes("Other") && formData.otherInterest.trim()
       ? [formData.otherInterest.trim()]
       : [])
   ]
 };
      await completeEventGoerProfile(finalData).unwrap();
          // const authData = await refreshAuth().unwrap();

          // // 3. Update Redux auth state
          // dispatch(
          //   setCredentials({
          //     user: authData.user,
          //     accessToken: authData.tokens.accessToken,
          //     refreshToken: authData.tokens.refreshToken
          //   })
          // );
try {
  const authData = await refreshAuth(undefined, false).unwrap();

  if (authData?.tokens?.accessToken) {
    dispatch(
      setCredentials({
        user: authData.user,
        accessToken: authData.tokens.accessToken,
        refreshToken: authData.tokens.refreshToken
      })
    );
  }
} catch (refreshError) {
  console.error("Token refresh after profile completion failed:", refreshError);
}
      toast.success("Profile completed successfully!");
      navigate("/user/profile");
    } catch (error) {
      toast.error(
        error?.data?.message || "Completing Profile failed. Please try again."
      );
    }
  };
  return (
    <div>
      <h1>Complete event goer profile</h1>
      <p>Complete your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <label htmlFor="city" className="me-2">
            City
          </label>
          <input
            id="city"
            {...register("city")}
            className="border rounded-2xl"
          />
          {errors.city && <p>{errors.city.message}</p>}
        </div>

      
        <div className="my-4">
          <p className="font-semibold mb-3">Choose your interests</p>

          <div className="grid grid-cols-2 gap-3">
            {interestOptions.map((interest) => (
              <label key={interest} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={interest}
                  {...register("interests")}
                />
                {interest}
              </label>
            ))}
            {errors.interests && (
              <p className="text-red-500 text-sm">{errors.interests.message}</p>
            )}
            <label className="flex items-center gap-2">
              <input type="checkbox" value="Other" {...register("interests")} />
              Other
            </label>
          </div>

          {showOther && (
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Write your interest..."
                {...register("otherInterest")}
                onFocus={() => setSelectedInterest(false)}
                className="border rounded-lg p-2 w-full"
              />

              {otherInterest.trim().length >= 1 && !selectedInterest && (
                <div className="border rounded-lg mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
                  {interestsLoading ? (
                    <p className="p-2 text-gray-500">Loading...</p>
                  ) : predictions?.length > 0 ? (
                    predictions.filter((item) =>
    item.name.toLowerCase().includes(otherInterest.trim().toLowerCase())
  )
  .map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setValue("otherInterest", item.name, {
                            shouldValidate: true
                          });
                          setSelectedInterest(true);
                        }}
                        className="block w-full text-left p-2 hover:bg-gray-100"
                      >
                        {item.name}
                      </button>
                    ))
                  ) : (
                    <p className="p-2 text-gray-500">No suggestions found</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Completing your profile..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfileEventGoer;
