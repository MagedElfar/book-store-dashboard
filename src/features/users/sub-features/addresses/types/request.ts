import type { UserAddress } from "./address";

// English Comment: Type for creating a new address (omitting auto-generated fields)
export type CreateAddressPayload = Omit<UserAddress, 'id' | 'created_at' | 'updated_at'>;

// English Comment: Type for updating an existing address
export type UpdateAddressPayload = Partial<CreateAddressPayload> 