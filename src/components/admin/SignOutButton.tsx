"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton({ variant = "link" }: { variant?: "link" | "button" }) {
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className={variant === "button" ? "adm-btn" : "adm-link"}
    >
      Вийти
    </button>
  );
}
