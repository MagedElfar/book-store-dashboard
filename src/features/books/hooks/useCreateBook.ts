import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBookApi } from "../api";
import { BOOK_QUERY_KEY } from "../constants";
import type { BookRequestPayload } from "../types";

export function useCreateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BookRequestPayload) => createBookApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [BOOK_QUERY_KEY]
            });
        }
    });
}