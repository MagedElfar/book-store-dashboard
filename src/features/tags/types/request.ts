import type { SupportedLang } from "@/shared/types";

import type { Tag } from "./tag";

export type CreateTagPayload = Omit<Tag, "id" | "created_at">;
export type UpdateTagPayload = CreateTagPayload;

export type TagsParams = {
    search?: string;
    is_active?: string;
    sortBy?: "oldest" | "newest" | "alpha";
    limit?: number;
    page?: number;
    lang?: SupportedLang
};