import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAddressApi } from "../api";
import { ADDRESS_QUERY_KEY } from "../constants";
import type { UpdateAddressPayload } from "../types/request";

export function useUpdateAddress(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        // Accepts id and payload as an object to match your pattern
        mutationFn: ({ id, data }: { id: string; data: UpdateAddressPayload }) => updateAddressApi(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ADDRESS_QUERY_KEY, userId]
            });
        },
    });
}