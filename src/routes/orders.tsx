import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/uniconnect/AppShell";
import { Button } from "@/components/ui/button";
import { rands, useStore } from "@/lib/uniconnect/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Orders — UniConnect" },
      { name: "description", content: "Track your UniConnect purchases, delivery status and campus pickups." },
      { property: "og:title", content: "Orders — UniConnect" },
      { property: "og:description", content: "Your purchase history on the campus marketplace." },
    ],
  }),
  component: OrdersPage,
});

const tone = (s: string) =>
  s === "Completed"
    ? "bg-accent text-primary"
    : s === "Cancelled"
      ? "bg-muted text-muted-foreground"
      : "bg-brand-soft text-brand-foreground";

function OrdersPage() {
  const { orders } = useStore();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <AppShell title="Orders" showSearch={false}>
      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-10 text-center">
          <p className="font-semibold">No orders yet</p>
          <Button asChild variant="brand" className="mt-4"><Link to="/home">Browse the marketplace</Link></Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-3xl border border-border bg-card p-4 shadow-card">
              <button
                onClick={() => setOpen(open === o.id ? null : o.id)}
                className="flex w-full items-center gap-3 text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.items.map((i) => i.name).join(", ")} · {new Date(o.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="font-bold text-primary">{rands(o.total)}</span>
                <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tone(o.status))}>{o.status}</span>
                <ChevronRight className={cn("size-4 text-muted-foreground transition-transform", open === o.id && "rotate-90")} />
              </button>

              {open === o.id && (
                <div className="mt-3 rounded-2xl bg-muted p-4 text-sm">
                  <ul className="space-y-1">
                    {o.items.map((i) => (
                      <li key={i.productId} className="flex justify-between">
                        <span className="text-muted-foreground">{i.qty}× {i.name}</span>
                        <span>{rands(i.price * i.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-2 space-y-1 border-t border-border pt-2">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{rands(o.shipping)}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd className="text-brand">-{rands(o.discount)}</dd></div>
                    <div className="flex justify-between font-bold"><dt>Total</dt><dd className="text-primary">{rands(o.total)}</dd></div>
                  </dl>
                  <p className="mt-2 text-xs text-muted-foreground">{o.method} · {o.address}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
