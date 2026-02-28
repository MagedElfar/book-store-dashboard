import { useQuery } from "@tanstack/react-query";

import { getBannerByIdApi } from "../api";
import { BANNER_QUERY_KEY } from "../constants";

export function useGetBannerById(id?: string) {
    return useQuery({
        queryKey: [BANNER_QUERY_KEY, id],
        queryFn: () => getBannerByIdApi(id!),
        enabled: !!id
    });
}