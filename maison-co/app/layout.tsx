import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const jost = Jost({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: "Maison&Co",
  description: "Timeless elegance, crafted for modern life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}