import { cn } from "@/lib/utils";

/**
 * UniConnect mark: two figures leaning together into a heart, cradling a
 * shopping bag, with a handshake at the base. Blue figure + green figure.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="UniConnect logo" className={cn("size-9", className)}>
      {/* left figure (navy) */}
      <circle cx="17" cy="13" r="7" className="fill-primary" />
      <path
        d="M32 55C32 55 8 41.5 8 28.5C8 21.6 13.4 17 19.4 17C24.6 17 29.6 20.4 32 25.6V55Z"
        className="fill-primary"
      />
      {/* right figure (green) */}
      <circle cx="47" cy="13" r="7" className="fill-brand" />
      <path
        d="M32 55C32 55 56 41.5 56 28.5C56 21.6 50.6 17 44.6 17C39.4 17 34.4 20.4 32 25.6V55Z"
        className="fill-brand"
      />
      {/* shopping bag */}
      <rect x="23" y="30" width="18" height="15" rx="3" className="fill-background" />
      <path
        d="M28 31v-2.5a4 4 0 0 1 8 0V31"
        className="stroke-primary"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* handshake */}
      <path
        d="M24 49h6l2 2 2-2h6"
        className="stroke-background"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  className,
  size = "md",
  stacked = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  stacked?: boolean;
}) {
  const mark = size === "lg" ? "size-20" : size === "sm" ? "size-8" : "size-10";
  const text = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-xl";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        stacked && "flex-col gap-3",
        className,
      )}
    >
      <LogoMark className={mark} />
      <span className={cn(text, "leading-none")}>
        <span className="text-primary">Uni</span>
        <span className="text-brand">Connect</span>
      </span>
    </span>
  );
}
