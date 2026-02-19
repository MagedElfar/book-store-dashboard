import { userApiProvider } from "../constants";

export const deleteUserApi = (id: string) => userApiProvider.deleteUser(id)