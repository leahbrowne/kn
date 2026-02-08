"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Explore", href: "/things-to-do/attractions" },
  { label: "Stay", href: "/stay" },
  { label: "Eat & Drink", href: "/things-to-do/restaurants" },
  { label: "Stories", href: "/stories" },
  { label: "Plan", href: "/plan-your-trip" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = () => setIsMenuOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "header-solid" : ""}`}>
      <div className="mx-auto flex h-20 w-full max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <a className="flex items-center gap-3" href="/">
          <img
            alt="St Kitts Tourism"
            className="h-[44px] w-auto"
            src={isScrolled ? "/brand/logo.svg" : "/brand/logo-white.svg"}
          />
        </a>

        <div className="flex items-center gap-3 lg:hidden">
          <a className="header-ghost-button px-4 py-2 text-xs" href="/discover">
            Discover
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="header-icon-button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            type="button"
          >
            <span aria-hidden="true">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-8 text-sm font-semibold tracking-wide">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a className="header-nav-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <a className="header-ghost-button" href="/discover">
            Discover
          </a>
          <a className="header-ghost-button" href="/stay">
            View Stays
          </a>
        </div>
      </div>

      <div
        className={`mobile-nav ${isMenuOpen ? "block" : "hidden"} lg:hidden`}
        id="mobile-navigation"
      >
        <nav aria-label="Primary mobile" className="px-6 py-4">
          <ul className="flex flex-col gap-4 text-sm font-semibold">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a className="header-nav-link" href={link.href} onClick={handleNavClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <a
              className="header-ghost-button text-center"
              href="/stay"
              onClick={handleNavClick}
            >
              View Stays
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
