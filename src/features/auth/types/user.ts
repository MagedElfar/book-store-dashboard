import type { SystemRole } from "@/shared/types";

export interface User {
    id: string;
    profileId: string
    created_at: string
    full_name: string
    role: SystemRole,
    email: string,
    phone?: string | null
    avatar_url?: string | null
}