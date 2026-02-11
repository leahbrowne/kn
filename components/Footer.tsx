const footerColumns = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Attractions", href: "/things-to-do/attractions" },
      { label: "Restaurants", href: "/things-to-do/restaurants" },
      { label: "Stay", href: "/stay" },
      { label: "Plan Your Trip", href: "/plan-your-trip" },
      { label: "Near Me", href: "/near-me" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#3E4617] text-[#F6F6F3]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F6F6F3]">
                {column.title}
              </h2>
              <ul className="space-y-2 text-sm text-white/80">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-2 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2024 St Kitts Tourism. All rights reserved.</span>
          <span>Crafted for the Phase 1 demo</span>
        </div>
      </div>
    </footer>
  );
}
