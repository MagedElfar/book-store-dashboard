import type { GetManyResponse } from "@/shared/types";

import type { Category, CategoryStatistics } from "./category";
import type { CreateCategoryPayload, CategoriesParams, UpdateCategoryPayload } from "./request";

export interface CategoryApiProvider {
    createCategory: (payload: CreateCategoryPayload) => Promise<Category>;
    updateCategory: (id: string, payload: UpdateCategoryPayload) => Promise<Category>;
    getCategoryById: (id: string) => Promise<Category>;
    getCategoryBySlug: (slug: string) => Promise<Category>; // إضافة مفيدة للأصناف
    getCategories: (params: CategoriesParams) => Promise<GetManyResponse<Category>>;
    deleteCategory: (id: string) => Promise<void>;
    getCategoriesStats: () => Promise<CategoryStatistics>;
}