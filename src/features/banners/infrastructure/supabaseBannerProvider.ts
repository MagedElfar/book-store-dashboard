import { supabaseClient } from "@/shared/lib";

import type {
    Banner,
    BannerApiProvider,
    BannersParams,
    CreateBannerPayload,
    UpdateBannerPayload
} from "../types";

export const supabaseBannerProvider: BannerApiProvider = {

    createBanner: async function (payload: CreateBannerPayload) {
        const { data, error } = await supabaseClient
            .from("banners")
            .insert(payload)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Banner;
    },

    getBannerById: async function (id: string) {
        const { data, error } = await supabaseClient
            .from("banners")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) throw new Error(error?.message || "Banner not found");
        return data as Banner;
    },

    getBanners: async function (params: BannersParams) {
        const {
            search,
            is_active,
            sortBy = "priority",
            page = 1,
            limit = 10,
        } = params;

        let query = supabaseClient
            .from("banners")
            .select("*", { count: "exact" });

        if (search) {
            query = query.or(`title_ar.ilike.%${search}%,title_en.ilike.%${search}%`);
        }

        if (is_active !== undefined && is_active !== "") {
            query = query.eq("is_active", is_active === "active");
        }

        if (sortBy === "priority") {
            query = query.order("priority", { ascending: true });
        } else if (sortBy === "newest") {
            query = query.order("created_at", { ascending: false });
        } else if (sortBy === "oldest") {
            query = query.order("created_at", { ascending: true });
        }

        query = query.order("id", { ascending: false });

        // Pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw new Error(error.message);

        return {
            items: (data || []) as Banner[],
            total: count || 0,
        };
    },

    updateBanner: async function (id: string, payload: UpdateBannerPayload) {
        const { data, error } = await supabaseClient
            .from("banners")
            .update(payload)
            .eq("id", id)
            .select("*")
            .single();

        if (error) throw new Error(error.message);
        return data as Banner;
    },

    deleteBanner: async function (id: string) {
        const { error } = await supabaseClient
            .from("banners")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    },

    bulkReorderBannersApi: async function (orderedItems: { id: string; priority: number }[]) {
        const { error } = await supabaseClient.rpc('bulk_reorder_banners', {
            payload: orderedItems
        });

        if (error) throw error;
    }
};