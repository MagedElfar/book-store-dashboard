import type { Book } from "@/features/books";
import type { User } from "@/features/users";

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'cod' | 'credit_card' | 'digital_wallet';

export interface ShippingAddress {
    country: string;
    state?: string;
    city: string;
    street_address: string;
    postal_code?: string;
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
    user?: Partial<User> | null,
    shipping_details: ShippingAddress;

    subtotal_amount: number;
    vat_amount: number;
    shipping_fees: number;
    total_amount: number;

    status: OrderStatus;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;

    items?: OrderItem[];

    note?: string
}