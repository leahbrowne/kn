const highlights = [
  {
    title: 'Island heritage',
    detail:
      'From sugar plantation history to Creole traditions, St Kitts blends centuries of culture and resilience.',
  },
  {
    title: 'Natural wonders',
    detail:
      'Black-sand beaches, rainforest trails, and Mount Liamuiga’s volcanic peak define the landscape.',
  },
  {
    title: 'Warm hospitality',
    detail:
      'Community-first island life means every visitor is welcomed like family.',
  },
];

const quickFacts = [
  { label: 'Capital', value: 'Basseterre' },
  { label: 'Language', value: 'English' },
  { label: 'Currency', value: 'Eastern Caribbean Dollar (XCD)' },
  { label: 'Best for', value: 'Culture, beaches, adventure, romance' },
];

export default function AboutPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-900 to-primary p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            About St Kitts
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            A Caribbean island where heritage and natural beauty meet.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            St Kitts invites travelers to slow down, savor vibrant culture, and explore one-of-a-kind landscapes.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Quick facts
              </h3>
              <dl className="mt-4 space-y-3 text-sm text-slate-600">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl bg-slate-50 p-4">
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-800">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Must-see neighborhoods
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {['Basseterre waterfront', 'Frigate Bay', 'Old Road Town', 'Sandy Point'].map(
                  (place) => (
                    <li key={place} className="rounded-2xl bg-slate-50 px-4 py-2">
                      {place}
                    </li>
                  )
                )}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
