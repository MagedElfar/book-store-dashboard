// src/features/banners/validations/banner.ts

import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { colorValidator, imageValidator } from "@/shared/form";

export const BannerFormSchema = (
    t: TFunction<Namespace<"banner">>
) =>
    z.object({
        title_ar: z
            .string()
            .nonempty({ message: t("banner:validation.title_ar_required") })
            .min(3, { message: t("banner:validation.title_min") }),

        title_en: z
            .string()
            .nonempty({ message: t("banner:validation.title_en_required") })
            .min(3, { message: t("banner:validation.title_min") }),

        description_ar: z.string().nullable().optional(),
        description_en: z.string().nullable().optional(),

        button_text_ar: z.string().nullable().optional(),
        button_text_en: z.string().nullable().optional(),

        image_url: imageValidator(t("banner:validation.invalid_url"))
            .nullable()
            .optional(),

        link_url: z
            .string({ message: t("banner:validation.invalid_url") })
            .nullable()
            .optional()
            .or(z.literal("")),

        vertical_pos: z.enum(["top", "middle", "bottom"], {
            message: t("banner:validation.vertical_pos_required"),
        }),

        horizontal_pos: z.enum(["start", "center", "end"], {
            message: t("banner:validation.horizontal_pos_required"),
        }),

        text_color: colorValidator(t("banner:validation.invalid_hex_color"))
            .default("#ffffff"),

        btn_color: colorValidator(t("banner:validation.invalid_hex_color"))
            .default("#3b82f6"),

        btn_bg_color: colorValidator(t("banner:validation.invalid_hex_color"))
            .default("#3b82f6"),

        overlay_opacity: z
            .number()
            .min(0)
            .max(100)
            .default(40),

        // priority: z.coerce
        //     .number()
        //     .int()
        //     .min(1, { message: t("banner:validation.priority_min") }),

        is_active: z.boolean().default(true),
    });

export type BannerFormSchemaType = z.input<ReturnType<typeof BannerFormSchema>>;