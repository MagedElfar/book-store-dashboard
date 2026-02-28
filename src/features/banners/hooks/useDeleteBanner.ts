import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBannerApi } from "../api";
import { BANNER_QUERY_KEY } from "../constants";

export function useDeleteBanner() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteBannerApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [BANNER_QUERY_KEY]
            });
        }
    });
}