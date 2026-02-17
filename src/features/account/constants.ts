import { supabaseProfileProvider } from "./infrastructure/supabaseProfileProvider";
import type { AccountApiProvider } from "./types/api-provider";

export const apiProvider: AccountApiProvider = supabaseProfileProvider
