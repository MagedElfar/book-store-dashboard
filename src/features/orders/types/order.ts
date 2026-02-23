import type { Book } from "@/features/books";

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'cod' | 'credit_card' | 'digital_wallet';

export interface ShippingAddress {
    country: string | null;
    state: string | null;
    city: string | null;
    street_address: string | null;
    postal_code: string | null;
}

export interface OrderItem {
    id: string;
    book_id: string;
    book?: Partial<Book>
    quantity: number;
    price_at_purchase: number;
}

export interface Order {
    id: string;
    order_number: number;
    created_at: string;

    customer_name: string;
    customer_email: string;
    customer_phone: string;
    user_id?: string;

    shipping_details: ShippingAddress;

    subtotal_amount: number;
    vat_amount: number;
    shipping_fees: number;
    total_amount: number;

    status: OrderStatus;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;

    items?: OrderItem[];
}