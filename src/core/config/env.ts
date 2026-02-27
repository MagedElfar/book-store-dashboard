export const env = {
    supabaseUrl: getEnv("VITE_SUPABASE_URL"),
    supabaseKey: getEnv("VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY"),
    supabaseProjectId: getEnv("VITE_SUPABASE_SUPABASE_PROJECT_ID"),
    firebaseVapkeyId: getEnv("VITE_FIREBASE_VAPIDKEY")
} as const

function getEnv(name: string): string {
    const value = import.meta.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}