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
            .select(`
            *,
            books:books(count) 
        `, { count: "exact" });

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
            items: (data?.map(item => ({
                ...item,
                booksCount: item?.books?.[0]?.count ?? 0
            })) || []) as Author[],
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
            .rpc('get_author_statistics');

        if (error) {
            throw new Error(error.message);
        }

        const growth = data.total_authors > 0
            ? (data.new_authors_this_month / data.total_authors) * 100
            : 0;

        return {
            ...data,
            growth_percentage: Math.round(growth)
        };
    },
};