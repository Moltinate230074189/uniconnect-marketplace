import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bell, MessageSquare, Package, Tag } from "lucide-react";
import { AppShell } from "@/components/uniconnect/AppShell";
import { useStore } from "@/lib/uniconnect/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — UniConnect" },
      { name: "description", content: "Order confirmations, sold items, pickup reminders and new messages." },
      { property: "og:title", content: "Notifications — UniConnect" },
      { property: "og:description", content: "Stay on top of your campus marketplace activity." },
    ],
  }),
  component: NotificationsPage,
});

const ICONS = { order: Package, sale: Tag, message: MessageSquare, pickup: Bell };

function timeAgo(iso: string) {
  const mins = Math.round((Date.now() - +new Date(iso)) / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / 1440)}d ago`;
}

function NotificationsPage() {
  const { notifications, markNotificationsRead } = useStore();

  useEffect(() => {
    const t = setTimeout(markNotificationsRead, 800);
    return () => clearTimeout(t);
  }, [markNotificationsRead]);

  return (
    <AppShell title="Notifications" showSearch={false}>
      <ul className="space-y-2">
        {notifications.map((n) => {
          const Icon = ICONS[n.kind];
          return (
            <li
              key={n.id}
              className={cn(
                "flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-card",
                !n.read && "border-brand/40 bg-accent/40",
              )}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{n.text}</p>
                <p className="text-xs text-muted-foreground">{timeAgo(n.time)}</p>
              </div>
              {!n.read && <span className="ml-auto mt-2 size-2 rounded-full bg-brand" />}
            </li>
          );
        })}
        {notifications.length === 0 && (
          <li className="rounded-3xl border border-dashed border-border bg-muted/50 p-10 text-center text-sm text-muted-foreground">
            You&apos;re all caught up.
          </li>
        )}
      </ul>
    </AppShell>
  );
}
