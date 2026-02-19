import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUserApi } from "../api";
import { USER_QUERY_KEY } from "../constants";

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUserApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [USER_QUERY_KEY]
            });
        }
    });
}