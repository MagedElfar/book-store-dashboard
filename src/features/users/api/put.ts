import { userApiProvider } from "../constants";
import type { UpdateUserPayload } from "../types";

export const updateUserApi = (id: string, payload: UpdateUserPayload) => userApiProvider.updateUser(id, payload)