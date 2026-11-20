export type Product = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
};

export const formatPrice = (n: number) =>
  `${n.toLocaleString("uk-UA")} UAH`;

export const womenProducts: Product[] = [
  { id: 1, brand: "SAINT LAURENT", name: "Le Smoking", price: 10000, image: "/images/w1.jpg" },
  { id: 2, brand: "VALENTINO", name: "Asymmetric Silk Mini Dress", price: 5500, image: "/images/w2.jpg" },
  { id: 3, brand: "HERMÈS", name: "Leather Strap Mini Dress", price: 18000, image: "/images/w3.jpg" },
  { id: 4, brand: "TOM FORD", name: "Velvet Pantsuit", price: 20000, image: "/images/w4.jpg" },
];

export const menProducts: Product[] = [
  { id: 5, brand: "MAISON&CO", name: "Classic Tailored Suit", price: 5499, image: "/images/m1.jpg" },
  { id: 6, brand: "MAISON&CO", name: "Men’s Leather Essentials Set", price: 3999, image: "/images/m2.jpg" },
  { id: 7, brand: "MAISON&CO", name: "Burgundy Leather Loafers", price: 4599, image: "/images/m3.jpg" },
];

export const kidsProducts: Product[] = [
  { id: 8, brand: "MAISON&CO", name: "Kids Denim & Knit Set", price: 1499, image: "/images/k1.jpg" },
  { id: 9, brand: "MAISON&CO", name: "Cozy Knit Winter Accessories", price: 1299, image: "/images/k2.jpg" },
  { id: 10, brand: "MAISON&CO", name: "Children’s Suede Boots", price: 1899, image: "/images/k3.jpg" },
];