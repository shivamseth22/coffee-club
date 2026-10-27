import { defaultOptions, getSizeLabel, milks, sizes, SHOT_PRICE, type DrinkProduct, type ItemOptions, type Product } from "./data";

export function availableSizes(product: DrinkProduct) {
  return sizes.filter((s) => product.prices[s.id] !== undefined);
}

// Medium when it's sold, otherwise the first size the drink comes in.
export function defaultOptionsFor(product: Product): ItemOptions {
  if (!product.drink || product.prices.M !== undefined) return defaultOptions;
  return { ...defaultOptions, size: availableSizes(product)[0]?.id ?? defaultOptions.size };
}

// The price shown on the menu card: the default configuration.
export function basePrice(product: Product) {
  return unitPrice(product, defaultOptionsFor(product));
}

// Undefined when the drink isn't sold in the chosen size (e.g. a stale saved cart line).
export function unitPrice(product: Product, options: ItemOptions) {
  if (!product.drink) return product.price;
  const size = product.prices[options.size];
  if (size === undefined) return undefined;
  const milk = product.milk ? (milks.find((m) => m.id === options.milk)?.extra ?? 0) : 0;
  return size + milk + options.shots * SHOT_PRICE;
}

export function describeOptions(product: Product, options: ItemOptions) {
  if (!product.drink) return "";
  const parts: string[] = [getSizeLabel(options.size)];
  if (product.milk) parts.push(`${milks.find((m) => m.id === options.milk)!.label} milk`);
  if (options.shots) parts.push(`+${options.shots} shot${options.shots > 1 ? "s" : ""}`);
  if (options.sweetness !== "None") parts.push(`${options.sweetness} sweet`);
  return parts.join(" · ");
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
const inrWhole = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

// Whole rupees render without paise ("₹250"); otherwise two decimals ("₹262.50").
export function formatPrice(paise: number) {
  return (paise % 100 === 0 ? inrWhole : inr).format(paise / 100);
}
