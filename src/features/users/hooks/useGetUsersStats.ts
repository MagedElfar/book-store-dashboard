import { useQuery } from "@tanstack/react-query";

import { getUsersStats } from "../api";
import { USER_QUERY_KEY } from "../constants";

export function useGetUsersStats() {
    return useQuery({
        queryKey: [USER_QUERY_KEY, "stats"],
        queryFn: () => getUsersStats()
    })
}