import { supabaseOrderProvider } from "../infrastructure";
import type { OrderApiProvider } from "../types";

export const orderApiProvider: OrderApiProvider = supabaseOrderProvider;

export const ORDER_QUERY_KEY = "orders";