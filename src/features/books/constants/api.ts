import { supabaseBookProvider } from "../infrastructure";
import type { BookApiProvider } from "../types";

export const bookApiProvider: BookApiProvider = supabaseBookProvider;

export const BOOK_QUERY_KEY = "books";