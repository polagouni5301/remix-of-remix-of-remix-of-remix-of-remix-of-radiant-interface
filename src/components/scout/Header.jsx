import { Link } from "@tanstack/react-router";
import { Timer } from "lucide-react";
import { LocaliQLogo } from "./Logo";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-5">
        <div className="flex items-center gap-5">
          <Link to="/">
            <LocaliQLogo />
          </Link>
          <div className="h-6 w-px bg-border" />
          <span className="text-sm text-muted-foreground">Campaign Intelligence</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
            <Timer className="h-4 w-4 text-primary" strokeWidth={1.75} />
            <span className="text-muted-foreground">You reclaimed</span>
            <span className="font-semibold text-primary">47m</span>
            <span className="text-muted-foreground">today</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-[12px] font-semibold text-background">
            JC
          </div>
        </div>
      </div>
    </header>
  );
}
