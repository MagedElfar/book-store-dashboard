import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBookApi } from "../api";
import { BOOK_QUERY_KEY } from "../constants";
import type { BookRequestPayload } from "../types";

export function useUpdateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: BookRequestPayload }) =>
            updateBookApi(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [BOOK_QUERY_KEY]
            });

        },
    });
}