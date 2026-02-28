import { useQuery } from "@tanstack/react-query";


import { getBannersApi } from "../api";
import { BANNER_QUERY_KEY } from "../constants";
import type { BannersParams } from "../types";

export function useGetBanners(params: BannersParams) {

    return useQuery({
        queryKey: [BANNER_QUERY_KEY, params],
        queryFn: () => getBannersApi(params)
    });
}