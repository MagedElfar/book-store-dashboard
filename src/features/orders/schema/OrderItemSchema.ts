import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

import { AutocompleteOptionSchema } from "@/shared/form";

export const OrderItemSchema = (t: TFunction<Namespace<"order">>) =>
    z.object({
        item: AutocompleteOptionSchema,
        price: z.coerce.number(),
        bookId: z.string(),
        quantity: z.coerce
            .number()
            .int()
            .min(1, { message: t("order:validation.quantity_min") }),
    });

export const OrderListFormSchema = (t: TFunction<Namespace<"order">>) =>
    z.object({
        tempBook: AutocompleteOptionSchema.nullish(),
        items: z
            .array(OrderItemSchema(t))
            .min(1, { message: t("order:validation.items_min") })
            .superRefine((items, ctx) => {
                items.forEach((item, index) => {
                    const book = item.item.data;
                    const availableStock = book?.stock || 0;

                    if (item.quantity > availableStock) {
                        ctx.addIssue({
                            code: "custom",
                            message: t("order:validation.quantity_max", { max: availableStock }),
                            path: [index, 'quantity']
                        });
                    }
                });
            }),
    });


export type OrderItemFormType = z.input<ReturnType<typeof OrderItemSchema>>;
export type OrderListFormType = z.input<ReturnType<typeof OrderListFormSchema>>;