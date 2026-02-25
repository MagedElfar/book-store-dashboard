import type { Order } from "./order";
import type { CreateOrderRequest, UpdateOrderStatusPayload, EditOrderRequest, OrderItemPayload } from "./request";

export interface OrderApiProvider {
    createOrder: (payload: CreateOrderRequest) => Promise<Order>;
    getOrderById: (id: string) => Promise<Order>;
    updateOrderStatus: (id: string, data: UpdateOrderStatusPayload) => Promise<void>
    updateOrder: (id: string, data: EditOrderRequest) => Promise<Order>
    updateOrderItems: (orderId: string, items: OrderItemPayload[]) => Promise<Order>
}