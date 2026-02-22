import type { SupportedLang } from "@/shared/types";

import type { BookImage } from "./book";

export interface BookRequestPayload {
    title_ar: string;
    title_en: string;
    slug: string;
    description_ar: string;
    description_en: string;
    price: number;
    sale_price: number | undefined;
    sku: string;
    isbn: string;
    stock: number;
    cover_image: string | null;
    images: (BookImage)[];
    author_ids: string[];
    category_ids: string[];
    tag_ids: string[];
    pages: number;
    publisher: string;
    published_year: number;
    is_active: boolean;
}

export interface BookParams {
    search?: string;
    category_id?: string | null;
    author_id?: string | null;
    is_active?: string;
    sortBy?: "newest" | "oldest" | "price_high" | "price_low" | "alpha";
    page?: number;
    limit?: number;
    lang?: SupportedLang;
}