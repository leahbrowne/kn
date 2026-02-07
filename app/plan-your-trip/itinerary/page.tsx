const itineraryCards = [
  {
    title: '3-Day Essentials',
    summary: 'Perfect for a long weekend focused on highlights and beaches.',
    days: [
      'Day 1: Basseterre heritage walk + sunset dinner.',
      'Day 2: Scenic Railway + Cockleshell Beach.',
      'Day 3: Mount Liamuiga hike + local rum tasting.',
    ],
  },
  {
    title: '5-Day Adventure',
    summary: 'Balance cultural landmarks, beach time, and outdoor activities.',
    days: [
      'Day 1: Historic Basseterre + local markets.',
      'Day 2: Romney Manor + botanical gardens.',
      'Day 3: Nevis day trip + beach club lunch.',
      'Day 4: Volcano hike + spa evening.',
      'Day 5: Frigate Bay relaxation + sunset cruise.',
    ],
  },
  {
    title: '7-Day Slow Escape',
    summary: 'Ideal for immersive island living and deeper exploration.',
    days: [
      'Days 1-2: Beaches + culinary experiences.',
      'Days 3-4: Rainforest hikes + cultural workshops.',
      'Days 5-6: Island hopping + boutique shopping.',
      'Day 7: Final beach morning + farewell dinner.',
    ],
  },
];

const planningSteps = [
  {
    title: 'Pick your pace',
    detail: 'Choose a 3, 5, or 7-day outline based on your travel window.',
  },
  {
    title: 'Mix interests',
    detail: 'Blend beaches with heritage sites, food stops, and outdoor adventures.',
  },
  {
    title: 'Save your stops',
    detail: 'Use the AI trip planner to lock in reservations and share with your crew.',
  },
];

export default function ItineraryPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-primary via-slate-900 to-slate-900 p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Plan Your Trip
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Build your St Kitts itinerary in minutes.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Start with these sample schedules, then customize with your favorite beaches, restaurants, and attractions.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {itineraryCards.map((itinerary) => (
              <article
                key={itinerary.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  {itinerary.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{itinerary.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {itinerary.days.map((day) => (
                    <li key={day} className="rounded-2xl bg-slate-50 px-4 py-2">
                      {day}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                How to plan
              </h3>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {planningSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-800">{step.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Need help?
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Try the interactive trip planner to generate a full day-by-day plan and save it for later.
              </p>
              <a
                className="button-base button-primary mt-4 inline-flex px-4 text-xs"
                href="/plan-your-trip"
              >
                Launch trip planner
              </a>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
