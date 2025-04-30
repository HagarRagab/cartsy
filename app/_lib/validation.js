import { z } from "zod";

export const contactFormSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    phoneNumber: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    message: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
});

export const searchFormSchema = z.object({
    search: z.string(),
    category: z.string(),
});

export const loginFormSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const signupFormSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .max(10, "First name must be less than 150 characters"),
        lastName: z
            .string()
            .min(1, "Last name is required")
            .max(10, "Last name must be less than 10 characters"),
        userName: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores"
            ),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        passwordAgain: z.string().min(6, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.passwordAgain, {
        path: ["passwordAgain"],
        message: "Passwords do not match",
    });
