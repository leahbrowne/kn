import restaurants from '@/data/restaurants.json';

const foodieMoments = [
  {
    title: 'Taste of Basseterre',
    detail: 'Start with street eats at The Circus before heading to a chef-led dinner downtown.',
  },
  {
    title: 'Beachside brunch',
    detail: 'Book a late brunch along Frigate Bay or Cockleshell Beach for relaxed island vibes.',
  },
  {
    title: 'Rum & spice pairing',
    detail: 'Sample local rums with island pepper sauces and plantain sides.',
  },
];

export default function RestaurantsPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-900 via-primary to-slate-900 p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Things to Do
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Restaurants worth planning your itinerary around.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Enjoy the island’s signature flavors, from harbor grills to sunset dining rooms.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            {restaurants.map((restaurant) => (
              <article
                key={restaurant.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {restaurant.name}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {restaurant.cuisine}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {restaurant.description}
                </p>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Signature foodie moments
              </h3>
              <div className="mt-4 space-y-4">
                {foodieMoments.map((moment) => (
                  <div key={moment.title} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {moment.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {moment.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Local flavors to try
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {['Goat water stew', 'Johnny cakes', 'Fresh mahi-mahi', 'Tamarind glaze ribs'].map(
                  (item) => (
                    <li key={item} className="rounded-2xl bg-slate-50 px-4 py-2">
                      {item}
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
