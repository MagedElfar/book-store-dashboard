import { orderApiProvider } from "../constants";
import type { EditOrderRequest, OrderItemPayload, UpdateOrderStatusPayload } from "../types";

export const updateOrderStatusApi = (id: string, data: UpdateOrderStatusPayload) => orderApiProvider.updateOrderStatus(id, data)

export const updateOrderApi = (id: string, data: EditOrderRequest) => orderApiProvider.updateOrder(id, data)

export const updateOrderItemsApi = (orderId: string, items: OrderItemPayload[]) => orderApiProvider.updateOrderItems(orderId, items)