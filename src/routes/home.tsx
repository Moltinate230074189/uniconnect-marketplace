import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/uniconnect/AppShell";
import { ProductCard } from "@/components/uniconnect/ProductCard";
import { CategoryIcon } from "@/components/uniconnect/ProductImage";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/uniconnect/data";
import { useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Marketplace — UniConnect" },
      { name: "description", content: "Find and sell everything on campus: books, gadgets, fashion, sports gear and lab equipment." },
      { property: "og:title", content: "Marketplace — UniConnect" },
      { property: "og:description", content: "Browse recently added student listings on your campus." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { products } = useStore();
  const recent = [...products]
    .filter((p) => p.status === "Active")
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 10);

  return (
    <AppShell>
      <section className="hero-navy relative overflow-hidden rounded-3xl px-6 py-10 text-navy-foreground shadow-float md:px-12 md:py-16">
        <div className="relative z-10 max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Buy. Sell. Connect. Together.
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            FIND &amp; SELL
            <br /> EVERYTHING
            <br /> ON CAMPUS
          </h1>
          <Button asChild variant="brand" size="pill" className="mt-6">
            <Link to="/categories">
              Browse all products <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-brand/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 right-24 size-64 rounded-full bg-brand/10 blur-3xl" />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Categories</h2>
          <Link to="/categories" className="text-sm font-medium text-brand hover:underline">
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/categories"
              search={{ cat: c.id, sort: "newest" }}
              className="group flex flex-col gap-2 rounded-3xl border border-border bg-card p-4 shadow-card transition-colors hover:border-brand hover:bg-accent"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <CategoryIcon id={c.id} className="size-5" />
              </span>
              <span className="text-sm font-semibold leading-tight">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.blurb}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Recently Added</h2>
          <Link to="/categories" className="text-sm font-medium text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
