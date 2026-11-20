import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <>
      <header className="adm-bar">
        <Link href="/admin" className="adm-logo">
          Maison&amp;Co <span>адмінка</span>
        </Link>
        <div className="adm-bar-right">
          <Link href="/" target="_blank">Відкрити сайт</Link>
          <span className="adm-user">{user.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="adm-main">{children}</main>
    </>
  );
}
