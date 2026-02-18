import type { Namespace, TFunction } from "i18next";
import { z } from 'zod';

import { PASSWORD_MIN_LENGTH } from "@/core";
import { emailValidator, passwordValidator } from "@/shared/form";

export const LoginSchema = (t: TFunction<Namespace<"auth">>) => z
    .object({
        email: emailValidator({
            invalidEmailMsg: t("auth:validation.invalid_email"),
            requireMsg: t("auth:validation.email_required")
        }),

        password: passwordValidator({
            minLength: PASSWORD_MIN_LENGTH,
            requireMsg: t("auth:validation.password_required"),
            tooShortMsg: t("auth:validation.password_min", { length: PASSWORD_MIN_LENGTH }),
        }),

        rememberMe: z.boolean()
    })


export type LoginSchemaType = z.infer<ReturnType<typeof LoginSchema>>;
