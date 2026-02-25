import { SHIPPING_FEE, VAT_FEE } from "@/core";
import { supabaseClient } from "@/shared/lib";

import type {
    CreateOrderRequest,
    EditOrderRequest,
    Order,
    OrderApiProvider,
    OrderItemPayload,
    UpdateOrderStatusPayload
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
                note: payload.note || "",
                status: "pending",
                payment_status: "pending",
                subtotal_amount,
                shipping_fees,
                vat_amount,
                total_amount,
            })
            .select()
            .single();

        if (orderError?.message) throw new Error(orderError?.message);

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

            if (itemsError?.message) throw new Error(itemsError?.message);
        }

        return order;
    },

    updateOrder: async function (id: string, payload: EditOrderRequest) {

        const { data: order, error } = await supabaseClient
            .from("orders")
            .update({
                customer_name: payload.customer_name,
                customer_email: payload.customer_email,
                customer_phone: payload.customer_phone,
                country: payload.shipping_details.country,
                state_province: payload.shipping_details.state,
                city: payload.shipping_details.city,
                shipping_address: payload.shipping_details.street_address,
                postal_code: payload.shipping_details.postal_code,
                payment_method: payload.payment_method,
                note: payload.note || "",
            })
            .eq("id", id)
            .select()
            .single();

        if (error)
            throw new Error(error.message)

        return order;
    },

    getOrderById: async function (id: string) {
        const { data, error } = await supabaseClient
            .from("orders")
            .select(`
            *,
            user:profiles (
                id,
                full_name,
                email,
                phone
            ),
            items:order_items (
                id,
                book_id,
                quantity,
                price_at_purchase,
                book:books (
                    id,
                    title_ar,
                    title_en,
                    price,
                    cover_image
                )
            )
        `)
            .eq("id", id)
            .single();

        if (error) throw new Error(error.message);

        const formattedOrder: Order = {
            ...data,
            user: data.user || null,
            shipping_details: {
                country: data.country,
                state: data.state_province,
                city: data.city,
                street_address: data.shipping_address,
                postal_code: data.postal_code,
            },
            customer_name: data.user?.name || data.customer_name,
            customer_email: data.user?.email || data.customer_email,
            customer_phone: data.user?.phone || data.customer_phone,
            items: data.items || []
        };

        return formattedOrder;
    },

    updateOrderStatus: async function (id: string, payload: UpdateOrderStatusPayload) {

        const { payment_status, status } = payload

        const { error } = await supabaseClient
            .from("orders")
            .update({
                ...(status && { status }),
                ...(payment_status && { payment_status }),
            })
            .eq("id", id)
            .select()
            .single();

        if (error?.message) throw new Error(error?.message);

        return;
    },

    updateOrderItems: async function (orderId: string, items: OrderItemPayload[]) {
        const shipping_fees = SHIPPING_FEE;
        const subtotal_amount = items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);

        const vat_amount = subtotal_amount * VAT_FEE;
        const total_amount = subtotal_amount + Number(shipping_fees) + vat_amount;

        const { error: deleteError } = await supabaseClient
            .from("order_items")
            .delete()
            .eq("order_id", orderId);

        if (deleteError) throw new Error(deleteError.message);

        if (items.length > 0) {
            const itemsPayload = items.map((item) => ({
                order_id: orderId,
                book_id: item.bookId,
                quantity: item.quantity,
                price_at_purchase: item.price,
            }));

            const { error: insertError } = await supabaseClient
                .from("order_items")
                .insert(itemsPayload);

            if (insertError) throw new Error(insertError.message);
        }

        const { error: updateOrderError } = await supabaseClient
            .from("orders")
            .update({
                subtotal_amount,
                shipping_fees,
                vat_amount,
                total_amount,
            })
            .eq("id", orderId)
            .select()
            .single();

        if (updateOrderError) throw new Error(updateOrderError.message);

        return this.getOrderById(orderId);
    },
};