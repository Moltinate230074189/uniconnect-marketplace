import * as React from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Grid2x2,
  Home,
  Mail,
  PlusCircle,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Logo } from "./Logo";
import { useStore } from "@/lib/uniconnect/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/categories", label: "Categories", icon: Grid2x2 },
  { to: "/sell", label: "Sell", icon: PlusCircle },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/messages", label: "Messages", icon: Mail },
  { to: "/account", label: "Profile", icon: User },
] as const;

function Count({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
      {n > 9 ? "9+" : n}
    </span>
  );
}

export function AppShell({
  children,
  title,
  showSearch = true,
}: {
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
}) {
  const { cart, notifications, conversations } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = React.useState("");

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const unread = notifications.filter((n) => !n.read).length;
  const msgs = conversations.length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/home" aria-label="UniConnect home">
            <Logo size="sm" className="shrink-0" />
          </Link>

          {showSearch && (
            <form onSubmit={submit} className="hidden flex-1 md:block">
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search books, gadgets, gear…"
                  className="h-11 w-full rounded-full bg-input pl-11 pr-4 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
                />
              </label>
            </form>
          )}

          <nav className="ml-auto flex items-center gap-1">
            <Link
              to="/messages"
              aria-label="Messages"
              className="relative grid size-10 place-items-center rounded-full text-primary hover:bg-muted"
            >
              <Mail className="size-5" />
              <Count n={msgs} />
            </Link>
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-full text-primary hover:bg-muted"
            >
              <Bell className="size-5" />
              <Count n={unread} />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid size-10 place-items-center rounded-full text-primary hover:bg-muted"
            >
              <ShoppingCart className="size-5" />
              <Count n={cartCount} />
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="grid size-10 place-items-center rounded-full text-primary hover:bg-muted"
            >
              <User className="size-5" />
            </Link>
          </nav>
        </div>

        {showSearch && (
          <form onSubmit={submit} className="px-4 pb-3 md:hidden">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search on campus…"
                className="h-11 w-full rounded-full bg-input pl-11 pr-4 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
              />
            </label>
          </form>
        )}

        <div className="hidden border-t border-border md:block">
          <div className="mx-auto flex w-full max-w-6xl gap-1 px-4 py-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted",
                  pathname === to && "bg-accent text-primary",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-4 md:pb-12">
        {title && <h1 className="mb-4 text-2xl font-bold tracking-tight">{title}</h1>}
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-[10px] font-medium text-muted-foreground",
                  pathname === to && "text-brand",
                )}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
