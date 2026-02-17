import { apiProvider } from "../constants";

export const changeEmailApi = (email: string) => apiProvider.changeEmailApi(email)

export const changePasswordApi = (oldPassword: string, newPassword: string, email: string) => apiProvider.changePasswordApi(oldPassword, newPassword, email)