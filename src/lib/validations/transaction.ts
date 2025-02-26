import * as z from "zod";

export const sendMoneySchema = z.object({
  senderPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"),
  receiverPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"),
  amount: z
    .number()
    .min(50, "Minimum amount is 50 taka")
    .max(100000, "Maximum amount is 100,000 taka"),
});

export const cashOutSchema = z.object({
  userPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Please enter a valid phone number"),
  agentPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Please enter a valid agent phone number"),
  amount: z
    .number()
    .min(50, "Minimum amount is 50 taka")
    .max(100000, "Maximum amount is 100,000 taka"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const bdPhoneRegex = /^01[3-9]\d{8}$/;

export const cashInSchema = z.object({
  userPhone: z
    .string()
    .regex(
      bdPhoneRegex,
      "Invalid phone number format. Must be a valid Bangladeshi number"
    )
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits"),
  agentPhone: z
    .string()
    .regex(
      bdPhoneRegex,
      "Invalid phone number format. Must be a valid Bangladeshi number"
    )
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits"),
  amount: z
    .number()
    .min(50, "Minimum amount is ৳50")
    .max(100000, "Maximum amount is ৳100,000"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(50, "Password cannot exceed 50 characters"),
});

// Type inference
export type CashInInput = z.infer<typeof cashInSchema>;

export type SendMoneyInput = z.infer<typeof sendMoneySchema>;
export type CashOutInput = z.infer<typeof cashOutSchema>;
