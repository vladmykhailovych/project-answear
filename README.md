# project-answear (Maison&Co)

Інтернет-магазин на Next.js. Товари зберігаються в Supabase, змінювати їх можна в адмінці на `/admin`.

## Налаштування Supabase

1. Створи проєкт на supabase.com.
2. **SQL Editor** → встав і запусти весь файл `supabase/schema.sql`. Він створить таблицю `products`, права доступу (RLS), бакет `product-images` і додасть 10 стартових товарів.
3. **Authentication → Users → Add user**: пошта + пароль, постав «Auto Confirm User».
4. У SQL Editor зроби цього користувача адміном (підстав свою пошту):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
5. Бажано: **Authentication → Sign In / Providers → Email** → вимкнути «Allow new users to sign up» (адміни додаються лише вручну).
6. Скопіюй `.env.example` у `.env.local` і заповни з **Project Settings → API**: `NEXT_PUBLIC_SUPABASE_URL` та `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Ключ `service_role` у проєкті не потрібен — не клади його сюди.

## Запуск

```bash
npm install @supabase/supabase-js @supabase/ssr
npm run dev
```

- Сайт: http://localhost:3000
- Адмінка: http://localhost:3000/admin (вхід під акаунтом із кроку 3)

## Як це влаштовано

- `supabase/schema.sql` — таблиці, RLS, Storage, seed.
- `src/lib/products.ts` — читання товарів для вітрини (анонімний ключ, віддаються лише опубліковані).
- `src/lib/supabase/*` — клієнти Supabase (сервер / браузер).
- `src/proxy.ts` — оновлює сесію на сторінках `/admin`.
- `src/app/admin/*` — адмінка: список, додавання, редагування, видалення, показ/приховування, завантаження фото.
- Справжній захист даних — RLS у базі: писати в `products` і в бакет може лише користувач із таблиці `admins`.
