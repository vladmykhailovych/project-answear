"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorScreen from "../components/ErrorScreen";
import { getStatus } from "../lib/status-codes";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const s = getStatus(500);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main>
        <ErrorScreen code={s.code} title={s.title} lead={s.lead}>
          <button type="button" className="btn-dark" onClick={reset}>Try again</button>
          <Link href="/" className="btn-outline">Back to shop</Link>
          <Link href="/status" className="btn-outline">All error codes</Link>
        </ErrorScreen>
        {error.digest && (
          <p className="container err-ref">Reference: {error.digest}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
