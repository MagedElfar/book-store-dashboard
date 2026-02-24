import { orderApiProvider } from "../constants";
import type { CreateOrderRequest } from "../types";

export const createOrderApi = (payload: CreateOrderRequest) => orderApiProvider.createOrder(payload);