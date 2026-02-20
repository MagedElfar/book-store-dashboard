import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

export const AuthorFormSchema = (
    t: TFunction<Namespace<"author">>
) =>
    z.object({
        name_ar: z
            .string()
            .nonempty({ message: t("author:validation.name_ar_required") })
            .min(2, { message: t("author:validation.name_min") }),

        name_en: z
            .string()
            .nonempty({ message: t("author:validation.name_en_required") })
            .min(2, { message: t("author:validation.name_min") }),

        slug: z
            .string()
            .nonempty({ message: t("author:validation.slug_required") })
            .regex(/^[a-z0-9-]+$/, {
                message: t("author:validation.slug_invalid")
            }),

        bio_ar: z
            .string()
            .nullable()
            .optional(),

        bio_en: z
            .string()
            .nullable()
            .optional(),

        birth_date: z
            .string()
            .nullable()
            .optional(),

        image_url: z
            .string()
            .pipe(
                z.url({ message: t("author:validation.invalid_url") })
            )
            .nullable()
            .optional(),

        is_active: z.boolean()
    });

export type AuthorFormSchemaType = z.infer<ReturnType<typeof AuthorFormSchema>>;