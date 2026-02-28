import type { SupportedLang } from "@/shared/types";

import type { Banner } from "./index";

export type CreateBannerPayload = Omit<Banner, "id" | "created_at" | "updated_at">;

export type UpdateBannerPayload = Partial<CreateBannerPayload>;

export type BannersParams = {
    search?: string;
    is_active?: string;
    category?: string;
    sortBy?: "oldest" | "newest" | "priority";
    limit?: number;
    page?: number;
    lang?: SupportedLang;
};