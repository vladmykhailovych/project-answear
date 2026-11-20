import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function getAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, isAdmin: false };

  const { data } = await supabase.rpc("is_admin");
  return { supabase, user, isAdmin: data === true };
}

// Для сторінок і server actions адмінки. Справжній захист — RLS у базі,
// це лише щоб не показувати порожню адмінку чужим акаунтам.
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin.user) redirect("/admin/login");
  if (!admin.isAdmin) redirect("/admin/login?error=forbidden");
  return { supabase: admin.supabase, user: admin.user };
}
