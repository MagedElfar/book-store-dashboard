import { supabaseAuthProvider } from "./infrastructure/supabaseAuthProvider";
import type { AuthApiProvider } from "./types/api-provider";

export const authApiProvider: AuthApiProvider = supabaseAuthProvider
