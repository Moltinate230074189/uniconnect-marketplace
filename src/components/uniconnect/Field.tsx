import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-2xl bg-input px-4 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2";

export function Field({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input {...props} className={cn(base, "h-12", className)} />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function TextAreaField({
  label,
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <textarea {...props} className={cn(base, "min-h-28 py-3", className)} />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function SelectField({
  label,
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select {...props} className={cn(base, "h-12", className)}>
        {children}
      </select>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
