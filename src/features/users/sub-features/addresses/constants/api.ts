import { supabaseAddressProvider } from "../infrastructure"
import type { AddressApiProvider } from "../types"

export const userAddressProvider: AddressApiProvider = supabaseAddressProvider


export const ADDRESS_QUERY_KEY = "users-addresses"