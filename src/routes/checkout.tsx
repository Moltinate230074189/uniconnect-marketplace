import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/uniconnect/AppShell";
import { Field } from "@/components/uniconnect/Field";
import { Button } from "@/components/ui/button";
import { rands, useStore, type Order } from "@/lib/uniconnect/store";
import { useCartTotals } from "./cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — UniConnect" },
      { name: "description", content: "Choose delivery or campus pickup and pay securely for your UniConnect order." },
      { property: "og:title", content: "Checkout — UniConnect" },
      { property: "og:description", content: "Fast, secure checkout for campus purchases." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { user, placeOrder } = useStore();
  const navigate = useNavigate();
  const { lines, subtotal, shipping, discount, total } = useCartTotals("");
  const [method, setMethod] = useState<"Delivery" | "Pickup">("Delivery");
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    country: "South Africa",
    city: "",
    state: "",
    zip: "",
  });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<Order | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next["name"] = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next["email"] = "Enter a valid email address";
    if (form.phone.trim().length < 7) next["phone"] = "Enter a valid phone number";
    if (method === "Delivery" && !form.city.trim()) next["city"] = "City is required for delivery";
    if (!agree) next["agree"] = "Please accept the terms and conditions";
    setErrors(next);
    if (Object.keys(next).length || lines.length === 0) return;

    const placed = placeOrder({
      items: lines.map(({ line, product }) => ({
        productId: product.id,
        name: product.name,
        qty: line.qty,
        price: product.price,
      })),
      subtotal,
      shipping: method === "Pickup" ? 0 : shipping,
      discount,
      total: method === "Pickup" ? total - shipping : total,
      method,
      address:
        method === "Pickup"
          ? "Student Centre pickup point"
          : [form.city, form.state, form.zip, form.country].filter(Boolean).join(", "),
    });
    setOrder(placed);
  };

  if (order) {
    return (
      <AppShell showSearch={false}>
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <CheckCircle2 className="mx-auto size-14 text-brand" />
          <h1 className="mt-4 text-2xl font-bold">Payment Successful!</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your order has been placed successfully.</p>

          <div className="mt-5 rounded-2xl bg-muted p-4 text-left text-sm">
            <p className="font-semibold">Order number: {order.id}</p>
            <ul className="mt-2 space-y-1">
              {order.items.map((i) => (
                <li key={i.productId} className="flex justify-between">
                  <span className="text-muted-foreground">{i.qty}× {i.name}</span>
                  <span>{rands(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 flex justify-between border-t border-border pt-2 font-bold">
              <span>Total</span> <span className="text-primary">{rands(order.total)}</span>
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {order.method === "Pickup"
                ? "Ready for pickup at the Student Centre within 24 hours."
                : `Estimated delivery in 2–3 days to ${order.address}.`}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <Button asChild variant="brand" size="pill"><Link to="/home">Continue Shopping</Link></Button>
            <Button asChild variant="soft" size="pill"><Link to="/orders">View my orders</Link></Button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Check out" showSearch={false}>
      <form onSubmit={pay} className="grid gap-6 lg:grid-cols-[1fr_360px]" noValidate>
        <div className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5 shadow-card">
            <h2 className="text-base font-bold">Shipping Information</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(["Delivery", "Pickup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={cn(
                    "rounded-2xl border border-border py-3 text-sm font-semibold",
                    method === m ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={set("name")} error={errors["name"]} />
              <Field label="Email address" type="email" value={form.email} onChange={set("email")} error={errors["email"]} />
              <Field label="Phone number" value={form.phone} onChange={set("phone")} error={errors["phone"]} />
              <Field label="Country" value={form.country} onChange={set("country")} />
              <Field label="City" value={form.city} onChange={set("city")} error={errors["city"]} />
              <Field label="State / Province" value={form.state} onChange={set("state")} />
              <Field label="Zip code" value={form.zip} onChange={set("zip")} />
            </div>

            <label className="mt-4 flex items-start gap-2 text-sm">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-4 accent-[var(--brand)]" />
              I have read and agree to the terms and conditions.
            </label>
            {errors["agree"] && <p className="mt-1 text-xs text-destructive">{errors["agree"]}</p>}
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-5 shadow-card">
          <h2 className="text-base font-bold">Order summary</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {lines.map(({ line, product }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">{line.qty}× {product.name}</span>
                <span>{rands(product.price * line.qty)}</span>
              </li>
            ))}
            {lines.length === 0 && <li className="text-muted-foreground">Your cart is empty.</li>}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{rands(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{rands(method === "Pickup" ? 0 : shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd className="text-brand">-{rands(discount)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <dt>Total</dt><dd className="text-primary">{rands(method === "Pickup" ? total - shipping : total)}</dd>
            </div>
          </dl>
          <Button type="submit" variant="navy" size="pill" className="mt-4 w-full" disabled={lines.length === 0}>
            Pay Now
          </Button>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-brand" /> Secure Checkout - SSL Encrypted
          </p>
        </aside>
      </form>
    </AppShell>
  );
}
