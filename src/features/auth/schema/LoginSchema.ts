import type { Namespace, TFunction } from "i18next";
import { z } from 'zod';

import { emailValidator } from "@/shared/form";

export const LoginSchema = (t: TFunction<Namespace<"auth">>) => z
    .object({
        email: emailValidator({
            invalidEmailMsg: t("auth:validation.invalid_email"),
            requireMsg: t("auth:validation.email_required")
        }),

        password: z
            .string()
            .nonempty({ message: t("auth:validation.email_required") })
            .min(6, { message: t("auth:validation.password_min") }),

        rememberMe: z.boolean()
    })


export type LoginSchemaType = z.infer<ReturnType<typeof LoginSchema>>;
