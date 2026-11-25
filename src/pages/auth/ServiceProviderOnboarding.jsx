import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/common/Navbar";
import {
  useGetServiceCategoriesQuery,
  useGetEventTypesQuery,
  useOnboardServiceProviderMutation,
  useGetMyServiceProviderProfileQuery,
} from "../../store/serviceProviderApi";
import { createServiceProviderSchema } from "../../validation/serviceProviderSchemas";
import { useSelector } from "react-redux";
const ServiceProviderOnboarding = () => {
  const navigate = useNavigate();
  const [areaInput, setAreaInput] = useState("");
const { isAuthenticated, user } = useSelector((state) => state.auth);

const showNavbar = isAuthenticated && user?.role === "EventGoer";
  const {
    data: categories = [],
    isLoading: loadingCategories,
    error: categoriesError,
  } = useGetServiceCategoriesQuery();

  const {
    data: eventTypes = [],
    isLoading: loadingEventTypes,
    error: eventTypesError,
  } = useGetEventTypesQuery();

  const {
    data: existingProfile,
    isLoading: checkingProfile,
  } = useGetMyServiceProviderProfileQuery();

  const [onboardServiceProvider, { isLoading: isSubmitting }] =
    useOnboardServiceProviderMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createServiceProviderSchema),
    defaultValues: {
      businessName: "",
      phone: "",
      logoUrl: "",
      serviceCategoryId: "",
      description: "",
      city: "",
      areasServed: [],
      eventTypesServed: [],
    },
  });

  const selectedAreas = watch("areasServed") || [];
  const selectedEventTypes = watch("eventTypesServed") || [];

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

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        logoUrl: data.logoUrl?.trim() ? data.logoUrl.trim() : undefined,
      };

      await onboardServiceProvider(payload).unwrap();
      toast.success("Application submitted successfully!");
      navigate("/user/partner-pending");
    } catch (err) {
      const errorMessage = Array.isArray(err?.data?.message)
        ? err.data.message.join(", ")
        : err?.data?.message || "Failed to submit onboarding form";
      toast.error(errorMessage);
    }
  };

  if (checkingProfile) {
    return (
      <div>
        {showNavbar && <Navbar />}
        <div className="p-6">Checking provider application status...</div>
      </div>
    );
  }

  // If the user already has an existing application, redirect to the status page
  if (existingProfile) {
    return <Navigate to="/user/partner-pending" replace />;
  }

  return (
    <div>
      {showNavbar && <Navbar />}

      <main className="max-w-2xl mx-auto my-8 p-6 border rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-2">Service Provider Onboarding</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Complete the form below to apply as a Service Provider.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium mb-1"
            >
              Business Name *
            </label>
            <input
              id="businessName"
              type="text"
              placeholder="e.g. Royal Catering"
              {...register("businessName")}
              className="w-full p-2 border rounded"
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.businessName.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Egyptian Phone Number *
            </label>
            <input
              id="phone"
              type="text"
              placeholder="e.g. 01012345678"
              {...register("phone")}
              className="w-full p-2 border rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              City *
            </label>
            <input
              id="city"
              type="text"
              placeholder="e.g. Cairo"
              {...register("city")}
              className="w-full p-2 border rounded"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Service Category */}
          <div>
            <label
              htmlFor="serviceCategoryId"
              className="block text-sm font-medium mb-1"
            >
              Service Category *
            </label>
            {loadingCategories ? (
              <p className="text-sm text-gray-500">Loading categories...</p>
            ) : categoriesError ? (
              <p className="text-sm text-red-500">Failed to load categories.</p>
            ) : (
              <select
                id="serviceCategoryId"
                {...register("serviceCategoryId")}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            {errors.serviceCategoryId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.serviceCategoryId.message}
              </p>
            )}
          </div>

          {/* Logo URL */}
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium mb-1">
              Logo URL (Optional)
            </label>
            <input
              id="logoUrl"
              type="url"
              placeholder="https://example.com/logo.png"
              {...register("logoUrl")}
              className="w-full p-2 border rounded"
            />
            {errors.logoUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.logoUrl.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description *
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Describe your services..."
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
              Areas Served *
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
                placeholder="Enter area and click Add"
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={handleAddArea}
                className="border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Add Area
              </button>
            </div>

            {selectedAreas.length > 0 && (
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
            )}
            {errors.areasServed && (
              <p className="text-red-500 text-xs mt-1">
                {errors.areasServed.message}
              </p>
            )}
          </div>

          {/* Event Types Served */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Types Served *
            </label>
            {loadingEventTypes ? (
              <p className="text-sm text-gray-500">Loading event types...</p>
            ) : eventTypesError ? (
              <p className="text-sm text-red-500">
                Failed to load event types.
              </p>
            ) : (
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
            )}
            {errors.eventTypesServed && (
              <p className="text-red-500 text-xs mt-1">
                {errors.eventTypesServed.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-2 rounded font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/user/profile"
            className="text-sm text-gray-600 hover:underline"
          >
            Back to User Profile
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ServiceProviderOnboarding;
