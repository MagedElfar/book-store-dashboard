import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAuthor } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";
import type { CreateAuthorPayload } from "../types";

export function useCreateAuthor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAuthorPayload) => createAuthor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [AUTHOR_QUERY_KEY]
            });
        }
    });
}