import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOrderStatusApi } from "../api";
import { ORDER_QUERY_KEY } from "../constants";
import type { UpdateOrderStatusPayload } from "../types";

export function useUpdateOrderStatus(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateOrderStatusPayload) => updateOrderStatusApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ORDER_QUERY_KEY]
            });
        }
    });
}