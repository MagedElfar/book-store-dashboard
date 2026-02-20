import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTagApi } from "../api";
import { TAG_QUERY_KEY } from "../constants";
import type { UpdateTagPayload } from "../types";

export function useUpdateTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTagPayload }) =>
            updateTagApi(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [TAG_QUERY_KEY]
            });
        },
    });
}