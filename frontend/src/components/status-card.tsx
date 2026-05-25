import type { LucideIcon } from "lucide-react";

type StatusCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: "brand" | "blue" | "amber" | "slate";
};

const toneClasses: Record<StatusCardProps["tone"], string> = {
  brand: "bg-brand-50 text-brand-700",
  blue: "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400",
  amber: "bg-warning-bg text-warning-text dark:bg-amber-950/50 dark:text-amber-400",
  slate: "bg-hover text-text-secondary"
};

export function StatusCard({
  label,
  value,
  detail,
  icon: Icon,
  tone
}: StatusCardProps) {
  return (
    <article className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-card">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-text-muted">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-normal text-heading">
            {value}
          </p>
        </div>
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${toneClasses[tone]}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm text-text-muted">{detail}</p>
    </article>
  );
}
