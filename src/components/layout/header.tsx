"use client";

import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b px-6">
      <button
        className="md:hidden"
        aria-label="Toggle sidebar"
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex-1" />
      <span className="text-sm text-muted-foreground">
        AI Workforce Impact Platform
      </span>
    </header>
  );
}
