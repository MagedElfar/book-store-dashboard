import type { GetManyResponse } from "@/shared/types";

import type { Order, OrdersStats } from "./order";
import type { CreateOrderRequest, UpdateOrderStatusPayload, EditOrderRequest, OrderItemPayload, OrderParams } from "./request";

export interface OrderApiProvider {
    createOrder: (payload: CreateOrderRequest) => Promise<Order>;
    getOrderById: (id: string) => Promise<Order>;
    getOrders: (params?: OrderParams) => Promise<GetManyResponse<Order>>;
    updateOrderStatus: (id: string, data: UpdateOrderStatusPayload) => Promise<void>
    updateOrder: (id: string, data: EditOrderRequest) => Promise<Order>
    updateOrderItems: (orderId: string, items: OrderItemPayload[]) => Promise<Order>
    getOrdersStat: () => Promise<OrdersStats>
}