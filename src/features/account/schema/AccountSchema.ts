import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { imageValidator, phoneValidator } from "@/shared/form";

export const AccountSchema = (t: TFunction<Namespace<"account">>) => z
    .object({
        full_name: z
            .string()
            .nonempty({ message: t("account:validation.full_name_required") })
            .min(2, { message: t("account:validation.full_name_min") }),

        phone: phoneValidator(t("account:validation.phone")).optional().nullable(),
        avatar_url: imageValidator(t("account:validation.avatar_invalid"))
            .nullable()
            .optional(),



    });

export type AccountSchemaType = z.infer<ReturnType<typeof AccountSchema>>;
