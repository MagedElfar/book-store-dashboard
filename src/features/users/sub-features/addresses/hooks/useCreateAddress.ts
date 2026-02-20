import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAddressApi } from "../api";
import { ADDRESS_QUERY_KEY } from "../constants"; // Define this as 'user-addresses'
import type { CreateAddressPayload } from "../types/request";

export function useCreateAddress(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        // Use the provider we built earlier
        mutationFn: (data: CreateAddressPayload) => createAddressApi(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ADDRESS_QUERY_KEY, userId]
            });
        }
    });
}