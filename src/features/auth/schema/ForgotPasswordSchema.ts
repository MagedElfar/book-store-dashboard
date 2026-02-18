import type { Namespace, TFunction } from "i18next";
import { z } from 'zod';

import { emailValidator } from "@/shared/form";

export const ForgotPasswordSchema = (t: TFunction<Namespace<"auth">>) => z
    .object({
        email: emailValidator({
            invalidEmailMsg: t("auth:validation.invalid_email"),
            requireMsg: t("auth:validation.email_required")
        }),
    })


export type ForgotPasswordSchemaType = z.infer<ReturnType<typeof ForgotPasswordSchema>>;
