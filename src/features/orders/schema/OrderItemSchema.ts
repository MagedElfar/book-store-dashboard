import type { Namespace, TFunction } from "i18next";
import { z } from "zod";

export const OrderItemSchema = (t: TFunction<Namespace<"order">>) =>
    z.object({
        bookId: z.string().nonempty({ message: t("order:validation.book_required") }),
        quantity: z.coerce
            .number()
            .int()
            .min(1, { message: t("order:validation.quantity_min") }),
    });



export type OrderItemFormType = z.infer<ReturnType<typeof OrderItemSchema>>;
