import type { Author } from "@/features/authors";
import type { Category } from "@/features/categories";
import type { Tag } from "@/features/tags";

export interface BookImage {
    id?: string;
    book_id?: string;
    image_url: string;
    display_order: number;
}
export interface Book {
    id: string;
    title_ar: string;
    title_en: string;
    slug: string;
    description_ar: string | null;
    description_en: string | null;
    price: number;
    sale_price: number | null;
    sku: string;
    isbn: string | null;
    stock: number;
    cover_image: string | null;
    pages: number | null;
    publisher: string | null;
    published_year: number | null;
    average_rating: number;
    total_reviews: number;
    is_active: boolean;
    author_id: string | null;
    created_at: string;
    updated_at: string;

    author?: Author;
    book_images?: BookImage[];
    categories?: Category[];
    tags?: Tag[];
}