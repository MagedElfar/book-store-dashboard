import { orderApiProvider } from "../constants";

export const getOrderById = (id: string) => orderApiProvider.getOrderById(id)