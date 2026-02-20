import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategoryApi } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCategoryApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CATEGORY_QUERY_KEY]
            });
        }
    });
}