import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBookApi } from "../api";
import { BOOK_QUERY_KEY } from "../constants";

export function useDeleteBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteBookApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [BOOK_QUERY_KEY]
            });
        }
    });
}