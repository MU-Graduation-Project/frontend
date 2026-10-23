import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please provide a valid email");

const loginPasswordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password can't exceed 32 characters");

const registerPasswordSchema = loginPasswordSchema
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/\d/, "Password must contain a digit")
  .regex(/[\W_]/, "Password must contain a special character");

export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema
});

export const registerSchema = z.object({
  email: emailSchema,
  password: registerPasswordSchema,

  firstName: z.string().optional(),
  lastName: z.string().optional()
});

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    otp: z.string().trim().min(1, "OTP is required"),
    password: registerPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

export const verifyEmailSchema = z.object({
  email: emailSchema,
  otp: z.string().trim().min(1, "OTP is required")
});
export const changePasswordSchema = z.object({
  password: loginPasswordSchema,

  newPassword: registerPasswordSchema
});