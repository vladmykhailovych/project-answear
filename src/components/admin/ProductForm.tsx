"use client";

import { useState, useTransition } from "react";
import { saveProduct } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES, type Category, type ProductRow } from "@/lib/products";

const BUCKET = "product-images";
const MAX_BYTES = 5 * 1024 * 1024;
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

type Props = {
  product?: ProductRow;
  defaultCategory?: Category;
};

export default function ProductForm({ product, defaultCategory }: Props) {
  const [category, setCategory] = useState<string>(
    product?.category ?? defaultCategory ?? CATEGORIES[0].value
  );
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [sortOrder, setSortOrder] = useState(product ? String(product.sort_order) : "0");
  const [isPublished, setIsPublished] = useState(product?.is_published ?? true);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");

  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, startSaving] = useTransition();

  async function onFile(file: File | undefined) {
    if (!file) return;
    setUploadError(null);

    if (!EXT[file.type]) {
      setUploadError("Підтримуються лише JPG, PNG, WebP та AVIF.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setUploadError("Файл завеликий — максимум 5 МБ.");
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const path = `${crypto.randomUUID()}.${EXT[file.type]}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
    });
    setUploading(false);

    if (error) {
      setUploadError(`Не вдалося завантажити фото: ${error.message}`);
      return;
    }

    setImageUrl(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const fd = new FormData();
    if (product) fd.set("id", String(product.id));
    fd.set("category", category);
    fd.set("brand", brand);
    fd.set("name", name);
    fd.set("price", price);
    fd.set("sort_order", sortOrder);
    fd.set("image_url", imageUrl);
    if (isPublished) fd.set("is_published", "on");

    startSaving(async () => {
      // При успіху action робить redirect на /admin, сюди повертається лише помилка.
      const res = await saveProduct(fd);
      if (res && "error" in res) setError(res.error);
    });
  }

  return (
    <form className="adm-card" onSubmit={onSubmit}>
      {error && <p className="adm-error" role="alert">{error}</p>}

      <div className="adm-field">
        <label htmlFor="category">Категорія</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label htmlFor="brand">Бренд</label>
          <input id="brand" required maxLength={120} value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="adm-field">
          <label htmlFor="name">Назва</label>
          <input id="name" required maxLength={160} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>

      <div className="adm-row">
        <div className="adm-field">
          <label htmlFor="price">Ціна, UAH</label>
          <input
            id="price"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="adm-field">
          <label htmlFor="sort">Порядок показу</label>
          <input
            id="sort"
            type="number"
            step={1}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
          <span className="adm-hint">Менше число — вище серед товарів своєї категорії.</span>
        </div>
      </div>

      <div className="adm-field">
        <span className="adm-label">Фото</span>
        <div className="adm-upload">
          <div className="adm-preview">
            {imageUrl ? <img src={imageUrl} alt="Попередній перегляд" /> : <span>Немає фото</span>}
          </div>
          <div className="adm-upload-side">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              aria-label="Завантажити фото"
              disabled={uploading}
              onChange={(e) => {
                onFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            {uploading && <span className="adm-hint">Завантажуємо…</span>}
            {uploadError && <span className="adm-error inline" role="alert">{uploadError}</span>}
            <label htmlFor="image_url" className="adm-hint">Або вкажіть посилання на фото</label>
            <input
              id="image_url"
              placeholder="https://… або /images/w1.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>
      </div>

      <label className="adm-check">
        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
        Показувати на сайті
      </label>

      <div className="adm-form-actions">
        <button type="submit" className="adm-btn primary" disabled={saving || uploading}>
          {saving ? "Зберігаємо…" : product ? "Зберегти зміни" : "Додати товар"}
        </button>
      </div>
    </form>
  );
}
