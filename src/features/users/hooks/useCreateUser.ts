// hooks/useCreateUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "../api";
import { USER_QUERY_KEY } from "../constants";
import type { CreateUserPayload } from "../types";

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserPayload) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [USER_QUERY_KEY]
            });
        }
    });
}
