import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { phoneValidator } from "@/shared/form";

export const AddressFormSchema = (
    t: TFunction<Namespace<"address">>,
) =>
    z.object({
        full_name: z
            .string()
            .nonempty({ message: t("address:validation.full_name_required") })
            .min(2, { message: t("address:validation.full_name_min") }),

        phone: phoneValidator(t("address:validation.phone")).optional().nullable(),

        country: z
            .string()
            .nonempty({ message: t("address:validation.country_required") }),

        city: z
            .string()
            .nonempty({ message: t("address:validation.city_required") }),

        street_address: z
            .string()
            .nonempty({ message: t("address:validation.street_required") })
            .min(5, { message: t("address:validation.street_min") }),

        lat: z
            .number()
        ,
        lng: z
            .number(),

        is_default: z.boolean(),

        user_id: z.string().optional(),
    });

export type AddressFormSchemaType = z.infer<ReturnType<typeof AddressFormSchema>>;