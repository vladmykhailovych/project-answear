// NEXT_PUBLIC_* треба читати саме так, літерально, інакше Next не підставить їх у браузерний код.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseEnv = Boolean(url && key);

export function getSupabaseEnv(): { url: string; key: string } {
  if (!url || !key) {
    throw new Error(
      "Не задано NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Додай їх у .env.local (див. .env.example)."
    );
  }
  return { url, key };
}
