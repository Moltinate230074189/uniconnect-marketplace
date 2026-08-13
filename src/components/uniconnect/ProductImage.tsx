import {
  BookOpen,
  Dumbbell,
  FlaskConical,
  Laptop,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryId, Product } from "@/lib/uniconnect/data";

const ICONS: Record<CategoryId, LucideIcon> = {
  books: BookOpen,
  electronics: Laptop,
  fashion: Shirt,
  sports: Dumbbell,
  lab: FlaskConical,
};

export function CategoryIcon({ id, className }: { id: CategoryId; className?: string }) {
  const Icon = ICONS[id];
  return <Icon className={cn("size-6", className)} aria-hidden />;
}

export function ProductImage({
  product,
  className,
  iconClassName,
}: {
  product: Pick<Product, "category" | "name" | "image">;
  className?: string;
  iconClassName?: string;
}) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className={cn("h-full w-full rounded-2xl object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "tile-soft flex items-center justify-center rounded-2xl text-primary",
        className,
      )}
      aria-label={product.name}
      role="img"
    >
      <CategoryIcon id={product.category} className={cn("size-10 opacity-80", iconClassName)} />
    </div>
  );
}
