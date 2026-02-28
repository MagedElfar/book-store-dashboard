// src/features/categories/types/schema.ts

import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { imageValidator, slugValidator } from "@/shared/form";

export const CategoryFormSchema = (
    t: TFunction<Namespace<"category">>
) =>
    z.object({
        name_ar: z
            .string()
            .nonempty({ message: t("category:validation.name_ar_required") })
            .min(2, { message: t("category:validation.name_min") }),

        name_en: z
            .string()
            .nonempty({ message: t("category:validation.name_en_required") })
            .min(2, { message: t("category:validation.name_min") }),

        slug: slugValidator(t("category:validation.slug_required")),

        description_ar: z
            .string()
            .nullable()
            .optional(),

        description_en: z
            .string()
            .nullable()
            .optional(),

        image_url: imageValidator(t("category:validation.invalid_url"))
            .nullable()
            .optional(),


        is_active: z.boolean(),
    });

export type CategoryFormSchemaType = z.infer<ReturnType<typeof CategoryFormSchema>>;