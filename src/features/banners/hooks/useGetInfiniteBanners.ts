import { useInfiniteLookup } from "@/shared/hooks";

import { BANNER_QUERY_KEY } from "../constants";
import type { BannersParams, Banner } from "../types";

import { getBannersApi } from "./../api"

export function useGetInfiniteBanners(params: BannersParams, enabled: boolean) {
    return useInfiniteLookup<Banner>(
        [BANNER_QUERY_KEY, 'infinite', params],
        (page) => getBannersApi({ ...params, limit: 9, page }),
        enabled,
        9
    );
}