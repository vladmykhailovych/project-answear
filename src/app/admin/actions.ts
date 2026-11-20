"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { isCategory } from "@/lib/products";

export type SaveResult = { error: string } | void;

const BUCKET = "product-images";

function parseProduct(fd: FormData) {
  const category = String(fd.get("category") ?? "");
  const brand = String(fd.get("brand") ?? "").trim();
  const name = String(fd.get("name") ?? "").trim();
  const imageUrl = String(fd.get("image_url") ?? "").trim();
  const price = Number(fd.get("price"));
  const sortOrder = Number(fd.get("sort_order") || 0);
  const isPublished = fd.get("is_published") === "on";

  if (!isCategory(category)) return { error: "Оберіть категорію." };
  if (!brand || brand.length > 120) return { error: "Вкажіть бренд (до 120 символів)." };
  if (!name || name.length > 160) return { error: "Вкажіть назву (до 160 символів)." };
  if (!Number.isInteger(price) || price < 0 || price > 10_000_000)
    return { error: "Ціна має бути цілим числом від 0 до 10 000 000." };
  if (!Number.isInteger(sortOrder) || Math.abs(sortOrder) > 1_000_000)
    return { error: "Порядок показу має бути цілим числом." };

  const okImage =
    imageUrl.length > 0 &&
    imageUrl.length <= 500 &&
    ((imageUrl.startsWith("/") && !imageUrl.startsWith("//")) ||
      imageUrl.startsWith("https://"));
  if (!okImage)
    return { error: "Додайте фото: завантажте файл або вкажіть посилання (https://… чи /images/…)." };

  return {
    values: {
      category,
      brand,
      name,
      price,
      image_url: imageUrl,
      sort_order: sortOrder,
      is_published: isPublished,
    },
  };
}

function refreshPages() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveProduct(fd: FormData): Promise<SaveResult> {
  const { supabase } = await requireAdmin();

  const parsed = parseProduct(fd);
  if ("error" in parsed) return { error: parsed.error };

  const idRaw = String(fd.get("id") ?? "");
  let error;

  if (idRaw) {
    const id = Number(idRaw);
    if (!Number.isInteger(id)) return { error: "Некоректний id товару." };
    ({ error } = await supabase.from("products").update(parsed.values).eq("id", id));
  } else {
    ({ error } = await supabase.from("products").insert(parsed.values));
  }

  if (error) return { error: `Не вдалося зберегти: ${error.message}` };

  refreshPages();
  redirect("/admin");
}

export async function setPublished(id: number, publish: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("products")
    .update({ is_published: publish })
    .eq("id", id);
  if (error) throw new Error(error.message);
  refreshPages();
}

export async function deleteProduct(id: number) {
  const { supabase } = await requireAdmin();

  const { data: row } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  // Якщо фото лежало в нашому бакеті — прибираємо й файл (не критично, якщо не вийде).
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const url = row?.image_url ?? "";
  const at = url.indexOf(marker);
  if (at !== -1) {
    const path = decodeURIComponent(url.slice(at + marker.length).split("?")[0]);
    await supabase.storage.from(BUCKET).remove([path]);
  }

  refreshPages();
}
