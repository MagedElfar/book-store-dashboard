import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCategoryApi } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";
import type { UpdateCategoryPayload } from "../types";

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCategoryPayload }) =>
            updateCategoryApi(id, data),

        onSuccess: (updatedCategory) => {
            queryClient.invalidateQueries({
                queryKey: [CATEGORY_QUERY_KEY]
            });

            queryClient.invalidateQueries({
                queryKey: [CATEGORY_QUERY_KEY, updatedCategory.id]
            });
        },
    });
}