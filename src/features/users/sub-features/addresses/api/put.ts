import { userAddressProvider } from "../constants";
import type { UpdateAddressPayload } from "../types";

export const updateAddressApi = (id: string, payload: UpdateAddressPayload) => userAddressProvider.updateAddress(id, payload)