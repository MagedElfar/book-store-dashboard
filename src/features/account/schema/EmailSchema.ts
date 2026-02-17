import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { emailValidator } from "@/shared/form";

export const EmailSchema = (t: TFunction<Namespace<"account">>) => z
    .object({
        email: emailValidator({
            invalidEmailMsg: t("account:validation.invalid_email"),
            requireMsg: t("account:validation.email_required")
        })
    });

export type EmailSchemaType = z.infer<ReturnType<typeof EmailSchema>>;
