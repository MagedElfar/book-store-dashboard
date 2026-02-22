import { supabaseClient } from "@/shared/lib";

import type {
    Tag,
    TagApiProvider,
    TagsParams,
    CreateTagPayload,
    UpdateTagPayload,
    TagStatistics
} from "../types";

export const supabaseTagProvider: TagApiProvider = {

    createTag: async function (payload: CreateTagPayload) {
        const { data, error } = await supabaseClient
            .from("tags")
            .insert(payload)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Tag;
    },

    getTags: async function (params: TagsParams) {
        const {
            search,
            is_active,
            sortBy = "newest",
            page = 1,
            limit = 10
        } = params;

        let query = supabaseClient
            .from("tags")
            .select("*", { count: "exact" });

        if (search) {
            query = query.or(`name_ar.ilike.%${search}%,name_en.ilike.%${search}%,slug.ilike.%${search}%`);
        }

        if (is_active !== "" && is_active !== undefined) {
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
            items: (data || []) as Tag[],
            total: count || 0,
        };
    },

    updateTag: async function (id: string, payload: UpdateTagPayload) {
        const { data, error } = await supabaseClient
            .from("tags")
            .update(payload)
            .eq("id", id)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Tag;
    },

    deleteTag: async function (id: string) {
        const { error } = await supabaseClient
            .from("tags")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    },

    getTagsStats: async function (): Promise<TagStatistics> {
        const { data, error } = await supabaseClient
            .rpc('get_tag_statistics');

        if (error) {
            throw new Error(error.message);
        }

        const growth = data.total_tags > 0
            ? (data.new_tags_this_month / data.total_tags) * 100
            : 0;

        return {
            ...data,
            growth_percentage: Math.round(growth)
        };
    },
};