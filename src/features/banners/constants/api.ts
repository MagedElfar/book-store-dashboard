import { supabaseBannerProvider } from "../infrastructure";
import type { BannerApiProvider } from "../types";

export const bannerApiProvider: BannerApiProvider = supabaseBannerProvider;

export const BANNER_QUERY_KEY = "banners" as const;