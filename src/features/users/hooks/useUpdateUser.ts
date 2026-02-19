import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUserApi } from "../api";
import { USER_QUERY_KEY } from "../constants";
import type { UpdateUserPayload } from "../types";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserPayload }) => updateUserApi(id, data),

        onSuccess: (updatedUser) => {
            queryClient.invalidateQueries({
                queryKey: [USER_QUERY_KEY]
            });

            queryClient.invalidateQueries({
                queryKey: [USER_QUERY_KEY, updatedUser.id]
            });
        },
    });
}