import type { CreateOrderFormSchemaType, OrderItemFormType } from "../schema";
import type { CreateOrderRequest, OrderItemPayload } from "../types";

export function mapCreateOrderFormToRequest(data: CreateOrderFormSchemaType): CreateOrderRequest {
    return {
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        user_id: data?.user_id || undefined,
        shipping_details: {
            country: data.shipping_details.country,
            // state: null,
            city: data.shipping_details.city,
            street_address: data.shipping_details.street_address,
            // postal_code: null,
        },
        payment_method: data?.payment_method,
        items: data.items.map(item => mapOrderItemToPayloadItem(item)),
        note: data?.orderNotes || ""
    }
}

export function mapOrderItemToPayloadItem(item: OrderItemFormType): OrderItemPayload {
    return {
        bookId: item.bookId,
        quantity: item.quantity as number,
        price: item.price as number
    }
}