export type Role = "user" | "support" | "admin"

export interface User {
    id: string;
    profileId: string
    created_at: string
    full_name: string
    role: Role,
    email: string,
    phone?: string | null
    avatar_url?: string | null
}

export interface UserStatistics {
    total_users: number;
    active_users: number;
    inactive_users: number;

    roles_count: {
        admin: number;
        user: number;
        support: number;
    };

    new_users_today: number;
    new_users_this_month: number;

    growth_percentage?: number;
}