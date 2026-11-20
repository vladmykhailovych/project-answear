import { createClient } from "@supabase/supabase-js";
import type { Product } from "../data/products";
import { getSupabaseEnv } from "./supabase/config";

export const CATEGORIES = [
  { value: "women", label: "Жіноче" },
  { value: "men", label: "Чоловіче" },
  { value: "kids", label: "Дитяче" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export const isCategory = (v: unknown): v is Category =>
  CATEGORIES.some((c) => c.value === v);

export const categoryLabel = (v: string) =>
  CATEGORIES.find((c) => c.value === v)?.label ?? v;

// Рядок таблиці products як його віддає база.
export type ProductRow = {
  id: number;
  category: Category;
  brand: string;
  name: string;
  price: number;
  image_url: string;
  sort_order: number;
  is_published: boolean;
};

export const PRODUCT_COLUMNS =
  "id, category, brand, name, price, image_url, sort_order, is_published";

export const toProduct = (r: ProductRow): Product => ({
  id: r.id,
  brand: r.brand,
  name: r.name,
  price: r.price,
  image: r.image_url,
});

function describeError(e: unknown): string {
  if (e instanceof Error) {
    return `${e.name}: ${e.message}${e.cause ? ` | cause: ${String(e.cause)}` : ""}`;
  }
  try {
    return JSON.stringify(e, Object.getOwnPropertyNames(e ?? {}));
  } catch {
    return String(e);
  }
}

// Публічна вітрина: анонімний клієнт без куків, RLS віддає лише опубліковані товари.
export async function getPublishedProducts(): Promise<Record<Category, Product[]>> {
  const result: Record<Category, Product[]> = { women: [], men: [], kids: [] };

  try {
    const { url, key } = getSupabaseEnv();
    const supabase = createClient(url, key, { auth: { persistSession: false } });

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });

    if (error) throw error;

    for (const row of (data ?? []) as ProductRow[]) {
      if (isCategory(row.category)) result[row.category].push(toProduct(row));
    }
  } catch (e) {
    console.error("[products] помилка Supabase -> " + describeError(e));
  }

  return result;
}
