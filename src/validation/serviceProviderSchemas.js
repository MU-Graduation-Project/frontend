import { z } from "zod";

const egyptianPhoneRegex = /^(\+?20|0)?1[0125][0-9]{8}$/;

export const createServiceProviderSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .max(50, "Business name cannot exceed 50 characters"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      egyptianPhoneRegex,
      "Must be a valid Egyptian phone number (e.g. 01012345678 or +201012345678)"
    ),

  logoUrl: z
    .string()
    .trim()
    .url("Must be a valid URL (e.g. https://example.com/logo.png)")
    .optional()
    .or(z.literal("")),

  serviceCategoryId: z
    .string()
    .trim()
    .min(1, "Please select a service category")
    .uuid("Invalid category selected"),

  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters")
    .max(500, "Description cannot exceed 500 characters"),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters"),

  areasServed: z
    .array(
      z
        .string()
        .trim()
        .min(2, "Area name must be at least 2 characters")
        .max(100, "Area name cannot exceed 100 characters")
    )
    .min(1, "Please add at least one area served"),

  eventTypesServed: z
    .array(z.string().uuid("Invalid event type ID"))
    .min(1, "Please select at least one event type"),
});

export const updateServiceProviderSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .max(50, "Business name cannot exceed 50 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(
      egyptianPhoneRegex,
      "Must be a valid Egyptian phone number (e.g. 01012345678 or +201012345678)"
    )
    .optional(),

  logoUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  serviceCategoryId: z
    .string()
    .trim()
    .uuid("Invalid category selected")
    .optional(),

  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters")
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters")
    .optional(),

  areasServed: z
    .array(
      z
        .string()
        .trim()
        .min(2, "Area name must be at least 2 characters")
        .max(100, "Area name cannot exceed 100 characters")
    )
    .min(1, "Please add at least one area served")
    .optional(),

  eventTypesServed: z
    .array(z.string().uuid("Invalid event type ID"))
    .min(1, "Please select at least one event type")
    .optional(),
});

export const adminRejectSchema = z.object({
  rejectionReason: z
    .string()
    .trim()
    .min(5, "Rejection reason must be at least 5 characters")
    .max(500, "Rejection reason cannot exceed 500 characters"),
});
