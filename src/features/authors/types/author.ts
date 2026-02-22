export interface Author {
    id: string;
    created_at: string;
    updated_at: string;
    name_ar: string;
    name_en: string;
    slug: string;
    bio_ar: string | null;
    bio_en: string | null;
    image_url: string | null;
    birth_date: string | null;
    booksCount: number
    is_active: boolean;
}

export interface AuthorStatistics {
    total_authors: number;
    active_authors: number;
    inactive_authors: number;

    status_count: {
        active: number;
        inactive: number;
    };

    new_authors_today: number;
    new_authors_this_month: number;

    growth_percentage?: number;
}