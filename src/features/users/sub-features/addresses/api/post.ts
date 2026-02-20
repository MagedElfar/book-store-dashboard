import { userAddressProvider } from "../constants";
import type { CreateAddressPayload } from "../types";

export const createAddressApi = (payload: CreateAddressPayload) => userAddressProvider.createAddress(payload)