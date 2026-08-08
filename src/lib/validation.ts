import { z } from "zod";

// XSS/HTML tag prevention helper
const cleanString = (val: string) => val.replace(/<[^>]*>/g, "").trim();

export const checkoutSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .transform(cleanString),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number")
    .trim(),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(300, "Address is too long")
    .transform(cleanString),
  city: z
    .string()
    .min(1, "City is required")
    .max(100, "City name is too long")
    .transform(cleanString),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .trim(),
  paymentMethod: z.enum(["COD", "RAZORPAY"]),
  cartItems: z
    .array(
      z.object({
        id: z.string().min(1, "Product ID is required").max(50, "Product ID is too long").transform(cleanString),
        quantity: z.number().int().min(1, "Quantity must be at least 1").max(99, "Quantity limit exceeded"),
        selectedSize: z.string().min(1, "Size is required").transform(cleanString),
      })
    )
    .min(1, "Cart cannot be empty"),
});
