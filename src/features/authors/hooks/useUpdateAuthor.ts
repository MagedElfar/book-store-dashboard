import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAuthorApi } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";
import type { UpdateAuthorPayload } from "../types";

export function useUpdateAuthor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateAuthorPayload }) =>
            updateAuthorApi(id, data),

        onSuccess: (updatedAuthor) => {
            queryClient.invalidateQueries({
                queryKey: [AUTHOR_QUERY_KEY]
            });

            queryClient.invalidateQueries({
                queryKey: [AUTHOR_QUERY_KEY, updatedAuthor.id]
            });
        },
    });
}