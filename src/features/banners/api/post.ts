import { bannerApiProvider } from "../constants";
import type { CreateBannerPayload, OrderedItemPayload } from "../types";

export const createBannerApi = (payload: CreateBannerPayload) => bannerApiProvider.createBanner(payload);

export const bulkReorderBannersApi = (payload: OrderedItemPayload[]) => bannerApiProvider.bulkReorderBannersApi(payload);
