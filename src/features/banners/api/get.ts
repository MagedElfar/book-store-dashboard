import { bannerApiProvider } from "../constants";
import type { BannersParams } from "../types";

export const getBannerByIdApi = (id: string) => bannerApiProvider.getBannerById(id);

export const getBannersApi = (params: BannersParams) => bannerApiProvider.getBanners(params);

