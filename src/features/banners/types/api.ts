import type { GetManyResponse } from "@/shared/types";

import type { Banner } from "./banner";
import type { CreateBannerPayload, UpdateBannerPayload, BannersParams } from "./request";

export interface OrderedItemPayload { id: string; priority: number }

export interface BannerApiProvider {
    createBanner: (payload: CreateBannerPayload) => Promise<Banner>;
    updateBanner: (id: string, payload: UpdateBannerPayload) => Promise<Banner>;
    getBannerById: (id: string) => Promise<Banner>;
    getBanners: (params: BannersParams) => Promise<GetManyResponse<Banner>>;
    deleteBanner: (id: string) => Promise<void>;
    bulkReorderBannersApi: (orderedItems: OrderedItemPayload[]) => Promise<void>
}