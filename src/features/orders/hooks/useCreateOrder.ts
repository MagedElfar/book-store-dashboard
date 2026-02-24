import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrderApi } from "../api";
import { ORDER_QUERY_KEY } from "../constants";
import type { CreateOrderRequest } from "../types";

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateOrderRequest) => createOrderApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ORDER_QUERY_KEY]
            });
        }
    });
}