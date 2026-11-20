import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin-auth";
import LoginForm from "@/components/admin/LoginForm";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { user, isAdmin } = await getAdmin();
  if (user && isAdmin) redirect("/admin");

  const { error } = await searchParams;

  return (
    <div className="adm-login">
      <div className="adm-card adm-login-card">
        <h1>Вхід в адмінку</h1>

        {user && !isAdmin ? (
          <>
            <p className="adm-error">
              Акаунт {user.email} не має доступу до адмінки. Увійдіть під адмін-акаунтом.
            </p>
            <SignOutButton variant="button" />
          </>
        ) : (
          <>
            {error === "forbidden" && (
              <p className="adm-error">Цей акаунт не має доступу до адмінки.</p>
            )}
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
}
