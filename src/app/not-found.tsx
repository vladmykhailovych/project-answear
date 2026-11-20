import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorScreen from "../components/ErrorScreen";
import { getStatus } from "../lib/status-codes";

export const metadata: Metadata = {
  title: "Page not found — Maison&Co",
};

export default function NotFound() {
  const s = getStatus(404);

  return (
    <>
      <Header />
      <main>
        <ErrorScreen code={s.code} title={s.title} lead={s.lead}>
          <Link href="/" className="btn-dark">Back to shop</Link>
          <Link href="/status" className="btn-outline">All error codes</Link>
        </ErrorScreen>
      </main>
      <Footer />
    </>
  );
}
