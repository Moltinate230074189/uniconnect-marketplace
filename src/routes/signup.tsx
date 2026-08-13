import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Apple, Chrome, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/uniconnect/Field";
import { Logo } from "@/components/uniconnect/Logo";
import { useStore } from "@/lib/uniconnect/store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create an account — UniConnect" },
      { name: "description", content: "Join UniConnect and start buying and selling on your campus today." },
      { property: "og:title", content: "Create an account — UniConnect" },
      { property: "og:description", content: "Sign up for the UniConnect student marketplace." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next["email"] = "Enter a valid email address";
    if (password.length < 6) next["password"] = "Password must be at least 6 characters";
    if (!school.trim()) next["school"] = "Tell us where you study";
    if (!agree) next["agree"] = "You must accept the terms to continue";
    setErrors(next);
    if (Object.keys(next).length) return;
    signup(email, school);
    navigate({ to: "/home" });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6 py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <Logo size="md" stacked />
        <h1 className="text-2xl font-bold">Create an account!</h1>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="socialOutline" size="lg" onClick={() => { signup("student@facebook.com", "University of Campus"); navigate({ to: "/home" }); }}>
          <Facebook className="size-4" /> Continue with Facebook
        </Button>
        <Button variant="socialOutline" size="lg" onClick={() => { signup("student@icloud.com", "University of Campus"); navigate({ to: "/home" }); }}>
          <Apple className="size-4" /> Continue with Apple
        </Button>
        <Button variant="socialOutline" size="lg" onClick={() => { signup("student@gmail.com", "University of Campus"); navigate({ to: "/home" }); }}>
          <Chrome className="size-4" /> Continue with Google
        </Button>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> Or <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Field label="Email address" type="email" placeholder="you@campus.ac.za" value={email} onChange={(e) => setEmail(e.target.value)} error={errors["email"]} />
        <Field label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} error={errors["password"]} />
        <Field label="School" placeholder="e.g. Faculty of Commerce" value={school} onChange={(e) => setSchool(e.target.value)} error={errors["school"]} />

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-4 accent-[var(--brand)]" />
          <span>
            I agree to the <span className="font-medium text-primary">Terms of Service</span> and{" "}
            <span className="font-medium text-primary">Privacy Policy</span>.
          </span>
        </label>
        {errors["agree"] && <span className="-mt-2 text-xs text-destructive">{errors["agree"]}</span>}

        <Button type="submit" variant="brand" size="pill" className="w-full">
          Sign up
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
