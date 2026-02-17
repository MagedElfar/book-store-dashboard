import { createClient } from '@supabase/supabase-js';

import { env } from '@/core';

export const supabaseClient = createClient(env.supabaseUrl, env.supabaseKey);
