const faqs = [
  {
    question: 'What is the best time to visit St Kitts?',
    answer:
      'The most popular season runs from December through April with sunny, breezy weather. Summer brings cultural festivals and slightly quieter beaches.',
  },
  {
    question: 'How do I get around the island?',
    answer:
      'Taxis and organized tours are widely available. For flexibility, rent a car to explore beaches and countryside at your own pace.',
  },
  {
    question: 'How many days do I need?',
    answer:
      'A 3- to 5-day trip covers the highlights. Add extra days for volcano hikes, Nevis day trips, or beach relaxation.',
  },
  {
    question: 'Do I need cash?',
    answer:
      'Cards are accepted at most hotels and restaurants, but small vendors and beach bars appreciate cash (XCD or USD).',
  },
  {
    question: 'What should I pack?',
    answer:
      'Lightweight clothing, reef-safe sunscreen, water shoes, and a light jacket for evening breezes are essentials.',
  },
];

const travelEssentials = [
  'Passport valid for six months beyond travel dates.',
  'Book tours in advance during peak season.',
  'Respect local heritage sites and eco-trails.',
];

export default function FaqPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Plan Your Trip
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Frequently asked questions.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Everything you need to know before you arrive on island.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <h2 className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </h2>
                <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Travel essentials
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {travelEssentials.map((item) => (
                  <li key={item} className="rounded-2xl bg-slate-50 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Still planning?
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Explore sample itineraries, chat with the trip planner, and save your top picks.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  { label: 'View itinerary builder', href: '/plan-your-trip/itinerary' },
                  { label: 'Chat with the planner', href: '/plan-your-trip' },
                ].map((link) => (
                  <a
                    key={link.label}
                    className="rounded-full border border-slate-200 px-4 py-2 text-center text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
