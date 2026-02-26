import { orderApiProvider } from "../constants";
import type { OrderParams } from "../types";

export const getOrderById = (id: string) => orderApiProvider.getOrderById(id)

export const getOrdersApi = (params: OrderParams) => orderApiProvider.getOrders(params)

export const getOrdersStateApi = () => orderApiProvider.getOrdersStat()