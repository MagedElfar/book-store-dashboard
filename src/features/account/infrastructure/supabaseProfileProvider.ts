import { paths } from "@/shared/constants";
import { supabaseClient } from "@/shared/lib";

import type { AccountApiProvider } from "../types/api-provider";

export const supabaseProfileProvider: AccountApiProvider = {

    changeEmailApi: async function (email: string): Promise<void> {
        const redirectUrl = `${window.location.origin}${paths.account.verified}`;
        const { error: authError } = await supabaseClient.auth.updateUser(
            {
                email,
            },
            {
                emailRedirectTo: redirectUrl
            }
        );

        if (authError) throw new Error(authError.message);
    },

    changePasswordApi: async function (
        oldPassword: string,
        newPassword: string,
        email: string
    ): Promise<void> {

        // Verify old password
        const { data: signInData, error: signInError } =
            await supabaseClient.auth.signInWithPassword({
                email,
                password: oldPassword,
            });

        if (signInError || !signInData.session) {
            throw new Error(signInError?.message);
        }

        const redirectUrl = `${window.location.origin}${paths.account.verified}`;

        const { error: updateError } = await supabaseClient.auth.updateUser({
            password: newPassword,
        },
            {
                emailRedirectTo: redirectUrl
            }
        );

        if (updateError) throw new Error(updateError.message);
    },


};
