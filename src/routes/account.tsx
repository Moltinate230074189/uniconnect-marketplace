import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  CreditCard,
  KeyRound,
  ListChecks,
  LogOut,
  Package,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/uniconnect/AppShell";
import { Field } from "@/components/uniconnect/Field";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — UniConnect" },
      { name: "description", content: "Manage your UniConnect profile, listings, billing info and account settings." },
      { property: "og:title", content: "My Account — UniConnect" },
      { property: "og:description", content: "Your UniConnect student profile and settings." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, updateProfile, logout } = useStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    school: user?.school ?? "",
    phone: user?.phone ?? "",
  });

  const onAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { updateProfile({ avatar: String(reader.result) }); toast.success("Profile picture updated"); };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <AppShell title="Account" showSearch={false}>
        <p className="text-sm text-muted-foreground">You are signed out.</p>
        <Button asChild variant="brand" className="mt-4"><Link to="/login">Log in</Link></Button>
      </AppShell>
    );
  }

  const menu = [
    { icon: UserIcon, label: "Account", action: () => setEditing(true) },
    { icon: ListChecks, label: "My listings", to: "/listings" as const },
    { icon: Package, label: "Orders", to: "/orders" as const },
    { icon: CreditCard, label: "Billing info", action: () => toast("Billing details are managed at checkout") },
    { icon: Settings, label: "Settings", action: () => toast("Settings coming soon") },
    { icon: KeyRound, label: "Password", action: () => toast("A reset link would be emailed to you") },
  ];

  return (
    <AppShell title="Account" showSearch={false}>
      <div className="mx-auto max-w-2xl">
        <section className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-card">
          <label className="relative cursor-pointer">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="size-16 rounded-full object-cover" />
            ) : (
              <span className="grid size-16 place-items-center rounded-full bg-accent text-xl font-bold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="absolute -bottom-1 -right-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-brand-foreground">
              Edit
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={onAvatar} />
          </label>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold">{user.name}</h2>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            <p className="truncate text-xs text-muted-foreground">{user.school}</p>
          </div>
        </section>

        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile(form);
              setEditing(false);
              toast.success("Profile updated");
            }}
            className="mt-4 grid gap-3 rounded-3xl border border-border bg-card p-5 shadow-card sm:grid-cols-2"
          >
            <Field label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Field label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Field label="School" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} />
            <Field label="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" variant="brand">Save profile</Button>
              <Button type="button" variant="soft" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            {menu.map(({ icon: Icon, label, to, action }) => (
              <li key={label}>
                {to ? (
                  <Link to={to} className="flex items-center gap-3 p-4 text-sm font-medium hover:bg-muted">
                    <Icon className="size-4 text-brand" /> {label}
                  </Link>
                ) : (
                  <button onClick={action} className="flex w-full items-center gap-3 p-4 text-left text-sm font-medium hover:bg-muted">
                    <Icon className="size-4 text-brand" /> {label}
                  </button>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={() => { logout(); navigate({ to: "/login", replace: true }); }}
                className="flex w-full items-center gap-3 p-4 text-left text-sm font-medium text-destructive hover:bg-muted"
              >
                <LogOut className="size-4" /> Sign Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </AppShell>
  );
}
