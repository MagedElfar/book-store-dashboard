import { supabaseCategoryProvider } from "../infrastructure";
import type { CategoryApiProvider } from "../types";

export const categoryApiProvider: CategoryApiProvider = supabaseCategoryProvider;

export const CATEGORY_QUERY_KEY = "categories";