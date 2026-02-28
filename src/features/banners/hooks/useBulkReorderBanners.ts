import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bulkReorderBannersApi } from "../api";
import { BANNER_QUERY_KEY } from "../constants";

export function useBulkReorderBanners() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { id: string; priority: number }[]) =>
            bulkReorderBannersApi(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [BANNER_QUERY_KEY]
            })
        },

    });
}