import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/uniconnect/AppShell";
import { ProductImage } from "@/components/uniconnect/ProductImage";
import { Field } from "@/components/uniconnect/Field";
import { Button } from "@/components/ui/button";
import { rands, useStore } from "@/lib/uniconnect/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "My Listings — UniConnect" },
      { name: "description", content: "Manage the items you are selling: edit, delete or mark them as sold." },
      { property: "og:title", content: "My Listings — UniConnect" },
      { property: "og:description", content: "Track and manage your campus listings." },
    ],
  }),
  component: ListingsPage,
});

const statusClass = (s: string) =>
  s === "Active"
    ? "bg-accent text-primary"
    : s === "Sold"
      ? "bg-muted text-muted-foreground"
      : "bg-brand-soft text-brand-foreground";

function ListingsPage() {
  const { products, updateProduct, deleteProduct, setListingStatus } = useStore();
  const mine = products.filter((p) => p.ownerId === "me");
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", price: "" });

  return (
    <AppShell title="My Listings" showSearch={false}>
      {mine.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-10 text-center">
          <p className="font-semibold">You haven&apos;t listed anything yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Turn unused campus gear into cash.</p>
          <Button asChild variant="brand" className="mt-4"><Link to="/sell">Sell an item</Link></Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {mine.map((p) => (
            <li key={p.id} className="rounded-3xl border border-border bg-card p-3 shadow-card">
              <div className="flex gap-3">
                <ProductImage product={p} className="size-20 shrink-0" iconClassName="size-7" />
                <div className="min-w-0 flex-1">
                  <Link to="/product/$id" params={{ id: p.id }} className="text-sm font-semibold hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-sm font-bold text-primary">{rands(p.price)}</p>
                  <p className="text-xs text-muted-foreground">
                    Listed {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={cn("h-fit rounded-full px-3 py-1 text-xs font-semibold", statusClass(p.status))}>
                  {p.status}
                </span>
              </div>

              {editing === p.id ? (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Product name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                  <Field label="Price (R)" type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
                  <div className="flex gap-2 sm:col-span-2">
                    <Button
                      variant="brand"
                      size="sm"
                      onClick={() => {
                        updateProduct(p.id, { name: draft.name, price: Number(draft.price) || p.price });
                        setEditing(null);
                        toast.success("Listing updated");
                      }}
                    >
                      Save changes
                    </Button>
                    <Button variant="soft" size="sm" onClick={() => setEditing(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="soft"
                    size="sm"
                    onClick={() => { setEditing(p.id); setDraft({ name: p.name, price: String(p.price) }); }}
                  >
                    <Pencil className="size-3.5" /> Edit
                  </Button>
                  <Button
                    variant="soft"
                    size="sm"
                    disabled={p.status === "Sold"}
                    onClick={() => { setListingStatus(p.id, "Sold"); toast.success("Marked as sold"); }}
                  >
                    <Check className="size-3.5" /> Mark as sold
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => { deleteProduct(p.id); toast("Listing deleted"); }}
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
