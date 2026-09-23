"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface DemoShellProps {
  children: ReactNode;
}

export default function DemoShell({ children }: DemoShellProps) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">PI</div>

          <div>
            <div className="brand-title">Prompt Injection Lab</div>
            <div className="brand-subtitle">Security demonstration</div>
          </div>
        </div>

        <nav className="nav">
          <Link
            href="/"
            className={pathname === "/" ? "nav-link active" : "nav-link"}
          >
            Overview
          </Link>

          <Link
            href="/direct"
            className={pathname === "/direct" ? "nav-link active" : "nav-link"}
          >
            Direct Injection
          </Link>

          <Link
            href="/indirect"
            className={
              pathname === "/indirect" ? "nav-link active" : "nav-link"
            }
          >
            Indirect Injection
          </Link>

          <Link
            href="/mitigations"
            className={
              pathname === "/mitigations" ? "nav-link active" : "nav-link"
            }
          >
            Mitigations
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
