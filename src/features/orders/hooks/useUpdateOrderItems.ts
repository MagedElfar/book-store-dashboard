import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOrderItemsApi } from "../api";
import { ORDER_QUERY_KEY } from "../constants";
import type { OrderItemPayload } from "../types";

export function useUpdateOrderItems(orderId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: OrderItemPayload[]) => updateOrderItemsApi(orderId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ORDER_QUERY_KEY]
            });
        }
    });
}