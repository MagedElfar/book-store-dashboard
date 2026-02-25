import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOrderApi } from "../api";
import { ORDER_QUERY_KEY } from "../constants";
import type { EditOrderRequest } from "../types";

export function useUpdateOrder(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: EditOrderRequest) => updateOrderApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ORDER_QUERY_KEY]
            });
        }
    });
}