import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { AppShell } from "@/components/uniconnect/AppShell";
import { ProductGrid } from "@/components/uniconnect/ProductCard";
import { categoryName } from "@/lib/uniconnect/data";
import { useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({
    q: typeof s["q"] === "string" ? s["q"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Search — UniConnect" },
      { name: "description", content: "Search campus listings by product name, category, description or seller." },
      { property: "og:title", content: "Search — UniConnect" },
      { property: "og:description", content: "Find exactly what you need on your campus marketplace." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate();
  const { products } = useStore();

  const term = q.trim().toLowerCase();
  const results = products.filter((p) => {
    if (p.status !== "Active") return false;
    if (!term) return true;
    return [p.name, p.brand, p.description, p.seller, categoryName(p.category)]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });

  return (
    <AppShell showSearch={false} title="Search">
      <label className="relative mb-5 block">
        <span className="sr-only">Search products</span>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => navigate({ to: "/search", search: { q: e.target.value }, replace: true })}
          placeholder="Search calculator, headphones, hoodie…"
          className="h-12 w-full rounded-full bg-input pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
      </label>

      <p className="mb-3 text-sm text-muted-foreground">
        {term ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : "Showing all listings"}
      </p>
      <ProductGrid products={results} />
    </AppShell>
  );
}
