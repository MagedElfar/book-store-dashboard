import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";
import type { CreateCategoryPayload } from "../types";

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCategoryPayload) => createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CATEGORY_QUERY_KEY]
            });
        }
    });
}