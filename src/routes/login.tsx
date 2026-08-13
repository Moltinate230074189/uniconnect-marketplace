import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/uniconnect/Logo";
import { useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — UniConnect" },
      { name: "description", content: "Log in to UniConnect to buy and sell on your campus marketplace." },
      { property: "og:title", content: "Log in — UniConnect" },
      { property: "og:description", content: "Log in to your UniConnect student account." },
    ],
  }),
  component: LoginPage,
});

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        {...props}
        className="h-12 w-full rounded-2xl bg-input px-4 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address";
    if (password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    if (Object.keys(next).length) return;
    login(email);
    navigate({ to: "/home" });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6 py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <Logo size="md" stacked />
        <div>
          <h1 className="text-2xl font-bold">Hi, Welcome!</h1>
          <p className="text-sm text-muted-foreground">Login to continue</p>
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Field
          label="Email address"
          type="email"
          placeholder="you@campus.ac.za"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 accent-[var(--brand)]"
            />
            Remember me
          </label>
          <Link to="/login" className="font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="brand" size="pill" className="w-full">
          Log in
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> Or with <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="socialOutline" size="lg" onClick={() => { login("student@facebook.com"); navigate({ to: "/home" }); }}>
          <Facebook className="size-4" /> Continue with Facebook
        </Button>
        <Button variant="socialOutline" size="lg" onClick={() => { login("student@gmail.com"); navigate({ to: "/home" }); }}>
          <Chrome className="size-4" /> Continue with Google
        </Button>
        <Button variant="socialOutline" size="lg" onClick={() => { login("student@instagram.com"); navigate({ to: "/home" }); }}>
          <Instagram className="size-4" /> Continue with Instagram
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-brand hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
