
import Link from "next/link";
import type { Product } from "../data/products";
import { formatPrice } from "../data/products";
import AddToCartButton from "./AddToCartButton";

type Panel = {
  eyebrow: string;
  title: string;
  text: string;
  button: string;
};

type Props = {
  eyebrow: string;
  title: string;
  products: Product[];
  showSeeMore?: boolean;
  banner?: string;
  panel?: Panel;
};

export default function ProductSection({
  eyebrow,
  title,
  products,
  showSeeMore,
  banner,
  panel,
}: Props) {
  const category = eyebrow.toLowerCase();

  return (
    <section className="container section">
      <div className="section-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>

        {showSeeMore && (
          <Link href={`/${category}`} className="btn-outline">
            See more →
          </Link>
        )}
      </div>

      {banner && <img src={banner} alt={title} className="wide-banner" />}

      <div className="grid-4">
        {products.map((p) => (
          <article key={p.id} className="card">
            <img src={p.image} alt={p.name} />

            <div className="card-info">
              <strong>{p.brand}</strong>
              <span>{p.name}</span>
              <small>{formatPrice(p.price)}</small>

              <div className="card-actions">
                <Link href={`/${category}`} className="btn-dark">
                  See More
                </Link>

                <AddToCartButton product={p} />
              </div>
            </div>
          </article>
        ))}

        {panel && (
          <aside className="panel">
            <span className="eyebrow">{panel.eyebrow}</span>
            <h3>{panel.title}</h3>
            <p>{panel.text}</p>

            <Link href={`/${category}`} className="btn-outline">
              {panel.button} →
            </Link>
          </aside>
        )}
      </div>
    </section>
  );
}
