import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StatusExplorer from "../../components/StatusExplorer";

export const metadata: Metadata = {
  title: "Error codes — Maison&Co",
  description: "What the numbers on an error page mean, and what to do next.",
};

export default function StatusPage() {
  return (
    <>
      <Header />
      <main>
        <section className="container stx-head">
          <h1>Error codes</h1>
          <p>
            Something didn’t load? Pick a number to see what it means and what to do next.
          </p>
        </section>
        <StatusExplorer />
      </main>
      <Footer />
    </>
  );
}
