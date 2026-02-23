import type { Namespace, TFunction } from "i18next";
import { z } from "zod";


import { OrderItemSchema } from "./OrderItemSchema";
import { ShippingAddressSchema } from "./ShippingAddressSchema";

export const CreateOrderFormSchema = (t: TFunction<Namespace<"order">>) =>
    z.object({

        user_id: z
            .string()
            .optional()
            .nullable(),

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

        user: z.object({
            id: z.string().optional(),
            full_name: z.string().optional(),
            avatar_url: z.string().optional(),
            phone: z.string().optional(),
            email: z.string().optional()
        })
            .nullable(),

        shipping_details: ShippingAddressSchema(t),

        payment_method: z.enum(['cod', 'credit_card', 'digital_wallet'], {
            message: t("order:validation.payment_method_required"),
        }),

        items: z
            .array(OrderItemSchema(t))
            .min(1, { message: t("order:validation.items_min") }),
    });

export type CreateOrderFormSchemaType = z.input<ReturnType<typeof CreateOrderFormSchema>>;