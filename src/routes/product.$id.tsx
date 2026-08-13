import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, MapPin, ShieldCheck, Star } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/uniconnect/AppShell";
import { ProductImage } from "@/components/uniconnect/ProductImage";
import { Button } from "@/components/ui/button";
import { REVIEWS, categoryName } from "@/lib/uniconnect/data";
import { rands, useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product details — UniConnect" },
      { name: "description", content: "See specifications, seller info and reviews for this campus listing." },
      { property: "og:title", content: "Product details — UniConnect" },
      { property: "og:description", content: "Buy safely from verified students on UniConnect." },
    ],
  }),
  component: ProductPage,
});

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={className} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`inline size-4 ${i <= Math.round(rating) ? "fill-warning text-warning" : "text-border"}`}
        />
      ))}
    </span>
  );
}

function ProductPage() {
  const { id } = Route.useParams();
  const { products, addToCart } = useStore();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <AppShell title="Product not found">
        <p className="text-sm text-muted-foreground">This listing is no longer available.</p>
        <Button asChild variant="brand" className="mt-4">
          <Link to="/home">Back to marketplace</Link>
        </Button>
      </AppShell>
    );
  }

  const reviews = REVIEWS.filter((r) => r.productId === product.id);
  const specs = showAll ? product.specs : product.specs.slice(0, 3);

  return (
    <AppShell showSearch={false}>
      <button
        onClick={() => navigate({ to: "/home" })}
        className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Back
      </button>

      <div className="grid gap-6 md:grid-cols-2">
        <ProductImage product={product} className="aspect-square w-full" iconClassName="size-24" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            {categoryName(product.category)}
          </p>
          <h1 className="mt-1 text-2xl font-bold leading-tight">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <p className="mt-3 text-3xl font-extrabold text-primary">{rands(product.price)}.00</p>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Stars rating={product.rating} />
            <span className="text-muted-foreground">{product.rating || "New"} · {product.condition}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-5 rounded-3xl bg-muted p-4">
            <h2 className="text-sm font-bold">Product details</h2>
            <dl className="mt-2 space-y-1.5 text-sm">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
            {product.specs.length > 3 && (
              <button
                onClick={() => setShowAll((v) => !v)}
                className="mt-3 text-sm font-semibold text-brand hover:underline"
              >
                {showAll ? "View less" : "View more"}
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-3xl border border-border p-4">
            <span className="grid size-11 place-items-center rounded-full bg-accent font-bold text-primary">
              {product.seller.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{product.seller}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" /> {product.campus} · {product.contact}
              </p>
            </div>
            <Button asChild variant="soft" size="sm" className="ml-auto">
              <Link to="/messages">Message</Link>
            </Button>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="brand"
              size="pill"
              className="flex-1"
              onClick={() => {
                addToCart(product.id);
                toast.success("Added to cart");
              }}
            >
              Add to cart
            </Button>
            <Button
              variant="navy"
              size="pill"
              className="flex-1"
              onClick={() => {
                addToCart(product.id);
                navigate({ to: "/checkout" });
              }}
            >
              Buy now
            </Button>
          </div>

          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-brand" /> Secure Checkout - SSL Encrypted
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Customer Reviews</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet for this listing.</p>
          )}
          {reviews.map((r) => (
            <article key={r.id} className="rounded-3xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-accent font-bold text-primary">
                  {r.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.author}</p>
                  {r.verified && <p className="text-xs text-brand">Verified user</p>}
                </div>
                <Stars rating={r.rating} className="ml-auto" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">“{r.text}”</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
