import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import {
  CATEGORIES,
  PRODUCT_COLUMNS,
  categoryLabel,
  isCategory,
  type ProductRow,
} from "@/lib/products";
import { formatPrice } from "@/data/products";
import { deleteProduct, setPublished } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { category } = await searchParams;
  const active = isCategory(category) ? category : null;

  let query = supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (active) query = query.eq("category", active);

  const { data, error } = await query;
  const products = (data ?? []) as ProductRow[];

  return (
    <>
      <div className="adm-head">
        <h1>Товари</h1>
        <Link
          href={active ? `/admin/products/new?category=${active}` : "/admin/products/new"}
          className="adm-btn primary"
        >
          Додати товар
        </Link>
      </div>

      <nav className="adm-tabs" aria-label="Категорії">
        <Link href="/admin" className={`adm-tab ${active ? "" : "active"}`}>Усі</Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.value}
            href={`/admin?category=${c.value}`}
            className={`adm-tab ${active === c.value ? "active" : ""}`}
          >
            {c.label}
          </Link>
        ))}
      </nav>

      {error && <p className="adm-error">Не вдалося завантажити товари: {error.message}</p>}

      {!error && products.length === 0 ? (
        <div className="adm-empty">
          <p>Тут ще немає товарів. Додайте перший — він з’явиться на головній сторінці.</p>
          <Link href="/admin/products/new" className="adm-btn primary">Додати товар</Link>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Фото</th>
                <th>Товар</th>
                <th>Категорія</th>
                <th>Ціна</th>
                <th>Порядок</th>
                <th>На сайті</th>
                <th aria-label="Дії" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img className="adm-thumb" src={p.image_url} alt="" />
                  </td>
                  <td>
                    <strong>{p.brand}</strong>
                    <div className="adm-sub">{p.name}</div>
                  </td>
                  <td>{categoryLabel(p.category)}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td>{p.sort_order}</td>
                  <td>
                    <form action={setPublished.bind(null, p.id, !p.is_published)}>
                      <button
                        type="submit"
                        className={`adm-chip ${p.is_published ? "on" : "off"}`}
                        title={p.is_published ? "Натисніть, щоб приховати" : "Натисніть, щоб показати"}
                      >
                        {p.is_published ? "Опубліковано" : "Приховано"}
                      </button>
                    </form>
                  </td>
                  <td className="adm-actions">
                    <Link href={`/admin/products/${p.id}`} className="adm-btn small">Редагувати</Link>
                    <DeleteButton
                      action={deleteProduct.bind(null, p.id)}
                      confirmText={`Видалити «${p.brand} — ${p.name}»? Це незворотно.`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
