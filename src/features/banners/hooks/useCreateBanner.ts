import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBannerApi } from "../api";
import { BANNER_QUERY_KEY } from "../constants";
import type { CreateBannerPayload } from "../types";

export function useCreateBanner() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBannerPayload) => createBannerApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [BANNER_QUERY_KEY]
            });
        }
    });
}