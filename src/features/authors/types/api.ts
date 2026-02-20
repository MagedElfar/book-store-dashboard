import type { GetManyResponse } from "@/shared/types";

import type { Author, AuthorStatistics } from "./author";
import type { CreateAuthorPayload, AuthorsParams, UpdateAuthorPayload } from "./request";

export interface AuthorApiProvider {
    createAuthor: (payload: CreateAuthorPayload) => Promise<Author>;
    updateAuthor: (id: string, payload: UpdateAuthorPayload) => Promise<Author>;
    getAuthorById: (id: string) => Promise<Author>;
    getAuthors: (params: AuthorsParams) => Promise<GetManyResponse<Author>>;
    deleteAuthor: (id: string) => Promise<void>;
    getAuthorsStats: () => Promise<AuthorStatistics>;
}