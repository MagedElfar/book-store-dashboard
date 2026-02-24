import type { Order } from "./order";
import type { CreateOrderRequest } from "./request";

export interface OrderApiProvider {
    createOrder: (payload: CreateOrderRequest) => Promise<Order>;
}