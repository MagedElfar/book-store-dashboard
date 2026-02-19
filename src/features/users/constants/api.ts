import { supabaseUserProvider } from "../infrastructure";
import type { UserApiProvider } from "../types";

export const userApiProvider: UserApiProvider = supabaseUserProvider


export const USER_QUERY_KEY = "users"