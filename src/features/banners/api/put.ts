import { bannerApiProvider } from "../constants";
import type { UpdateBannerPayload } from "../types";

export const updateBannerApi = (id: string, payload: UpdateBannerPayload) =>
    bannerApiProvider.updateBanner(id, payload);