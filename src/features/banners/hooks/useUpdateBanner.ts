import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBannerApi } from "../api";
import { BANNER_QUERY_KEY } from "../constants";
import type { UpdateBannerPayload } from "../types";

export function useUpdateBanner() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateBannerPayload }) =>
            updateBannerApi(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [BANNER_QUERY_KEY]
            })
        },
    });
}