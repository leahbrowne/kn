"use client";

import { useState } from "react";

const navLinks = [
  { label: "Explore", href: "/things-to-do/attractions" },
  { label: "Stay", href: "/stay" },
  { label: "Eat & Drink", href: "/things-to-do/restaurants" },
  { label: "Plan", href: "/plan-your-trip" },
  { label: "Stories", href: "/stories" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
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
            <p className="text-xs text-slate-500 sm:text-sm">
              Island escapes, curated for you.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <a
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
            href="/plan-your-trip"
          >
            Trip Planner (AI)
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            type="button"
          >
            <span aria-hidden="true">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        <div className="hidden items-center gap-6 sm:flex">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-700">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5"
              href="/plan-your-trip"
            >
              Trip Planner (AI)
            </a>
            <a
              className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
              href="/stay"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-t border-slate-200 bg-white sm:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        id="mobile-navigation"
      >
        <nav aria-label="Primary mobile" className="px-6 py-4">
          <ul className="flex flex-col gap-4 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  href={link.href}
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <a
              className="rounded-full border border-primary px-4 py-2 text-center text-sm font-semibold text-primary transition hover:bg-primary/10"
              href="/stay"
              onClick={handleNavClick}
            >
              Book Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
