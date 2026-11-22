import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";
import {
  useEditMyProfileMutation,
  useGetMyProfileQuery,
  useGetMyUserDataQuery,
  useGetInterestsQuery
} from "../../store/eventGoerApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeEventGoerSchema } from "../../validation/authSchemas";

const UserProfile = () => {
  const { data: userData, isLoading: userLoading } = useGetMyUserDataQuery();

  const { data: profileData, isLoading: profileLoading } =
    useGetMyProfileQuery();

  const [editMyProfile, { isLoading: isEditing }] = useEditMyProfileMutation();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(completeEventGoerSchema),
    values: {
      city: profileData?.city || "",
      interests: profileData?.interests?.map((item) => item.name) || [],
      otherInterest: ""
    }
  });

  const showOther = watch("interests").includes("Other");
  const otherInterest = watch("otherInterest") || "";

  const { data: predictions, isLoading: interestsLoading } =
    useGetInterestsQuery({
      q: otherInterest,
      page: 1,
      limit: 10
    });

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
          ...(formData.interests.includes("Other") &&
          formData.otherInterest.trim()
            ? [formData.otherInterest.trim()]
            : [])
        ]
      };

      await editMyProfile(finalData).unwrap();

      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (error) {
      toast.error(error?.data?.message || "Updating profile failed.");
    }
  };

  const cancelEdit = () => {
    reset({
      city: profileData?.city || "",
      interests: profileData?.interests?.map((item) => item.name) || [],
      otherInterest: ""
    });

    setSelectedInterest(false);
    setIsEditingProfile(false);
  };

  if (userLoading || profileLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-3 xl:px-12">
        <h1>User Profile</h1>

        <div>
          <h2>Personal Information</h2>

          <p>First Name: {userData?.firstName}</p>
          <p>Last Name: {userData?.lastName}</p>
          <p>Email: {userData?.email}</p>
        </div>

        <div>
          <h2>Event Goer Profile</h2>

          {!isEditingProfile ? (
            <>
              <p>City: {profileData?.city}</p>

              <p>Interests:</p>
              {profileData?.interests?.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}

              <button
                type="button"
                onClick={() => {
                  setSelectedInterest(false);
                  setIsEditingProfile(true);
                }}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="city">City</label>
                <input id="city" {...register("city")} />
                {errors.city && <p>{errors.city.message}</p>}
              </div>

              <div>
                <p>Choose your interests</p>

                {interestOptions.map((interest) => (
                  <label key={interest}>
                    <input
                      type="checkbox"
                      value={interest}
                      {...register("interests")}
                    />
                    {interest}
                  </label>
                ))}

                <label>
                  <input
                    type="checkbox"
                    value="Other"
                    {...register("interests")}
                  />
                  Other
                </label>

                {errors.interests && <p>{errors.interests.message}</p>}
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
                        predictions
                          .filter((item) =>
                            item.name
                              .toLowerCase()
                              .includes(otherInterest.trim().toLowerCase())
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
                        <p className="p-2 text-gray-500">
                          No suggestions found
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button type="submit" disabled={isEditing}>
                {isEditing ? "Saving..." : "Save Changes"}
              </button>

              <button type="button" onClick={cancelEdit}>
                Cancel
              </button>
            </form>
          )}
        </div>

        <Link to="/user/change-password">Change password</Link>
      </div>
    </div>
  );
};

export default UserProfile;
