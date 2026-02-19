import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/core";
import { emailValidator, passwordValidator, phoneValidator } from "@/shared/form";

export const allowedRoles = ["user", "support", "admin"] as const;

export const UserFormSchema = (
    t: TFunction<Namespace<"user">>,
    isCreate: boolean = true // true => create, false => update
) =>
    z.object({
        email: emailValidator({
            invalidEmailMsg: t("user:validation.invalid_email"),
            requireMsg: t("user:validation.email_required"),
        }),
        full_name: z
            .string()
            .nonempty({ message: t("user:validation.full_name_required") })
            .min(2, { message: t("user:validation.full_name_min") }),
        phone: phoneValidator(t("user:validation.phone")).optional().nullable(),
        avatar_url: z
            .string()
            .pipe(
                z.url({ message: t("user:validation.avatar_invalid") })
            )
            .nullable()
            .optional(),
        role: z.enum(allowedRoles, {
            message: t("user:validation.role_invalid")
        }),
        ...(isCreate && {
            password: passwordValidator({
                minLength: PASSWORD_MIN_LENGTH,
                requireMsg: t("user:validation.password_required"),
                tooShortMsg: t("user:validation.password_min", { length: PASSWORD_MIN_LENGTH }),
            }),
        }),
    });

export type UserFormSchemaType = z.infer<ReturnType<typeof UserFormSchema>>