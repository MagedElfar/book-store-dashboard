import { useInfiniteLookup } from "@/shared/hooks";

import { USER_QUERY_KEY } from "../constants";
import type { User, UsersParams } from "../types";

import { getUsers } from "./../api"

export function useGetInfiniteUsers(params: UsersParams, enabled: boolean) {
    return useInfiniteLookup<User>(
        [USER_QUERY_KEY, 'infinite', params],
        (page) => getUsers({ ...params, page }),
        enabled
    );
}