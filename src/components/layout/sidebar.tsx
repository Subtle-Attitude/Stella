"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/" },
  { label: "Canon", href: "/canon" },
  { label: "Content", href: "/content" },
  { label: "Journal", href: "/journal" },
  { label: "History", href: "/history" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-zinc-800 p-6 flex flex-col h-screen">
      <div className="mb-10">
        <h1 className="text-lg font-light tracking-tight">Stella</h1>
        <p className="text-xs text-zinc-500 mt-1">Atlas Spark</p>
      </div>

      <nav className="flex flex-col gap-1 text-sm">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-2 rounded-md transition-colors ${
                active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}