import Image from "next/image";
import { cn } from "@/lib/utils";
import { getCategory, type Product } from "../data";

// A product photo when one is set, otherwise the category gradient with the emoji.
// `className` sizes the box; `emojiClassName` sets the emoji size for the fallback.
export function ProductImage({
  product,
  sizes,
  eager,
  className,
  emojiClassName,
}: {
  product: Product;
  sizes: string;
  // Load immediately; use for images above the fold.
  eager?: boolean;
  className?: string;
  emojiClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        getCategory(product.category).tile,
        className,
      )}
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
          style={{ objectPosition: product.imageFocus }}
        />
      ) : (
        <span aria-hidden className={emojiClassName}>
          {product.emoji}
        </span>
      )}
    </div>
  );
}
