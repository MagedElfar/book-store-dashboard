import { supabaseClient } from "@/shared/lib";

import type {
    Category,
    CategoryApiProvider,
    CategoriesParams,
    CategoryStatistics,
    CreateCategoryPayload,
    UpdateCategoryPayload
} from "../types";

export const supabaseCategoryProvider: CategoryApiProvider = {

    createCategory: async function (payload: CreateCategoryPayload) {
        const { data, error } = await supabaseClient
            .from("categories")
            .insert(payload)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Category;
    },

    getCategoryById: async function (id: string) {
        const { data, error } = await supabaseClient
            .from("categories")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) throw new Error(error?.message || "Category not found");
        return data as Category;
    },

    getCategoryBySlug: async function (slug: string) {
        const { data, error } = await supabaseClient
            .from("categories")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error || !data) throw new Error(error?.message || "Category not found");
        return data as Category;
    },

    getCategories: async function (params: CategoriesParams) {
        const {
            search,
            is_active,
            sortBy = "newest",
            page = 1,
            limit = 10
        } = params;

        let query = supabaseClient
            .from("categories")
            .select("*", { count: "exact" });

        if (search) {
            query = query.or(`name_ar.ilike.%${search}%,name_en.ilike.%${search}%,slug.ilike.%${search}%`);
        }

        if (is_active !== "") {
            query = query.eq("is_active", is_active === "active");
        }

        if (sortBy === "newest") {
            query = query.order("created_at", { ascending: false });
        } else {
            query = query.order("created_at", { ascending: true });
        }

        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw new Error(error.message);

        return {
            items: (data || []) as Category[],
            total: count || 0,
        };
    },

    updateCategory: async function (id: string, payload: UpdateCategoryPayload) {
        const { data, error } = await supabaseClient
            .from("categories")
            .update(payload)
            .eq("id", id)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Category;
    },

    deleteCategory: async function (id: string) {
        const { error } = await supabaseClient
            .from("categories")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    },

    getCategoriesStats: async function (): Promise<CategoryStatistics> {
        const { data, error } = await supabaseClient
            .from("categories")
            .select("is_active, created_at");

        if (error) throw new Error(error.message);

        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        const stats: CategoryStatistics = {
            total_categories: data.length,
            active_categories: data.filter(c => c.is_active).length,
            inactive_categories: data.filter(c => !c.is_active).length,
            status_count: {
                active: data.filter(c => c.is_active).length,
                inactive: data.filter(c => !c.is_active).length,
            },
            new_categories_today: data.filter(c =>
                new Date(c.created_at).toDateString() === now.toDateString()
            ).length,
            new_categories_this_month: data.filter(c =>
                c.created_at >= firstDayOfMonth
            ).length,
        };

        return stats;
    },
};