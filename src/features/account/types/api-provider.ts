export interface AccountApiProvider {
    changeEmailApi: (email: string) => Promise<void>;
    changePasswordApi: (oldPassword: string, newPassword: string, email: string) => Promise<void>;
}