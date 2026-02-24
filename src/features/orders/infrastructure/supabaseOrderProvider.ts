import { SHIPPING_FEE, VAT_FEE } from "@/core";
import { supabaseClient } from "@/shared/lib";

import type {
    CreateOrderRequest,
    OrderApiProvider
} from "../types";

export const supabaseOrderProvider: OrderApiProvider = {

    createOrder: async function (payload: CreateOrderRequest) {

        const shipping_fees = SHIPPING_FEE;
        const subtotal_amount = (payload?.items || []).reduce((sum, item) => {
            const price = item.price
            const quantity = item.quantity
            return sum + price * quantity
        }, 0)
        const vat_amount = subtotal_amount * VAT_FEE;
        const total_amount = subtotal_amount + Number(shipping_fees) + vat_amount;

        const { data: order, error: orderError } = await supabaseClient
            .from("orders")
            .insert({
                customer_name: payload.customer_name,
                customer_email: payload.customer_email,
                customer_phone: payload.customer_phone,
                user_id: payload.user_id || null,
                country: payload.shipping_details.country,
                state_province: payload.shipping_details.state,
                city: payload.shipping_details.city,
                shipping_address: payload.shipping_details.street_address,
                postal_code: payload.shipping_details.postal_code,
                payment_method: payload.payment_method,
                landmark: payload.note || "",
                status: "pending",

                subtotal_amount,
                shipping_fees,
                vat_amount,
                total_amount,
            })
            .select()
            .single();

        if (orderError) throw orderError;

        if (payload.items && payload.items.length > 0) {
            const itemsPayload = payload.items.map((item) => ({
                order_id: order.id,
                book_id: item.bookId,
                quantity: item.quantity,
                price_at_purchase: item.price,
            }));

            const { error: itemsError } = await supabaseClient
                .from("order_items")
                .insert(itemsPayload);

            if (itemsError) throw itemsError;
        }

        return order;
    },
};