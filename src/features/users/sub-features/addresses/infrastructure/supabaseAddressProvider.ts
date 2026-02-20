import { supabaseClient } from "@/shared/lib";

import type { UserAddress, AddressApiProvider } from "../types";
import type { CreateAddressPayload, UpdateAddressPayload } from "../types/request";

export const supabaseAddressProvider: AddressApiProvider = {

    getAddressesByUserId: async (userId: string): Promise<UserAddress[]> => {
        const { data, error } = await supabaseClient
            .from("user_addresses")
            .select("*")
            .eq("user_id", userId)
            .order("is_default", { ascending: false });

        if (error) throw new Error(error.message);
        return data as UserAddress[];
    },

    createAddress: async (payload: CreateAddressPayload): Promise<UserAddress> => {
        const { data, error } = await supabaseClient
            .from("user_addresses")
            .insert(payload)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data as UserAddress;
    },

    updateAddress: async (id: string, payload: UpdateAddressPayload): Promise<UserAddress> => {
        const { data, error } = await supabaseClient
            .from("user_addresses")
            .update(payload)
            .eq("id", id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data as UserAddress;
    },

    deleteAddress: async (id: string): Promise<void> => {
        const { error } = await supabaseClient
            .from("user_addresses")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
    },

    getAddressById: async (id: string): Promise<UserAddress> => {
        const { data, error } = await supabaseClient
            .from("user_addresses")
            .select("*")
            .eq("id", id)
            .single(); // نستخدم single لأننا نتوقع نتيجة واحدة فقط

        if (error) throw new Error(error.message);
        return data as UserAddress;
    },
};