import Link from 'next/link';

export default function ThingsToDoPage() {
  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">Things to Do</h1>
          <p className="mt-3 text-sm text-slate-600">
            Explore activities, food, and memorable experiences across St Kitts from one simple starting point.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            href="/attractions"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-0.5 hover:border-primary hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-900">Attractions</h2>
            <p className="mt-2 text-sm text-slate-600">
              Discover iconic landmarks, scenic spots, and adventures around the island.
            </p>
          </Link>

          <Link
            href="/restaurants"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-0.5 hover:border-primary hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-900">Restaurants &amp; Food</h2>
            <p className="mt-2 text-sm text-slate-600">
              Find places to eat and taste local flavors, from casual bites to waterfront dining.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
