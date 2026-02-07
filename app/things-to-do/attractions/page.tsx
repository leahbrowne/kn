const attractions = [
  {
    name: 'Brimstone Hill Fortress',
    description:
      'UNESCO World Heritage fortress with panoramic views, military history, and a museum courtyard.',
    highlight: 'History + skyline views',
  },
  {
    name: 'St Kitts Scenic Railway',
    description:
      'Open-air rail journey hugging the coastline with sugar plantation stories and lush valleys.',
    highlight: 'Coastal rail adventure',
  },
  {
    name: 'Romney Manor & Caribelle Batik',
    description:
      'Historic estate for batik art, gardens, and the legendary 400-year-old saman tree.',
    highlight: 'Art + botanical gardens',
  },
  {
    name: 'Mount Liamuiga',
    description:
      'Guided volcano hike through rainforest trails and a misty crater rim.',
    highlight: 'Adventure + rainforest',
  },
  {
    name: 'Historic Basseterre',
    description:
      'Walkable city highlights including The Circus, Independence Square, and heritage churches.',
    highlight: 'Culture + architecture',
  },
];

const beaches = [
  {
    name: 'Cockleshell Beach',
    vibe: 'Island hopping, calm waters, and Nevis views.',
  },
  {
    name: 'South Friars Bay',
    vibe: 'Soft sand with beach bars and water sports nearby.',
  },
  {
    name: 'Frigate Bay',
    vibe: 'Lively strip with restaurants, loungers, and golden sunsets.',
  },
  {
    name: 'Timothy Beach',
    vibe: 'Family-friendly shoreline with snorkel-ready waters.',
  },
];

const experiences = [
  {
    title: 'Morning on the coast',
    items: ['Scenic Railway sunrise departure', 'Stop for sugar plantation history', 'Beachside brunch in Frigate Bay'],
  },
  {
    title: 'Culture + gardens afternoon',
    items: ['Romney Manor batik studio tour', 'Rainforest walk through botanical trails', 'Local rum tasting'],
  },
  {
    title: 'Highland adventure',
    items: ['Early hike to Mount Liamuiga', 'Volcano crater viewpoint', 'Return to Basseterre for dinner'],
  },
];

export default function AttractionsPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-primary via-sky-600 to-accent p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Things to Do
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Iconic St Kitts attractions and island adventures.
          </h1>
          <p className="mt-4 text-lg text-white/85">
            From UNESCO-listed forts to volcanic rainforest hikes, discover the island’s must-see experiences.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {attractions.map((attraction) => (
              <article
                key={attraction.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {attraction.name}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {attraction.highlight}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {attraction.description}
                </p>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Signature beaches
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {beaches.map((beach) => (
                  <li key={beach.name} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-800">{beach.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{beach.vibe}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Curated day ideas
              </h3>
              <div className="mt-4 space-y-4">
                {experiences.map((experience) => (
                  <div key={experience.title} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {experience.title}
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {experience.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
