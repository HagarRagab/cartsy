import { z } from "zod";
import { currencies, languages, phoneCodes } from "@/src/app/_utils/utils";
import countryCodes from "@/data/countryCodes.json";

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
    search: z.string().trim().min(1, "Please add product name"),
    category: z.string().min(1, "Please select category"),
});

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, "Please add your email")
        .email("Invalid email address"),
    password: z.string().min(1, "Please add your password"),
});

export const signupFormSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .max(10, "First name must be less than 10 characters"),
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

export const infoFormSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .max(10, "First name must be less than 150 characters"),
        lastName: z
            .string()
            .min(1, "Last name is required")
            .max(10, "Last name must be less than 10 characters"),
        email: z.string().email("Invalid email address"),
        dateOfBirth: z.date().nullable(),
        phoneCode: z
            .string()
            .refine((val) => phoneCodes.find((cur) => cur.value === val), {
                message: "required",
            }),
        phoneNumber: z.string().min(1, {
            message: "Please add a valid contact phone number.",
        }),
        currency: z
            .string()
            .refine((val) => currencies.find((cur) => cur.value === val), {
                message: "Please select your currency.",
            }),
        country: z
            .string()
            .refine((val) => countryCodes.some((c) => c.name === val), {
                message: "Please select your country.",
            }),
        address: z.string().min(10, {
            message: "Please fill your delivery address in details.",
        }),
        city: z.string(),
    })
    .superRefine((data, ctx) => {
        const userCountry = countryCodes.find((c) => c.name === data.country);
        if (!userCountry) {
            ctx.addIssue({
                path: ["country"],
                message: "Please Select your country.",
            });
            ctx.addIssue({
                path: ["phoneNumber"],
                message: "Invalid phone number.",
            });
            return;
        }

        const { phoneNumber } = data;

        if (
            phoneNumber.length < userCountry.minLength ||
            phoneNumber.length > userCountry.maxLength
        )
            ctx.addIssue({
                path: ["phoneNumber"],
                message: `Phone number must be ${
                    userCountry.minLength === userCountry.maxLength
                        ? userCountry.minLength
                        : ` between ${userCountry.minLength} and ${userCountry.maxLength}`
                } numbers.`,
            });

        const startsWithValidSuffix = userCountry.suffixes.some((s) =>
            phoneNumber.startsWith(s)
        );

        if (!startsWithValidSuffix)
            ctx.addIssue({
                path: ["phoneNumber"],
                message: "Invalid phone number.",
            });
    });

export const regionalSettingsSchema = z.object({
    currency: z
        .string()
        .refine((val) => currencies.some((c) => c.value === val), {
            message: "Please select your currency.",
        }),
    language: z
        .string()
        .refine((val) => languages.some((l) => l.value === val), {
            message: "Please select your langauage.",
        }),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Please add your email")
        .email("Invalid email address"),
});

export const updatePasswordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        passwordAgain: z.string().min(6, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.passwordAgain, {
        path: ["passwordAgain"],
        message: "Passwords do not match",
    });

export const promoCodeSchema = z.object({
    promoCode: z.string().min(1, "Please add a valid promo code."),
});

export const purchaseInfoFormSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .max(10, "First name must be less than 150 characters"),
        lastName: z
            .string()
            .min(1, "Last name is required")
            .max(10, "Last name must be less than 10 characters"),
        phoneCode: z.string().refine((val) => phoneCodes.includes(val), {
            message: "required",
        }),
        phoneNumber: z.string().min(1, {
            message: "Please add a valid contact phone number.",
        }),
    })
    .superRefine((data, ctx) => {
        const { phoneNumber } = data;

        if (
            phoneNumber.length < userCountry.minLength ||
            phoneNumber.length > userCountry.maxLength
        )
            ctx.addIssue({
                path: ["phoneNumber"],
                message: `Phone number must be ${
                    userCountry.minLength === userCountry.maxLength
                        ? userCountry.minLength
                        : ` between ${userCountry.minLength} and ${userCountry.maxLength}`
                } numbers.`,
            });

        const startsWithValidSuffix = userCountry.suffixes.some((s) =>
            phoneNumber.startsWith(s)
        );

        if (!startsWithValidSuffix)
            ctx.addIssue({
                path: ["phoneNumber"],
                message: "Invalid phone number.",
            });
    });

export const AddressFormSchema = z
    .object({
        country: z
            .string()
            .refine((val) => countryCodes.some((c) => c.name === val), {
                message: "Please select your country.",
            }),
        address: z.string().min(10, {
            message: "Please fill your delivery address in details.",
        }),
    })
    .superRefine((data, ctx) => {
        const userCountry = countryCodes.find((c) => c.name === data.country);
        if (!userCountry) {
            ctx.addIssue({
                path: ["country"],
                message: "Please Select your country.",
            });
            ctx.addIssue({
                path: ["phoneNumber"],
                message: "Invalid phone number.",
            });
            return;
        }
    });
