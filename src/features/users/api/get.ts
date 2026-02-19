import { userApiProvider } from "../constants";
import type { UsersParams } from "../types";

export const getUserById = (id: string) => userApiProvider.getUserById(id)

export const getUsers = (params: UsersParams) => userApiProvider.getUsers(params)