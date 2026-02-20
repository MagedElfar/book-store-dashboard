import { supabaseClient } from "@/shared/lib";

import type { CreateUserPayload, UpdateUserPayload, User, UserApiProvider, UsersParams, UserStatistics } from "../types";

export const supabaseUserProvider: UserApiProvider = {

    createUser: async function (payload: CreateUserPayload) {

        const { email, password, ...profile } = payload;

        // 1. احفظ current session
        const { data: currentSession } = await supabaseClient.auth.getSession();

        // 2. create new user
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
        });

        if (error) throw new Error(error.message);

        const userId = data.user?.id;

        if (!userId) throw new Error("Error while creating new user");

        // 3. create profile
        const { error: profileError } = await supabaseClient
            .from("profiles")
            .insert({
                id: userId,
                email,
                ...profile,
            });

        if (profileError) throw new Error(profileError.message);

        // 4. restore old session
        if (currentSession.session) {
            await supabaseClient.auth.setSession({
                access_token: currentSession.session.access_token,
                refresh_token: currentSession.session.refresh_token,
            });
        }

        return await this.getUserById(userId);
    },

    getUserById: async function (id: string) {
        const { data: profile, error } = await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !profile) {
            throw new Error(error?.message || "Profile not found");
        }

        return {
            id: profile.id,
            profileId: profile.id,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            full_name: profile.full_name,
            role: profile.role,
            email: profile.email!,
            phone: profile?.phone
        };

    },

    getUsers: async function (params: UsersParams) {
        const {
            search,
            role,
            sortBy = "newest",
            page = 1,
            limit = 10
        } = params;

        let query = supabaseClient
            .from("profiles")
            .select("*", { count: "exact" });

        if (search) {
            query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
        }

        if (role) {
            query = query.eq("role", role);
        }

        if (sortBy === "newest") {
            query = query.order("created_at", { ascending: false });
        } else {
            query = query.order("created_at", { ascending: true });
        }

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw new Error(error.message);

        const users: User[] = (data || []).map((profile) => ({
            id: profile.id,
            profileId: profile.id,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            full_name: profile.full_name,
            role: profile.role,
            email: profile.email!,
            phone: profile?.phone,
        }));

        return {
            items: users,
            total: count || 0,
        };
    },

    updateUser: async function (id: string, payload: UpdateUserPayload) {

        const { error: profileError } = await supabaseClient
            .from("profiles")
            .update(payload)
            .eq("id", id)
            .select("*")
            .single();

        if (profileError) throw new Error(profileError.message);


        return await this.getUserById(id);
    },

    deleteUser: async function (id: string) {
        const { error } = await supabaseClient
            .from("profiles")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    },


    getUsersStats: async function (): Promise<UserStatistics> {
        const { data, error } = await supabaseClient
            .from("profiles")
            .select("role, created_at");

        if (error) throw new Error(error.message);

        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        const stats: UserStatistics = {
            total_users: data.length,
            active_users: data.length,
            inactive_users: 0,
            roles_count: {
                admin: data.filter(u => u.role === 'admin').length,
                user: data.filter(u => u.role === 'user').length,
                support: data.filter(u => u.role === 'support').length,
            },
            new_users_today: data.filter(u =>
                new Date(u.created_at).toDateString() === now.toDateString()
            ).length,
            new_users_this_month: data.filter(u =>
                u.created_at >= firstDayOfMonth
            ).length,
        };

        return stats;
    },

};
