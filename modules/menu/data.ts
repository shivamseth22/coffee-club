export type CategoryId = "espresso" | "milk" | "cold" | "tea" | "bakery";

type ProductBase = {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  emoji: string;
  // Path under /public, e.g. "/images/menu/latte.webp". Falls back to the emoji tile.
  image?: string;
  // CSS object-position for cropping the photo, e.g. "center 20%". Defaults to center.
  imageFocus?: string;
  tag?: "Popular" | "New";
  // Drinks get size/sweetness options; `milk` adds a milk choice.
  milk: boolean;
};

// Prices are in paise. Drinks list a price per size they come in; leave a size out if it isn't sold.
export type DrinkProduct = ProductBase & { drink: true; prices: Partial<Record<Size, number>> };
export type FoodProduct = ProductBase & { drink: false; price: number };
export type Product = DrinkProduct | FoodProduct;

export const categories: { id: CategoryId; label: string; tile: string }[] = [
  { id: "espresso", label: "Espresso", tile: "from-amber-200 to-orange-300 dark:from-amber-900/60 dark:to-orange-950/60" },
  { id: "milk", label: "Milk drinks", tile: "from-orange-100 to-amber-200 dark:from-orange-900/50 dark:to-amber-950/60" },
  { id: "cold", label: "Cold", tile: "from-sky-100 to-cyan-200 dark:from-sky-900/50 dark:to-cyan-950/60" },
  { id: "tea", label: "Tea", tile: "from-lime-100 to-emerald-200 dark:from-lime-900/50 dark:to-emerald-950/60" },
  { id: "bakery", label: "Bakery", tile: "from-rose-100 to-orange-200 dark:from-rose-900/50 dark:to-orange-950/60" },
];

export const products: Product[] = [
  { id: "espresso", name: "Espresso", description: "A bold double shot with a thick crema.", prices: { S: 15000, M: 18000, L: 22000 }, category: "espresso", emoji: "☕", image: "/images/menu/espresso.jpg", imageFocus: "center 20%", drink: true, milk: false },
  { id: "americano", name: "Americano", description: "Espresso stretched with hot water. Clean and smooth.", prices: { S: 17000, M: 20000, L: 24000 }, category: "espresso", emoji: "☕", image: "/images/menu/americano.jpg", imageFocus: "center 20%", drink: true, milk: false },
  { id: "cortado", name: "Cortado", description: "Equal parts espresso and warm milk.", prices: { S: 19000, M: 22000, L: 26000 }, category: "espresso", emoji: "☕", image: "/images/menu/cortado.jpg", imageFocus: "center 25%", drink: true, milk: true },
  { id: "latte", name: "Latte", description: "Silky steamed milk over a double shot.", prices: { S: 22000, M: 25000, L: 29000 }, category: "milk", emoji: "🥛", image: "/images/menu/latte.jpg", imageFocus: "center 25%", tag: "Popular", drink: true, milk: true },
  { id: "cappuccino", name: "Cappuccino", description: "Airy foam, rich espresso, a dusting of cocoa.", prices: { S: 23000, M: 26000, L: 30000 }, category: "milk", emoji: "☕", image: "/images/menu/cappuccino.jpg", imageFocus: "center 25%", drink: true, milk: true },
  { id: "flat-white", name: "Flat White", description: "Velvety microfoam with a ristretto base.", prices: { S: 24000, M: 27000, L: 31000 }, category: "milk", emoji: "🥛", image: "/images/menu/flat-white.jpg", imageFocus: "center 25%", drink: true, milk: true },
  { id: "mocha", name: "Mocha", description: "Dark chocolate, espresso and steamed milk.", prices: { S: 26000, M: 29000, L: 33000 }, category: "milk", emoji: "🍫", image: "/images/menu/mocha.jpg", imageFocus: "center 15%", drink: true, milk: true },
  { id: "cold-brew", name: "Cold Brew", description: "Steeped for 18 hours. Low acid, big flavour.", prices: { S: 23000, M: 26000, L: 30000 }, category: "cold", emoji: "🧊", image: "/images/menu/cold-brew.jpg", imageFocus: "center 15%", tag: "Popular", drink: true, milk: false },
  { id: "iced-latte", name: "Iced Latte", description: "Espresso and cold milk over ice.", prices: { S: 24000, M: 27000, L: 31000 }, category: "cold", emoji: "🧋", image: "/images/menu/iced-latte.jpg", imageFocus: "center 15%", drink: true, milk: true },
  { id: "nitro", name: "Nitro Cold Brew", description: "Cold brew on nitrogen tap. Creamy, no milk needed.", prices: { S: 29000, M: 32000, L: 36000 }, category: "cold", emoji: "🍺", image: "/images/menu/nitro.jpg", imageFocus: "center 15%", tag: "New", drink: true, milk: false },
  { id: "matcha", name: "Matcha Latte", description: "Ceremonial-grade matcha whisked into milk.", prices: { S: 27000, M: 30000, L: 34000 }, category: "tea", emoji: "🍵", image: "/images/menu/matcha.jpg", imageFocus: "center 25%", tag: "New", drink: true, milk: true },
  { id: "chai", name: "Chai Latte", description: "Spiced black tea with steamed milk.", prices: { S: 19000, M: 22000, L: 26000 }, category: "tea", emoji: "🫖", image: "/images/menu/chai.jpg", imageFocus: "center 25%", drink: true, milk: true },
  { id: "croissant", name: "Butter Croissant", description: "Flaky, golden, baked every morning.", price: 18000, category: "bakery", emoji: "🥐", image: "/images/menu/croissant.jpg", drink: false, milk: false },
  { id: "muffin", name: "Blueberry Muffin", description: "Packed with berries and a crumble top.", price: 16000, category: "bakery", emoji: "🧁", image: "/images/menu/muffin.jpg", imageFocus: "center 30%", drink: false, milk: false },
  { id: "cookie", name: "Choc Chip Cookie", description: "Crisp edges, gooey middle.", price: 12000, category: "bakery", emoji: "🍪", image: "/images/menu/cookie.jpg", tag: "Popular", drink: false, milk: false },
];

export const sizes = [
  { id: "S", label: "Small" },
  { id: "M", label: "Medium" },
  { id: "L", label: "Large" },
] as const;

export const milks = [
  { id: "whole", label: "Whole", extra: 0 },
  { id: "skim", label: "Skim", extra: 0 },
  { id: "oat", label: "Oat", extra: 5000 },
  { id: "almond", label: "Almond", extra: 5000 },
] as const;

export const sweetness = ["None", "Light", "Regular"] as const;

export const SHOT_PRICE = 6000;
export const MAX_EXTRA_SHOTS = 3;

export type Size = (typeof sizes)[number]["id"];
export type Milk = (typeof milks)[number]["id"];
export type Sweetness = (typeof sweetness)[number];

export type ItemOptions = {
  size: Size;
  milk: Milk;
  shots: number;
  sweetness: Sweetness;
};

export const defaultOptions: ItemOptions = { size: "M", milk: "whole", shots: 0, sweetness: "None" };

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getSizeLabel(id: Size) {
  return sizes.find((s) => s.id === id)!.label;
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}
