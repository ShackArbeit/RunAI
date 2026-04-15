import { Badge } from "@/components/ui/Badge";
import { membersCopy } from "@/components/members/content";

export function Header() {
  return (
    <header className="surface-panel rounded-[24px] border border-[var(--border-subtle)] bg-[rgba(13,26,43,0.98)] px-4 py-3 sm:px-5 sm:py-4 md:rounded-[28px] md:px-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.06)] pb-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[linear-gradient(135deg,#2a6af5_0%,#3faf35_100%)] md:h-10 md:w-10" />
            <div className="min-w-0">
              <p className="font-heading text-lg tracking-wide text-[var(--text-primary)] md:text-xl">
                {membersCopy.brand}
              </p>
              <p className="truncate text-[11px] text-[var(--text-muted)] md:text-xs">
                {membersCopy.header.utilityLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="muted">{membersCopy.header.locale}</Badge>
            <Badge className="hidden sm:inline-flex">{membersCopy.header.status}</Badge>
            <Badge tone="accent">{membersCopy.header.theme}</Badge>
            <div className="h-7 w-7 rounded-full bg-[#2a6af5]" />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
              {membersCopy.header.title}
            </p>
            <p className="max-w-[26rem] text-[11px] text-[var(--text-muted)] md:text-xs">
              {membersCopy.header.subtitle}
            </p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {membersCopy.nav.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
