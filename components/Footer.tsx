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
    <footer className="bg-slate-900 text-slate-200">
      <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
                {column.title}
              </h2>
              <ul className="space-y-2 text-sm text-slate-300">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2024 St Kitts Tourism. All rights reserved.</span>
          <span>Crafted for the Phase 1 demo</span>
        </div>
      </div>
    </footer>
  );
}
