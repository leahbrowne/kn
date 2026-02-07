const stays = [
  {
    name: 'Beachfront Resorts',
    description:
      'Full-service resorts in Frigate Bay with pools, spas, and dining steps from the sand.',
  },
  {
    name: 'Boutique Hideaways',
    description:
      'Intimate properties tucked into historic estates and lush hillside gardens.',
  },
  {
    name: 'Villas & Residences',
    description:
      'Private villas ideal for families and groups wanting extra space and kitchen amenities.',
  },
  {
    name: 'Eco-Lodges',
    description:
      'Rainforest retreats near Mount Liamuiga with nature walks and wellness programming.',
  },
];

const stayTips = [
  'Choose Frigate Bay for walkable dining and nightlife.',
  'Stay near Basseterre for quick ferry and cruise access.',
  'Combine beach nights with a rainforest retreat for variety.',
];

export default function StayPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-primary via-sky-700 to-slate-900 p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Stay
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Find the perfect base for your St Kitts escape.
          </h1>
          <p className="mt-4 text-lg text-white/85">
            From beachfront resorts to rainforest lodges, discover accommodations tailored to every traveler.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            {stays.map((stay) => (
              <article
                key={stay.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  {stay.name}
                </h2>
                <p className="mt-3 text-sm text-slate-600">{stay.description}</p>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Stay planning tips
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {stayTips.map((tip) => (
                  <li key={tip} className="rounded-2xl bg-slate-50 p-4">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Add-on services
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                {['Airport transfers', 'Island concierge', 'In-room spa treatments'].map(
                  (service) => (
                    <div key={service} className="rounded-2xl bg-slate-50 px-4 py-3">
                      {service}
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
