import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { colorValidator } from "@/shared/form";

export const TagFormSchema = (
    t: TFunction<Namespace<"tag">>
) =>
    z.object({
        name_ar: z
            .string()
            .nonempty({ message: t("tag:validation.name_ar_required") })
            .min(2, { message: t("tag:validation.name_min") }),

        name_en: z
            .string()
            .nonempty({ message: t("tag:validation.name_en_required") })
            .min(2, { message: t("tag:validation.name_min") }),

        slug: z
            .string()
            .nonempty({ message: t("tag:validation.slug_required") })
            .regex(/^[a-z0-9-]+$/, {
                message: t("tag:validation.slug_invalid")
            }),

        color: colorValidator(t("tag:validation.color_invalid")),

        is_active: z.boolean()
    });

export type TagFormSchemaType = z.infer<ReturnType<typeof TagFormSchema>>;