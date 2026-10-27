import { linePrice, type CartLine } from "@/modules/cart";
import { ProductImage } from "@/modules/menu/components/product-image";
import { getProduct } from "@/modules/menu/data";
import { describeOptions, formatPrice } from "@/modules/menu/pricing";

export function OrderLines({ lines }: { lines: CartLine[] }) {
  return (
    <ul className="divide-y">
      {lines.map((line) => {
        const product = getProduct(line.productId);
        const price = linePrice(line);
        if (!product || price === undefined) return null;
        return (
          <li key={line.key} className="flex items-center gap-3 py-3">
            <ProductImage product={product} sizes="40px" className="size-10 shrink-0 rounded-lg" emojiClassName="text-xl" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {line.qty > 1 && <span className="text-muted-foreground">{line.qty} × </span>}
                {product.name}
              </p>
              {product.drink && (
                <p className="truncate text-xs text-muted-foreground">{describeOptions(product, line.options)}</p>
              )}
            </div>
            <span className="text-sm tabular-nums">{formatPrice(price * line.qty)}</span>
          </li>
        );
      })}
    </ul>
  );
}
