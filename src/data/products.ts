// Самі товари тепер живуть у Supabase (таблиця public.products).
// Тут лишилися тип, який використовують вітрина та кошик, і форматування ціни.
export type Product = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
};

export const formatPrice = (n: number) =>
  `${n.toLocaleString("uk-UA")} UAH`;
