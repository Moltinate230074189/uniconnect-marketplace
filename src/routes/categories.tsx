import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/uniconnect/AppShell";
import { ProductGrid } from "@/components/uniconnect/ProductCard";
import { CategoryIcon } from "@/components/uniconnect/ProductImage";
import { CATEGORIES, type CategoryId } from "@/lib/uniconnect/data";
import { useStore } from "@/lib/uniconnect/store";
import { cn } from "@/lib/utils";

type Sort = "newest" | "low" | "high" | "popular";

export const Route = createFileRoute("/categories")({
  validateSearch: (s: Record<string, unknown>): { cat?: CategoryId | "all"; sort?: Sort } => ({
    cat: (s["cat"] as CategoryId | "all") ?? "all",
    sort: (s["sort"] as Sort) ?? "newest",
  }),
  head: () => ({
    meta: [
      { title: "Browse Categories — UniConnect" },
      { name: "description", content: "Browse campus listings by category and sort by price, newest or most popular." },
      { property: "og:title", content: "Browse Categories — UniConnect" },
      { property: "og:description", content: "Books, electronics, fashion, sports and lab equipment from students." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { cat = "all", sort = "newest" } = Route.useSearch();
  const navigate = useNavigate();
  const { products } = useStore();

  const filtered = products
    .filter((p) => p.status === "Active" && (cat === "all" || p.category === cat))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "popular") return b.popularity - a.popularity;
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });

  const setSearch = (next: { cat?: CategoryId | "all"; sort?: Sort }) =>
    navigate({ to: "/categories", search: { cat, sort, ...next } });

  return (
    <AppShell title="Categories">
      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-2">
        <button
          onClick={() => setSearch({ cat: "all" })}
          className={cn(
            "shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium",
            cat === "all" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted",
          )}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSearch({ cat: c.id })}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium",
              cat === c.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted",
            )}
          >
            <CategoryIcon id={c.id} className="size-4" />
            {c.name}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{filtered.length} items</p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSearch({ sort: e.target.value as Sort })}
            className="h-10 rounded-full bg-input px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
          >
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </label>
      </div>

      <ProductGrid products={filtered} />
    </AppShell>
  );
}
