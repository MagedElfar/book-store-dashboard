import type { Role, User } from "./user";

export type CreateUserPayload = Omit<User, "id"> & { password: string }
export type UpdateUserPayload = Omit<User, "id" | "email">

export type UsersParams = {
    search?: string
    role?: Role | "",
    sortBy?: "oldest" | "newest",
    limit?: number
    page?: number
}