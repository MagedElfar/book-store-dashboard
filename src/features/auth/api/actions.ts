import { authApiProvider } from "../constants"
import type { LoginApiRequest } from "../types/request"
import type { AuthResponse } from "../types/response"

export const login = (data: LoginApiRequest): Promise<AuthResponse> => authApiProvider.login(data)
export const restoreSession = () => authApiProvider.refreshToken()
export const logout = () => authApiProvider.logout()

export const forgotPassword = (email: string) => authApiProvider.forgotPassword(email)
export const resetPassword = (newPassword: string, token?: string) => authApiProvider.resetPassword(newPassword, token)