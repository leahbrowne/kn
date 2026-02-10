import attractions from '@/data/attractions.json';

type Attraction = {
  id: string;
  name: string;
  description: string;
  image?: string;
  slug?: string;
  category?: string;
};

const attractionItems = attractions as Attraction[];

const attractionCards = attractionItems.filter(
  (attraction) => attraction.category !== 'beach',
);

const signatureBeaches = attractionItems.filter(
  (attraction) => attraction.category === 'beach',
);

const curatedDayIdeas = attractionCards.map((attraction) => ({
  title: attraction.name,
  items: [attraction.description],
}));

const getAttractionHighlight = (attraction: Attraction) =>
  attraction.slug ?? attraction.id.replace(/-/g, ' ');

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
            {attractionCards.map((attraction) => (
              <article
                key={attraction.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {attraction.name}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {getAttractionHighlight(attraction)}
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
                {signatureBeaches.map((beach) => (
                  <li key={beach.id} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-800">{beach.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{beach.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Curated day ideas
              </h3>
              <div className="mt-4 space-y-4">
                {curatedDayIdeas.map((experience) => (
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
