const footerColumns = [
  {
    title: "About",
    links: [
      { label: "About St Kitts", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Gallery", href: "/gallery" },
      { label: "Brochure", href: "/brochure" },
    ],
  },
  {
    title: "Plan",
    links: [
      { label: "Travel Deals", href: "/travel-deals" },
      { label: "Getting Around", href: "/getting-around" },
      { label: "FAQ", href: "/faq" },
      { label: "Map", href: "/map" },
    ],
  },
  {
    title: "Trade & Media",
    links: [
      { label: "Travel Professionals", href: "/trade" },
      { label: "Agents", href: "/agents" },
      { label: "Media / Press", href: "/press" },
      { label: "Event Venues", href: "/event-venues" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Sitemap", href: "/sitemap" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#3E4617] text-[#F6F6F3]">
      <div className="mx-auto w-full max-w-6xl px-6 py-32">
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
