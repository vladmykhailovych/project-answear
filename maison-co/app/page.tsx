import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import SplitBanner from "../components/SplitBanner";
import FamilyLook from "../components/FamilyLook";
import Footer from "../components/Footer";
import { womenProducts, menProducts, kidsProducts } from "../data/products";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <ProductSection
          eyebrow="Women"
          title="Latest arrivals"
          products={womenProducts}
          showSeeMore
        />

        <SplitBanner />
        <FamilyLook />

        <ProductSection
          eyebrow="Men"
          title="New Arrivals"
          products={menProducts}
          panel={{
            eyebrow: "Discover more",
            title: "Men’s collection",
            text: "More pieces. More ways to wear them.",
            button: "View collection",
          }}
        />

        <ProductSection
          eyebrow="Kids"
          title="New Arrivals"
          products={kidsProducts}
          showSeeMore
          banner="/images/kids-banner.jpg"
          panel={{
            eyebrow: "Discover more",
            title: "Kids’ collection",
            text: "Everyday pieces for little stories.",
            button: "View collection",
          }}
        />
      </main>
      <Footer />
    </>
  );
}