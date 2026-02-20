import type { Category } from "./category";

export type CreateCategoryPayload = Omit<Category, "id" | "created_at">
export type UpdateCategoryPayload = CreateCategoryPayload

export type CategoriesParams = {
    search?: string;
    is_active?: string
    sortBy?: "oldest" | "newest";
    limit?: number;
    page?: number;
}