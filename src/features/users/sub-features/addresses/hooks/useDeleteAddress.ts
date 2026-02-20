import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAddressApi } from "../api";
import { ADDRESS_QUERY_KEY } from "../constants";

export function useDeleteAddress(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        // Uses the infrastructure provider method
        mutationFn: (id: string) => deleteAddressApi(id),

        onSuccess: () => {
            // Invalidate the addresses list for this specific user
            queryClient.invalidateQueries({
                queryKey: [ADDRESS_QUERY_KEY, userId]
            });
        }
    });
}