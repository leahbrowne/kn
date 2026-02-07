const events = [
  {
    name: 'St Kitts Music Festival',
    timing: 'June',
    description:
      'Three nights of Caribbean, soca, reggae, and international headliners on the island’s biggest stage.',
  },
  {
    name: 'Restaurant Week',
    timing: 'Summer',
    description:
      'Prix-fixe menus and chef collaborations spotlighting St Kitts culinary talent.',
  },
  {
    name: 'Carnival',
    timing: 'December - January',
    description:
      'Parades, calypso competitions, and masquerade street parties celebrating the season.',
  },
];

const calendarTips = [
  'Book accommodations early for festival weeks.',
  'Pair events with beaches and volcano hikes for a balanced itinerary.',
  'Follow local cultural centers for pop-up markets and craft fairs.',
];

export default function EventsPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-900 via-primary to-slate-700 p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Things to Do
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Mark your calendar for St Kitts events.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Music, food, and cultural celebrations keep the island buzzing year-round.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {events.map((event) => (
              <article
                key={event.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {event.name}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {event.timing}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{event.description}</p>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Event planning tips
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {calendarTips.map((tip) => (
                  <li key={tip} className="rounded-2xl bg-slate-50 p-4">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Quick add-ons
              </h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {['Festival beach day', 'Sunset catamaran cruise', 'Basseterre heritage tour'].map(
                  (item) => (
                    <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
