import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./config";

// Клієнт із сесією користувача (читає/пише куки). Для адмінки та server actions.
export async function createClient() {
  const { url, key } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Виклик із Server Component: куки там писати не можна.
          // Сесію оновлює src/proxy.ts, тож тут можна ігнорувати.
        }
      },
    },
  });
}
