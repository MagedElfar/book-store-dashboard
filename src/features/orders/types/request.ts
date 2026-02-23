import type { PaymentMethod, ShippingAddress } from "./order";

export interface CreateOrderRequest {
    customer_name: string,
    customer_email: string;
    customer_phone: string;
    user_id?: string;
    shipping_details: ShippingAddress;
    payment_method: PaymentMethod;
    items?: OrderItemPayload[];
}

export interface OrderItemPayload {
    bookId: string,
    quantity: number
}