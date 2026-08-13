import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/uniconnect/Logo";
import { useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UniConnect — Campus Marketplace for Students" },
      {
        name: "description",
        content:
          "Buy. Sell. Connect. Together. UniConnect is the student marketplace for books, gadgets, fashion, sports gear and lab equipment on campus.",
      },
      { property: "og:title", content: "UniConnect — Campus Marketplace for Students" },
      {
        property: "og:description",
        content: "Buy, sell and connect with students on your campus. Books, gadgets, fashion and more.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const { user, hydrated } = useStore();
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 7)), 90);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => {
      navigate({ to: user ? "/home" : "/login", replace: true });
    }, 1600);
    return () => clearTimeout(t);
  }, [hydrated, user, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6">
      <div className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-5 duration-700">
        <Logo size="lg" stacked />
        <p className="text-center text-base font-medium text-muted-foreground">
          Buy. Sell. Connect. Together.
        </p>
      </div>
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
