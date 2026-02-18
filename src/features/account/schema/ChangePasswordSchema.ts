import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/core";
import { passwordValidator } from "@/shared/form";

export const ChangePasswordSchema = (t: TFunction<Namespace<"account">>) =>
    z
        .object({
            oldPassword: passwordValidator({
                minLength: PASSWORD_MIN_LENGTH,
                requireMsg: t("account:validation.password_required"),
                tooShortMsg: t("account:validation.password_min", { length: PASSWORD_MIN_LENGTH }),
            }),
            newPassword: passwordValidator({
                minLength: PASSWORD_MIN_LENGTH,
                requireMsg: t("account:validation.password_required"),
                tooShortMsg: t("account:validation.password_min", { length: PASSWORD_MIN_LENGTH }),
            }),
            confirmPassword: z
                .string()
                .nonempty(t("account:validation.confirm_password_required"),),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: t("account:validation.passwords_do_not_match"),
            path: ["confirmPassword"],
        });

export type ChangePasswordSchemaType = z.infer<
    ReturnType<typeof ChangePasswordSchema>
>;
