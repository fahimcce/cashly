import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  role: z.enum(["user", "agent"], {
    required_error: "Please select a role",
  }),
  nid: z.string().regex(/^\d{10,17}$/, "Please enter a valid NID number"),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, "Phone number or email is required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
