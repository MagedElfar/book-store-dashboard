import { useQuery } from "@tanstack/react-query";

import { getAddressesApi } from "../api";
import { ADDRESS_QUERY_KEY } from "../constants";

export function useGetAddresses(userId?: string) {
    return useQuery({
        queryKey: [ADDRESS_QUERY_KEY, userId],
        queryFn: () => getAddressesApi(userId!),
        enabled: !!userId,
    });
}