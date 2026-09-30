import type { ReactNode } from "react";

/** A stable header keeps navigation available without reacting to every scroll. */
export function HeaderShell({ children }: { children: ReactNode }) {
  return <header className="fixed inset-x-0 top-0 z-40 h-[var(--header-height)] border-b border-line bg-bone">{children}</header>;
}
