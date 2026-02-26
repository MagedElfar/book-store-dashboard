import { SHIPPING_FEE, VAT_FEE } from "@/core";
import { supabaseClient } from "@/shared/lib";

import type {
    CreateOrderRequest,
    EditOrderRequest,
    Order,
    OrderApiProvider,
    OrderItemPayload,
    OrderParams,
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

    getOrders: async function (params?: OrderParams) {
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabaseClient
            .from("orders")
            .select(`
                *,
                user:profiles (id, full_name, email, phone),
                items:order_items (id, quantity, price_at_purchase)
            `, { count: 'exact' });

        // 1. البحث (Search)
        if (params?.search) {
            const searchTerm = `%${params.search}%`;

            query = query.or(
                `customer_name.ilike.${searchTerm},` +
                `customer_email.ilike.${searchTerm},` +
                `customer_phone.ilike.${searchTerm}`
            );

            if (!isNaN(Number(params.search))) {
                query = query.or(`order_number.eq.${params.search}`);
            }
        }

        if (params?.startDate) {
            query = query.gte("created_at", params.startDate);
        }
        if (params?.endDate) {
            query = query.lte("created_at", params.endDate);
        }

        if (params?.status && params.status !== 'all') {
            query = query.eq("status", params.status);
        }

        // 4. الترتيب (Sorting)
        switch (params?.sortBy) {
            case "oldest":
                query = query.order("created_at", { ascending: true });
                break;
            case "total_desc":
                query = query.order("total_amount", { ascending: false });
                break;
            case "total_asc":
                query = query.order("total_amount", { ascending: true });
                break;
            case "status":
                query = query.order("status", { ascending: true })
                    .order("created_at", { ascending: false });
                break;
            case "newest":
            default:
                query = query.order("created_at", { ascending: false });
                break;
        }

        query = query.order("id", { ascending: false });

        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw new Error(error.message);

        const formattedData: Order[] = (data || []).map(order => ({
            ...order,
            shipping_details: {
                country: order.country,
                state: order.state_province,
                city: order.city,
                street_address: order.shipping_address,
                postal_code: order.postal_code,
            }
        }));

        return {
            items: formattedData,
            total: count || 0,
        };
    },


    getOrdersStat: async function () {
        const { data, error } = await supabaseClient
            .rpc('get_order_statistics');

        if (error) {
            throw new Error(error.message);
        }

        const thisMonth = data.orders_this_month || 0;
        const lastMonth = data.orders_last_month || 0;

        let growth = 0;
        if (lastMonth > 0) {
            growth = ((thisMonth - lastMonth) / lastMonth) * 100;
        } else if (thisMonth > 0) {
            growth = 100;
        }

        return {
            total_orders: data.total_orders || 0,
            total_revenue: data.total_revenue || 0,
            orders_this_month: thisMonth,
            orders_last_month: lastMonth,

            pending_orders: data.pending_orders || 0,
            shipped_orders: data.shipped_orders || 0,
            completed_orders: data.completed_orders || 0,
            processing_orders: data.processing_orders || 0,
            cancelled_orders: data.cancelled_orders || 0,

            growth_percentage: Math.round(growth)
        };
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