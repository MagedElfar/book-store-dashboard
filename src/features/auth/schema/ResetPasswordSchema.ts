import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/core";
import { passwordValidator } from "@/shared/form";

export const ResetPasswordSchema = (t: TFunction<Namespace<"auth">>) =>
    z
        .object({
            password: passwordValidator({
                minLength: PASSWORD_MIN_LENGTH,
                requireMsg: t("auth:validation.password_required"),
                tooShortMsg: t("auth:validation.password_min", { length: PASSWORD_MIN_LENGTH }),
            }),
            confirmPassword: z
                .string()
                .nonempty(t("auth:validation.confirm_password_required"),),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("auth:validation.passwords_do_not_match"),
            path: ["confirmPassword"],
        });

export type ResetPasswordSchemaType = z.infer<
    ReturnType<typeof ResetPasswordSchema>
>;
