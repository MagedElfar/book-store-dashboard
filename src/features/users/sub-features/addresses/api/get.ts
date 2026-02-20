import { userAddressProvider } from "../constants";

export const getAddressById = (id: string) => userAddressProvider.getAddressById(id)

export const getAddressesApi = (userId: string) => userAddressProvider.getAddressesByUserId(userId)
