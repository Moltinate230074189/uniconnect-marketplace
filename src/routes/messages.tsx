import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { AppShell } from "@/components/uniconnect/AppShell";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/uniconnect/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — UniConnect" },
      { name: "description", content: "Chat with buyers and sellers on your campus to arrange pickups and payments." },
      { property: "og:title", content: "Messages — UniConnect" },
      { property: "og:description", content: "Message students directly about their listings." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const { conversations, sendMessage } = useStore();
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");
  const [text, setText] = useState("");
  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !active) return;
    sendMessage(active.id, text.trim());
    setText("");
  };

  return (
    <AppShell title="Messages" showSearch={false}>
      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        <ul className="space-y-2">
          {conversations.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border border-border p-3 text-left",
                  c.id === active?.id ? "bg-accent" : "bg-card hover:bg-muted",
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft font-bold text-primary">
                  {c.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{c.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {c.messages[c.messages.length - 1]?.text ?? c.about}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {active && (
          <section className="flex min-h-[60vh] flex-col rounded-3xl border border-border bg-card shadow-card">
            <header className="border-b border-border p-4">
              <h2 className="text-sm font-bold">{active.name}</h2>
              <p className="text-xs text-muted-foreground">About: {active.about}</p>
            </header>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {active.messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    m.from === "me"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {m.text}
                  <span className={cn("mt-1 block text-[10px] opacity-70")}>
                    {new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message…"
                className="h-11 flex-1 rounded-full bg-input px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
              <Button type="submit" variant="brand" size="icon" aria-label="Send message">
                <Send className="size-4" />
              </Button>
            </form>
          </section>
        )}
      </div>
    </AppShell>
  );
}
