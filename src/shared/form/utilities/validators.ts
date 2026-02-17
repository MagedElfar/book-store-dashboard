import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

import type { PasswordValidatorOptions } from "@/shared/types";
import { normalizePhone } from "@/shared/utilities";

export const phoneValidator = (message: string = "Invalid phone number") =>
    z
        .string()
        .optional()
        .refine((value) => {
            if (!value) return true; // لو فاضي يعدي
            return isValidPhoneNumber(normalizePhone(value));
        }, { message })
        .transform((value) => (value ? normalizePhone(value) : undefined));

export const emailValidator = ({
    invalidEmailMsg = "Invalid email",
    requireMsg = "Email is required"
}: {
    invalidEmailMsg?: string,
    requireMsg?: string
}) => z
    .email({ message: invalidEmailMsg })
    .nonempty({ message: requireMsg })


export const passwordValidator = ({
    minLength = 6,
    requireMsg = "Password is required",
    tooShortMsg = `Password must be at least ${minLength} characters`,
}: PasswordValidatorOptions) =>
    z
        .string()
        .nonempty({ message: requireMsg })
        .min(minLength, { message: tooShortMsg });