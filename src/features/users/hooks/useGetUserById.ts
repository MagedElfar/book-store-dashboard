import { useQuery } from "@tanstack/react-query";

import { getUserById } from "../api";
import { USER_QUERY_KEY } from "../constants";

export function useGetUserById(id?: string) {
    return useQuery({
        queryKey: [USER_QUERY_KEY, id],
        queryFn: () => getUserById(id!),
        enabled: !!id
    })
}