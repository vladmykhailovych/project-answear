import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { PRODUCT_COLUMNS, type ProductRow } from "@/lib/products";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { id: rawId } = await params;

  const id = Number(rawId);
  if (!Number.isInteger(id)) notFound();

  const { data } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <>
      <div className="adm-head">
        <h1>Редагування товару</h1>
        <Link href="/admin" className="adm-btn">До списку</Link>
      </div>
      <ProductForm product={data as ProductRow} />
    </>
  );
}
