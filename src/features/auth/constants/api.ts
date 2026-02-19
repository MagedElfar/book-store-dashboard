import { supabaseAuthProvider } from "../infrastructure";
import type { AuthApiProvider } from "../types";

export const authApiProvider: AuthApiProvider = supabaseAuthProvider
