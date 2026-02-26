import type { OrderStatus, PaymentMethod, PaymentStatus, ShippingAddress } from "./order";

export interface CreateOrderRequest {
    customer_name: string,
    customer_email: string;
    customer_phone: string;
    user_id?: string;
    shipping_details: ShippingAddress;
    payment_method: PaymentMethod;
    items?: OrderItemPayload[];
    note?: string
}

export interface EditOrderRequest {
    customer_name: string,
    customer_email: string;
    customer_phone: string;
    shipping_details: ShippingAddress;
    payment_method: PaymentMethod;
    note?: string
}

export interface OrderItemPayload {
    bookId: string,
    quantity: number,
    price: number
}

export interface UpdateOrderStatusPayload {
    status?: OrderStatus;
    payment_status?: PaymentStatus;
}

export interface OrderParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: OrderStatus | "all";
    startDate?: string;
    endDate?: string;
    sortBy?: OrderSortBy;
    order?: 'asc' | 'desc';
}

export type OrderSortBy =
    | "newest"
    | "oldest"
    | "total_desc"
    | "total_asc"
    | "status"         
