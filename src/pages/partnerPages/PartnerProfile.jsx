import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/common/Navbar";
import {
  useGetMyServiceProviderProfileQuery,
  useUpdateMyServiceProviderProfileMutation,
  useGetServiceCategoriesQuery,
  useGetEventTypesQuery,
} from "../../store/serviceProviderApi";
import { updateServiceProviderSchema } from "../../validation/serviceProviderSchemas";

const PartnerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [areaInput, setAreaInput] = useState("");

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError,
    refetch,
  } = useGetMyServiceProviderProfileQuery();

  const { data: categories = [] } = useGetServiceCategoriesQuery();
  const { data: eventTypes = [] } = useGetEventTypesQuery();

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyServiceProviderProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateServiceProviderSchema),
  });

  const selectedAreas = watch("areasServed") || [];
  const selectedEventTypes = watch("eventTypesServed") || [];

  useEffect(() => {
    if (profile) {
      reset({
        businessName: profile.businessName || "",
        phone: profile.phone || "",
        logoUrl: profile.logoUrl || "",
        serviceCategoryId: profile.category?.id || "",
        description: profile.description || "",
        city: profile.city || "",
        areasServed: profile.areasServed || [],
        eventTypesServed: (profile.eventTypesServed || []).map((et) => et.id),
      });
    }
  }, [profile, reset]);

  const handleAddArea = () => {
    const trimmed = areaInput.trim();
    if (!trimmed) return;
    if (trimmed.length < 2) {
      toast.warn("Area name must be at least 2 characters");
      return;
    }
    if (selectedAreas.includes(trimmed)) {
      toast.info("Area already added");
      setAreaInput("");
      return;
    }
    setValue("areasServed", [...selectedAreas, trimmed], {
      shouldValidate: true,
    });
    setAreaInput("");
  };

  const handleRemoveArea = (indexToRemove) => {
    setValue(
      "areasServed",
      selectedAreas.filter((_, idx) => idx !== indexToRemove),
      { shouldValidate: true }
    );
  };

  const toggleEventType = (id) => {
    if (selectedEventTypes.includes(id)) {
      setValue(
        "eventTypesServed",
        selectedEventTypes.filter((item) => item !== id),
        { shouldValidate: true }
      );
    } else {
      setValue("eventTypesServed", [...selectedEventTypes, id], {
        shouldValidate: true,
      });
    }
  };

  const onUpdateSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        logoUrl: formData.logoUrl?.trim() ? formData.logoUrl.trim() : undefined,
      };

      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    } catch (err) {
      const errorMessage = Array.isArray(err?.data?.message)
        ? err.data.message.join(", ")
        : err?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="max-w-3xl mx-auto my-8 p-6 border rounded-lg bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Service Provider Profile</h1>
          {!isEditing && profile && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="border px-4 py-1.5 rounded text-sm hover:bg-gray-100"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isProfileLoading && <p>Loading profile...</p>}

        {!isProfileLoading && (isError || !profile) && (
          <div>
            <p className="mb-4">No service provider profile found.</p>
            <Link
              to="/user/become-partner"
              className="inline-block bg-primary text-white px-4 py-2 rounded"
            >
              Apply as Service Provider
            </Link>
          </div>
        )}

        {!isProfileLoading && profile && (
          <div>
            {!isEditing ? (
              /* View Mode */
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Status: </span>
                  <span className="font-bold text-green-700">{profile.status}</span>
                </div>

                <div>
                  <h2 className="font-semibold text-lg">{profile.businessName}</h2>
                  <p className="text-gray-600 text-sm">
                    Category: {profile.category?.name || "N/A"}
                  </p>
                </div>

                {profile.logoUrl && (
                  <div>
                    <span className="text-sm font-medium">Logo URL: </span>
                    <a
                      href={profile.logoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary text-sm underline"
                    >
                      {profile.logoUrl}
                    </a>
                  </div>
                )}

                <div>
                  <span className="font-semibold text-sm">Phone: </span>
                  <span className="text-sm">{profile.phone}</span>
                </div>

                <div>
                  <span className="font-semibold text-sm">City: </span>
                  <span className="text-sm">{profile.city}</span>
                </div>

                <div>
                  <span className="font-semibold text-sm">Areas Served: </span>
                  <p className="text-sm">
                    {profile.areasServed?.join(", ") || "None specified"}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-sm">Event Types Served: </span>
                  <p className="text-sm">
                    {profile.eventTypesServed?.map((et) => et.name).join(", ") ||
                      "None specified"}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-sm">Description: </span>
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {profile.description || "No description."}
                  </p>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium mb-1">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    {...register("businessName")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.businessName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone (Egyptian)
                  </label>
                  <input
                    id="phone"
                    type="text"
                    {...register("phone")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    Primary City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("city")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="serviceCategoryId" className="block text-sm font-medium mb-1">
                    Service Category
                  </label>
                  <select
                    id="serviceCategoryId"
                    {...register("serviceCategoryId")}
                    className="w-full p-2 border rounded bg-white"
                  >
                    <option value="">Select category...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.serviceCategoryId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.serviceCategoryId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="logoUrl" className="block text-sm font-medium mb-1">
                    Logo URL
                  </label>
                  <input
                    id="logoUrl"
                    type="url"
                    placeholder="https://..."
                    {...register("logoUrl")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.logoUrl && (
                    <p className="text-red-500 text-xs mt-1">{errors.logoUrl.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    {...register("description")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Areas Served */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Areas Served
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={areaInput}
                      onChange={(e) => setAreaInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddArea();
                        }
                      }}
                      placeholder="Add an area"
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={handleAddArea}
                      className="border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                      Add Area
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 p-2 border rounded bg-gray-50">
                    {selectedAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-xs"
                      >
                        {area}
                        <button
                          type="button"
                          onClick={() => handleRemoveArea(idx)}
                          className="text-red-600 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.areasServed && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.areasServed.message}
                    </p>
                  )}
                </div>

                {/* Event Types Served */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Types Served
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {eventTypes.map((et) => {
                      const isChecked = selectedEventTypes.includes(et.id);
                      return (
                        <label
                          key={et.id}
                          className="flex items-center gap-2 p-2 border rounded cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleEventType(et.id)}
                          />
                          <span>{et.name}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.eventTypesServed && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.eventTypesServed.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-primary text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PartnerProfile;
