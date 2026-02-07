import type { ReactNode } from "react";

import "./globals.css";

export const metadata = {
  title: "St Kitts Tourism PWA Demo",
  description: "Modern St Kitts Tourism PWA concept",
};
import "./globals.css";

import type { ReactNode } from "react";

const navLinks = ["Discover", "Things to Do", "Plan Your Trip", "Events"];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="min-h-screen">
          <header className="bg-primary text-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                  St Kitts
                </p>
                <h1 className="text-2xl font-semibold">Tourism PWA Demo</h1>
              </div>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-slate-900">
                Visit Planner
              </span>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-slate-500">
              <span>Offline-ready PWA experience</span>
              <span className="font-semibold text-accent">Personalization Enabled</span>
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
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
              <nav aria-label="Primary">
                <ul className="flex flex-wrap gap-4 text-sm font-medium text-slate-700">
                  {navLinks.map((label) => (
                    <li key={label}>
                      <a
                        className="transition hover:text-primary"
                        href="#"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
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
      </body>
    </html>
  );
}
