import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { isCategory } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await requireAdmin();
  const { category } = await searchParams;

  return (
    <>
      <div className="adm-head">
        <h1>Новий товар</h1>
        <Link href="/admin" className="adm-btn">До списку</Link>
      </div>
      <ProductForm defaultCategory={isCategory(category) ? category : undefined} />
    </>
  );
}
