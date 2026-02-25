import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { ShippingAddressSchema } from "./ShippingAddressSchema";

export const EditOrderSchema = (t: TFunction<Namespace<"order">>) => {
    return z.object({
        customer_name: z
            .string()
            .nonempty({ message: t("order:validation.name_required") })
            .min(3, { message: t("order:validation.name_min") }),
        customer_email: z
            .email({ message: t("order:validation.email_invalid") })
            .nonempty({ message: t("order:validation.email_required") }),
        customer_phone: z
            .string()
            .nonempty({ message: t("order:validation.phone_required") })
            .regex(/^[0-9+]+$/, { message: t("order:validation.phone_invalid") }),
        shipping_details: ShippingAddressSchema(t),
        payment_method: z.enum(['cod', 'credit_card', 'digital_wallet'], {
            message: t("order:validation.payment_method_required"),
        }),
        orderNotes: z.string().nullish()
    })
};

export type EditOrderFormType = z.input<ReturnType<typeof EditOrderSchema>>;