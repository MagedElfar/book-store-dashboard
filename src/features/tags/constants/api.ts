import { supabaseTagProvider } from "../infrastructure";
import type { TagApiProvider } from "../types";

export const tagApiProvider: TagApiProvider = supabaseTagProvider;

export const TAG_QUERY_KEY = "tags";