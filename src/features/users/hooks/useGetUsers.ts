import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api";
import { USER_QUERY_KEY } from "../constants";
import type { UsersParams } from "../types";

export function useGetUsers(params: UsersParams) {
    return useQuery({
        queryKey: [USER_QUERY_KEY, params],
        queryFn: () => getUsers(params)
    })
}