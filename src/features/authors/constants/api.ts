import { supabaseAuthorProvider } from "../infrastructure";
import type { AuthorApiProvider } from "../types";

export const authorApiProvider: AuthorApiProvider = supabaseAuthorProvider;

export const AUTHOR_QUERY_KEY = "authors";