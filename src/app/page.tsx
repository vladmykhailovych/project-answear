import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import SplitBanner from "../components/SplitBanner";
import FamilyLook from "../components/FamilyLook";
import Footer from "../components/Footer";
import { getPublishedProducts } from "../lib/products";

// Товари змінюються з адмінки, тож сторінку рендеримо на кожен запит.
// (Захочеш кеш — прибери це і покладайся на revalidatePath("/") з адмінських дій.)
export const dynamic = "force-dynamic";

export default async function Home() {
  const { women, men, kids } = await getPublishedProducts();

  return (
    <>
      <Header />
      <main>
        <Hero />

        {women.length > 0 && (
          <ProductSection
            eyebrow="Women"
            title="Latest arrivals"
            products={women}
            showSeeMore
          />
        )}

        <SplitBanner />
        <FamilyLook />

        {men.length > 0 && (
          <ProductSection
            eyebrow="Men"
            title="New Arrivals"
            products={men}
            panel={{
              eyebrow: "Discover more",
              title: "Men’s collection",
              text: "More pieces. More ways to wear them.",
              button: "View collection",
            }}
          />
        )}

        {kids.length > 0 && (
          <ProductSection
            eyebrow="Kids"
            title="New Arrivals"
            products={kids}
            showSeeMore
            banner="/images/kids-banner.jpg"
            panel={{
              eyebrow: "Discover more",
              title: "Kids’ collection",
              text: "Everyday pieces for little stories.",
              button: "View collection",
            }}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
