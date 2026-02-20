// src/features/users/sub-features/addresses/types/api-provider.ts

import type { CreateAddressPayload, UpdateAddressPayload } from "./request";

import type { UserAddress } from "./index";

export interface AddressApiProvider {
    getAddressById: (id: string) => Promise<UserAddress>;
    getAddressesByUserId: (userId: string) => Promise<UserAddress[]>;
    createAddress: (payload: CreateAddressPayload) => Promise<UserAddress>;
    updateAddress: (id: string, payload: UpdateAddressPayload) => Promise<UserAddress>;
    deleteAddress: (id: string) => Promise<void>;
}