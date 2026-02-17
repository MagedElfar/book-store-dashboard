import type { AuthApiProvider } from "@/features/auth/types/api-provider";
import type { LoginApiRequest } from "@/features/auth/types/request";
import type { AuthResponse } from "@/features/auth/types/response";
import { supabaseClient } from "@/shared/lib";

import type { User } from "../types/user";

export const supabaseAuthProvider: AuthApiProvider = {

    login: async function ({ email, password }: LoginApiRequest): Promise<AuthResponse> {

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,

        });

        if (error || !data.session || !data.user) {
            throw new Error(error?.message || "Login failed");
        }

        const user = await this.getCurrentUser();

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            user
        };
    },

    logout: async function (): Promise<void> {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw new Error(error.message);
    },

    refreshToken: async function (): Promise<AuthResponse> {
        const { data, error } = await supabaseClient.auth.refreshSession();
        if (error || !data.session || !data.user) {
            throw new Error(error?.message || "Refresh token failed");
        }

        const user = await this.getCurrentUser();

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            user
        };
    },

    getCurrentUser: async function (): Promise<User> {
        const { data, error: userError } = await supabaseClient.auth.getUser();

        const user = data?.user

        if (!user) {
            throw new Error(userError?.message || "user not found");
        };

        const { data: profile, error } = await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error || !profile) {
            throw new Error(error?.message || "Profile not found");
        }

        return {
            id: user.id,
            profileId: profile.id,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            full_name: profile.full_name,
            role: profile.role,
            email: user.email!,
            phone: profile?.phone
        };

    },

    updateUserProfile: async function (
        id: string,
        data: Partial<User>
    ): Promise<User> {

        const { error: profileError } = await supabaseClient
            .from("profiles")
            .update(data)
            .eq("id", id)


        if (profileError) throw new Error(profileError.message);

        // 3️⃣ رجع user الجديد
        return await this.getCurrentUser();
    }


};
