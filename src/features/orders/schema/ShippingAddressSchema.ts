import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

export const ShippingAddressSchema = (t: TFunction<Namespace<"order">>) =>
    z.object({
        id: z.string().optional(),
        country: z
            .string()
            .nonempty({ message: t("order:validation.country_required") }),
        city: z
            .string()
            .nonempty({ message: t("order:validation.city_required") }),
        street_address: z
            .string()
            .nonempty({ message: t("order:validation.address_required") })
            .min(10, { message: t("order:validation.address_min") }),
        postal_code: z.string().optional().nullable(),
    });


export type ShippingAddressFormType = z.infer<ReturnType<typeof ShippingAddressSchema>>;
