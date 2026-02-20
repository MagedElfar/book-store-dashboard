import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAuthorApi } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";

export function useDeleteAuthor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteAuthorApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [AUTHOR_QUERY_KEY]
            });
        }
    });
}