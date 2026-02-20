import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTagApi } from "../api";
import { TAG_QUERY_KEY } from "../constants";

export function useDeleteTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTagApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [TAG_QUERY_KEY]
            });
        }
    });
}