import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/uniconnect/AppShell";
import { Field, SelectField, TextAreaField } from "@/components/uniconnect/Field";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CONDITIONS, type CategoryId, type Condition } from "@/lib/uniconnect/data";
import { useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell an Item — UniConnect" },
      { name: "description", content: "List your books, gadgets or gear on the UniConnect campus marketplace in minutes." },
      { property: "og:title", content: "Sell an Item — UniConnect" },
      { property: "og:description", content: "Create a listing and reach students on your campus." },
    ],
  }),
  component: SellPage,
});

function SellPage() {
  const { addProduct, user } = useStore();
  const navigate = useNavigate();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [form, setForm] = useState({
    name: "",
    category: "books" as CategoryId,
    price: "",
    description: "",
    condition: "Good" as Condition,
    campus: "",
    contact: user?.email ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next["name"] = "Product name is required";
    if (!form.price || Number(form.price) <= 0) next["price"] = "Enter a valid price";
    if (form.description.trim().length < 10) next["description"] = "Add at least 10 characters";
    if (!form.campus.trim()) next["campus"] = "Where can buyers collect it?";
    if (!form.contact.trim()) next["contact"] = "Contact details are required";
    setErrors(next);
    if (Object.keys(next).length) return;

    const p = addProduct({
      name: form.name.trim(),
      brand: form.condition,
      description: form.description.trim(),
      specs: [
        { label: "Condition", value: form.condition },
        { label: "Campus", value: form.campus.trim() },
      ],
      price: Number(form.price),
      category: form.category,
      condition: form.condition,
      campus: form.campus.trim(),
      seller: user?.name ?? "You",
      contact: form.contact.trim(),
      ...(image ? { image } : {}),
    });
    toast.success("Listing published");
    navigate({ to: "/product/$id", params: { id: p.id } });
  };

  return (
    <AppShell title="Sell an item" showSearch={false}>
      <form onSubmit={submit} className="mx-auto grid max-w-2xl gap-4" noValidate>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-border bg-muted/50 p-8 text-center">
          {image ? (
            <img src={image} alt="Listing preview" className="h-40 rounded-2xl object-cover" />
          ) : (
            <>
              <ImagePlus className="size-8 text-brand" />
              <span className="text-sm font-medium">Add product images</span>
              <span className="text-xs text-muted-foreground">PNG or JPG, one clear photo works best</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>

        <Field label="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors["name"]} />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as CategoryId })}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </SelectField>
          <Field label="Price (R)" type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} error={errors["price"]} />
          <SelectField label="Condition" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as Condition })}>
            {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </SelectField>
          <Field label="Location / Campus" value={form.campus} onChange={(e) => setForm({ ...form, campus: e.target.value })} error={errors["campus"]} />
        </div>
        <TextAreaField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} error={errors["description"]} />
        <Field label="Contact information" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} error={errors["contact"]} />

        <Button type="submit" variant="brand" size="pill" className="w-full">Publish Listing</Button>
      </form>
    </AppShell>
  );
}
