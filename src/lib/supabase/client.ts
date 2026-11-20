import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./config";

// Браузерний клієнт: вхід в адмінку і завантаження фото напряму в Storage.
export function createClient() {
  const { url, key } = getSupabaseEnv();
  return createBrowserClient(url, key);
}
