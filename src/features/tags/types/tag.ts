export interface Tag {
    id: string;
    created_at: string;
    name_ar: string;
    name_en: string;
    slug: string;
    is_active: boolean;
}

export interface TagStatistics {
    total_tags: number;
    active_tags: number;
    inactive_tags: number;

    status_count: {
        active: number;
        inactive: number;
    };

    new_tags_today: number;
    new_tags_this_month: number;

    growth_percentage?: number;
}