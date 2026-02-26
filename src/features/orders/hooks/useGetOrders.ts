import { useQuery } from "@tanstack/react-query";

import { getOrdersApi } from "../api";
import { ORDER_QUERY_KEY } from "../constants";
import type { OrderParams } from "../types";

export function useGetOrders(params: OrderParams) {
    return useQuery({
        queryKey: [ORDER_QUERY_KEY, params],
        queryFn: () => getOrdersApi(params)
    });
}