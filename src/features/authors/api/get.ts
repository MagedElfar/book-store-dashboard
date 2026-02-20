import { authorApiProvider } from "../constants";
import type { AuthorsParams } from "../types";

export const getAuthorById = (id: string) => authorApiProvider.getAuthorById(id);

export const getAuthors = (params: AuthorsParams) => authorApiProvider.getAuthors(params);

export const getAuthorsStats = () => authorApiProvider.getAuthorsStats();