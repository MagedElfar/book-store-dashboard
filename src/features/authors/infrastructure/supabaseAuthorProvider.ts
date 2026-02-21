import { supabaseClient } from "@/shared/lib";

import type {
    Author,
    AuthorApiProvider,
    AuthorsParams,
    AuthorStatistics,
    CreateAuthorPayload,
    UpdateAuthorPayload
} from "../types";

export const supabaseAuthorProvider: AuthorApiProvider = {

    createAuthor: async function (payload: CreateAuthorPayload) {
        const { data, error } = await supabaseClient
            .from("authors")
            .insert(payload)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Author;
    },

    getAuthorById: async function (id: string) {
        const { data, error } = await supabaseClient
            .from("authors")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) throw new Error(error?.message || "Author not found");
        return data as Author;
    },

    getAuthors: async function (params: AuthorsParams) {
        const {
            search,
            is_active,
            sortBy = "newest",
            page = 1,
            limit = 10
        } = params;

        let query = supabaseClient
            .from("authors")
            .select("*", { count: "exact" });

        if (search) {
            query = query.or(`name_ar.ilike.%${search}%,name_en.ilike.%${search}%,slug.ilike.%${search}%`);
        }

        if (is_active !== undefined && is_active !== "") {
            query = query.eq("is_active", is_active === "active");
        }

        if (sortBy === "newest") {
            query = query.order("created_at", { ascending: false });
        } else if (sortBy === "oldest") {
            query = query.order("created_at", { ascending: true });
        } else if (sortBy === "alpha") {
            const currentLang = params.lang;
            query = query.order(`name_${currentLang}`, { ascending: true });
        }

        query = query.order("id", { ascending: false });


        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw new Error(error.message);

        return {
            items: (data || []) as Author[],
            total: count || 0,
        };
    },

    updateAuthor: async function (id: string, payload: UpdateAuthorPayload) {
        const { data, error } = await supabaseClient
            .from("authors")
            .update(payload)
            .eq("id", id)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Author;
    },

    deleteAuthor: async function (id: string) {
        const { error } = await supabaseClient
            .from("authors")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    },

    getAuthorsStats: async function (): Promise<AuthorStatistics> {
        const { data, error } = await supabaseClient
            .from("authors")
            .select("is_active, created_at");

        if (error) throw new Error(error.message);

        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        const stats: AuthorStatistics = {
            total_authors: data.length,
            active_authors: data.filter(a => a.is_active).length,
            inactive_authors: data.filter(a => !a.is_active).length,
            status_count: {
                active: data.filter(a => a.is_active).length,
                inactive: data.filter(a => !a.is_active).length,
            },
            new_authors_today: data.filter(a =>
                new Date(a.created_at).toDateString() === now.toDateString()
            ).length,
            new_authors_this_month: data.filter(a =>
                a.created_at >= firstDayOfMonth
            ).length,
        };

        return stats;
    },
};