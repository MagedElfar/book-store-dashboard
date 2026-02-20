import { useQuery } from "@tanstack/react-query";

import { getAddressById } from "../api";
import { ADDRESS_QUERY_KEY } from "../constants";

export function useGetAddressById(userId?: string, id?: string) {
    return useQuery({
        queryKey: [ADDRESS_QUERY_KEY, userId, id],
        queryFn: () => getAddressById(id!),
        enabled: !!id && !!userId
    })
}