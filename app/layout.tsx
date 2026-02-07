import "./globals.css";

import type { ReactNode } from "react";

import Chatbot from "../components/Chatbot";
import ViewAsSelector from "./ViewAsSelector";

export const metadata = {
  title: "St Kitts Tourism",
  description: "Island escapes, curated for you.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "St Kitts Tourism",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

const navLinks = [
  { label: "Discover", href: "#" },
  { label: "Things to Do", href: "#" },
  { label: "Plan Your Trip", href: "/plan-your-trip" },
  { label: "Events", href: "#" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white"
                >
                  SK
                </span>
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    St Kitts Tourism
                  </p>
                  <p className="text-sm text-slate-500">
                    Island escapes, curated for you.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:ml-auto sm:flex-row sm:items-center">
                <nav aria-label="Primary">
                  <ul className="flex flex-wrap gap-4 text-sm font-medium text-slate-700">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          className="transition hover:text-primary"
                          href={link.href}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ViewAsSelector />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-slate-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2024 St Kitts Tourism. All rights reserved.</span>
              <span className="text-slate-400">
                Crafted for the Phase 1 demo experience.
              </span>
            </div>
          </footer>
        </div>
        <Chatbot />
      </body>
    </html>
  );
}
