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

export const OrderListFormSchema = (
    t: TFunction<Namespace<any>>,
    defaultItems: any[] = []
) =>
    z.object({
        tempBook: AutocompleteOptionSchema.nullish(),
        items: z
            .array(OrderItemSchema(t))
            .min(1, { message: t("order:validation.items_min") })
            .superRefine((currentItems, ctx) => {
                currentItems.forEach((item, index) => {
                    const book = item.item.data;
                    const stockInWarehouse = book?.stock || 0;
                    const originalQty = defaultItems?.[index]?.quantity || 0;
                    const effectiveMax = stockInWarehouse + originalQty;

                    if (item.quantity > effectiveMax) {
                        ctx.addIssue({
                            code: "custom",
                            message: `${book?.title_en}: ${t("order:validation.quantity_max", { max: effectiveMax })}`,
                            path: [index, 'quantity']
                        });
                    }
                });
            }),
    });

export type OrderItemFormType = z.input<ReturnType<typeof OrderItemSchema>>;
export type OrderListFormType = z.input<ReturnType<typeof OrderListFormSchema>>;