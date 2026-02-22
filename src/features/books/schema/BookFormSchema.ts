import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { AutocompleteOptionSchema } from "@/shared/form";

export const BookFormSchema = (t: TFunction<Namespace<"book">>) =>
    z.object({
        title_ar: z
            .string()
            .nonempty({ message: t("book:validation.title_ar_required") })
            .min(3, { message: t("book:validation.title_min") }),

        title_en: z
            .string()
            .nonempty({ message: t("book:validation.title_en_required") })
            .min(3, { message: t("book:validation.title_min") }),

        slug: z
            .string()
            .nonempty({ message: t("book:validation.slug_required") })
            .regex(/^[a-z0-9-]+$/, { message: t("book:validation.slug_invalid") }),

        sku: z
            .string()
            .nonempty({ message: t("book:validation.sku_required") }),

        isbn: z.string().optional().nullable(),

        description_ar: z
            .string()
            .nonempty({ message: t("book:validation.desc_ar_required") })
            .min(10, { message: t("book:validation.desc_min") }),

        description_en: z
            .string()
            .nonempty({ message: t("book:validation.desc_en_required") })
            .min(10, { message: t("book:validation.desc_min") }),

        price: z.coerce
            .number()
            .min(0, { message: t("book:validation.price_min") }),

        sale_price: z.coerce
            .number()
            .min(0, { message: t("book:validation.sale_price_invalid") })
            .nullable(),

        stock: z.coerce
            .number()
            .int()
            .min(0, { message: t("book:validation.stock_min") }),

        pages: z.coerce
            .number()
            .int()
            .positive({ message: t("book:validation.pages_positive") }),

        publisher: z
            .string()
            .optional(),

        published_year: z.coerce
            .number()
            .int()
            .min(0)
            .max(new Date().getFullYear(), { message: t("book:validation.year_invalid") })
            .nullable(),

        cover_image: z
            .string()
            .pipe(
                z.url({ message: t("book:validation.invalid_url") })
            )
            .nullable()
            .optional(),


        images: z.array(
            z
                .string()
                .pipe(
                    z.url({ message: t("book:validation.invalid_url") })
                )
        ),

        authors: z.array(AutocompleteOptionSchema),

        categories: z
            .array(AutocompleteOptionSchema)
            .min(1, { message: t("book:validation.category_required") }),

        tags: z
            .array(AutocompleteOptionSchema),

        is_active: z.boolean(),
    });

export type BookFormSchemaType = z.input<ReturnType<typeof BookFormSchema>>;