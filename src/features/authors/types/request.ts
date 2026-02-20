import type { Author } from "./author";

export type CreateAuthorPayload = Omit<Author, "id" | "created_at" | "updated_at">;

export type UpdateAuthorPayload = CreateAuthorPayload;

export type AuthorsParams = {
    search?: string;
    is_active?: string;
    sortBy?: "oldest" | "newest";
    limit?: number;
    page?: number;
}