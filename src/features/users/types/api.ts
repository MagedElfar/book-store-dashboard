import type { GetManyResponse } from "@/shared/types";

import type { CreateUserPayload, UsersParams, UpdateUserPayload } from "./request";
import type { User, UserStatistics } from "./user";

export interface UserApiProvider {

    createUser: (payload: CreateUserPayload) => Promise<User>
    updateUser: (id: string, payload: UpdateUserPayload) => Promise<User>;
    getUserById: (id: string) => Promise<User>
    getUsers: (params: UsersParams) => Promise<GetManyResponse<User>>;
    deleteUser: (id: string) => Promise<void>;
    getUsersStats: () => Promise<UserStatistics>;
} 