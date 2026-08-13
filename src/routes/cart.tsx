import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/uniconnect/AppShell";
import { ProductImage } from "@/components/uniconnect/ProductImage";
import { Button } from "@/components/ui/button";
import { rands, useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — UniConnect" },
      { name: "description", content: "Review the campus items in your cart, apply a discount code and check out securely." },
      { property: "og:title", content: "Shopping Cart — UniConnect" },
      { property: "og:description", content: "Your UniConnect cart, ready for secure checkout." },
    ],
  }),
  component: CartPage,
});

export function useCartTotals(code: string) {
  const { cart, products } = useStore();
  const lines = cart
    .map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) }))
    .filter((x): x is { line: typeof cart[number]; product: NonNullable<typeof x.product> } => !!x.product);
  const subtotal = lines.reduce((n, { line, product }) => n + product.price * line.qty, 0);
  const shipping = subtotal > 0 ? 35 : 0;
  const discount = code.trim().toUpperCase() === "CAMPUS10" ? Math.round(subtotal * 0.1) : 0;
  return { lines, subtotal, shipping, discount, total: subtotal + shipping - discount };
}

function CartPage() {
  const { setQty, removeFromCart } = useStore();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");
  const { lines, subtotal, shipping, discount, total } = useCartTotals(applied);

  return (
    <AppShell title="Shopping Cart" showSearch={false}>
      {lines.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-10 text-center">
          <p className="font-semibold">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">Browse the marketplace to find campus deals.</p>
          <Button asChild variant="brand" className="mt-4">
            <Link to="/home">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-3">
            {lines.map(({ line, product }) => (
              <li key={product.id} className="flex gap-3 rounded-3xl border border-border bg-card p-3 shadow-card">
                <ProductImage product={product} className="size-20 shrink-0" iconClassName="size-7" />
                <div className="min-w-0 flex-1">
                  <Link to="/product/$id" params={{ id: product.id }} className="text-sm font-semibold hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty(product.id, line.qty - 1)}
                      className="grid size-7 place-items-center rounded-full bg-muted hover:bg-secondary"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{line.qty}x</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty(product.id, line.qty + 1)}
                      className="grid size-7 place-items-center rounded-full bg-muted hover:bg-secondary"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p className="font-bold text-primary">{rands(product.price * line.qty)}</p>
                  <button
                    aria-label={`Remove ${product.name}`}
                    onClick={() => { removeFromCart(product.id); toast("Removed from cart"); }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl border border-border bg-card p-5 shadow-card">
            <h2 className="text-base font-bold">Order summary</h2>
            <div className="mt-3 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Discount code"
                className="h-11 flex-1 rounded-2xl bg-input px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
              <Button
                variant="soft"
                onClick={() => {
                  setApplied(code);
                  toast[code.trim().toUpperCase() === "CAMPUS10" ? "success" : "error"](
                    code.trim().toUpperCase() === "CAMPUS10" ? "10% discount applied" : "Invalid code",
                  );
                }}
              >
                Apply
              </Button>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{rands(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{rands(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd className="text-brand">-{rands(discount)}</dd></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                <dt>Total</dt><dd className="text-primary">{rands(total)}</dd>
              </div>
            </dl>
            <Button variant="navy" size="pill" className="mt-4 w-full" onClick={() => navigate({ to: "/checkout" })}>
              Pay Now
            </Button>
            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-brand" /> Secure Checkout - SSL Encrypted
            </p>
          </aside>
        </div>
      )}
    </AppShell>
  );
}
