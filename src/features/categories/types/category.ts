// src/features/categories/types/index.ts

export interface Category {
    id: string;
    created_at: string;
    name_ar: string;
    name_en: string;
    description_ar: string | null;
    description_en: string | null;
    slug: string;
    image_url: string | null;
    is_active: boolean;
}

export interface CategoryStatistics {
    total_categories: number;
    active_categories: number;
    inactive_categories: number;

    status_count: {
        active: number;
        inactive: number;
    };

    new_categories_today: number;
    new_categories_this_month: number;

    growth_percentage?: number;
}