import type { LoginApiRequest } from './request';
import type { AuthResponse } from './response';
import type { User } from './user';

export interface AuthApiProvider {
    login: (data: LoginApiRequest) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<AuthResponse>;
    getCurrentUser: () => Promise<User>;
    updateUserProfile: (id: string, data: Partial<User>) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>
    resetPassword: (newPassword: string, token?: string) => Promise<void>
}