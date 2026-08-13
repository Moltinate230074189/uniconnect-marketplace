import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProductImage } from "./ProductImage";
import { rands } from "@/lib/uniconnect/store";
import type { Product } from "@/lib/uniconnect/data";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-card transition-transform hover:-translate-y-1",
        className,
      )}
    >
      <ProductImage product={product} className="aspect-square w-full" />
      <div className="flex flex-1 flex-col gap-1 px-1 pt-3">
        <h3 className="text-sm font-semibold leading-tight">{product.name}</h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">{product.brand}</p>
        <p className="mt-1 text-base font-bold text-primary">{rands(product.price)}</p>
        <Button variant="brand" size="sm" className="mt-2 w-full rounded-full" tabIndex={-1}>
          View
        </Button>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-10 text-center">
        <p className="font-semibold">No products found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different search term or browse another category.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
