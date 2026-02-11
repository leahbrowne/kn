"use client";

import attractions from "@/data/attractions.json";
import restaurants from "@/data/restaurants.json";
import { useInstallPrompt } from "@/lib/hooks/useInstallPrompt";

type Attraction = {
  id: string;
  name: string;
  description: string;
  category: string;
};

type Restaurant = {
  slug: string;
  name: string;
  description: string;
  region: string;
};

type HubItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "attraction" | "restaurant";
};

const attractionItems = attractions as Attraction[];
const restaurantItems = restaurants as Restaurant[];

const mixedFeed: HubItem[] = [
  ...attractionItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category,
    type: "attraction" as const,
  })),
  ...restaurantItems.map((item) => ({
    id: item.slug,
    name: item.name,
    description: item.description,
    category: item.region,
    type: "restaurant" as const,
  })),
];

const getTags = (item: HubItem) => {
  const text = `${item.name} ${item.description} ${item.category}`.toLowerCase();
  const tags: string[] = [];

  if (
    text.includes("romantic") ||
    text.includes("couple") ||
    text.includes("sunset") ||
    text.includes("beach") ||
    text.includes("intimate")
  ) {
    tags.push("romantic");
  }

  if (item.type === "restaurant") {
    tags.push("food");
  }

  return tags;
};

const romanticIdeas = mixedFeed.filter((item) => getTags(item).includes("romantic"));
const popularRightNow = [
  ...attractionItems.slice(0, 3).map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category,
    type: "attraction" as const,
  })),
  ...restaurantItems.slice(0, 3).map((item) => ({
    id: item.slug,
    name: item.name,
    description: item.description,
    category: item.region,
    type: "restaurant" as const,
  })),
];

const foodSpots = mixedFeed.filter((item) => item.type === "restaurant");

export default function ThingsToDoPage() {
  const { promptInstall } = useInstallPrompt();

  const handleInstall = async () => {
    const result = await promptInstall();
    if (result?.outcome === "ios") {
      window.alert(result.message);
    }
  };

  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-primary via-sky-700 to-slate-900 p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Things to Do
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">Enjoy St Kitts</h1>
          <p className="mt-4 text-lg text-white/85">
            Discover curated experiences, island dining, and smart trip ideas in one place.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <a className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg" href="/things-to-do/attractions">
            <h2 className="text-xl font-semibold text-slate-900">Explore Experiences</h2>
            <p className="mt-2 text-sm text-slate-600">Discover iconic places and scenic highlights around the island.</p>
          </a>
          <a className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg" href="/things-to-do/restaurants">
            <h2 className="text-xl font-semibold text-slate-900">Eat &amp; Drink</h2>
            <p className="mt-2 text-sm text-slate-600">Find waterfront grills, local kitchens, and date-night dining spots.</p>
          </a>
          <a className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg" href="/plan-your-trip">
            <h2 className="text-xl font-semibold text-slate-900">Plan My Trip</h2>
            <p className="mt-2 text-sm text-slate-600">Jump into itinerary planning, chat support, and travel guidance.</p>
          </a>
          <button className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-lg" onClick={handleInstall} type="button">
            <h2 className="text-xl font-semibold text-slate-900">Install the App</h2>
            <p className="mt-2 text-sm text-slate-600">Add the St Kitts guide to your home screen for quick offline access.</p>
          </button>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900">Curated Feed</h2>
          <p className="mt-2 text-sm text-slate-600">A mixed stream of attractions and food discoveries.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {mixedFeed.map((item) => (
              <article key={item.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category: {item.category}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">Romantic Ideas</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {romanticIdeas.map((item) => (
                <li key={`romantic-${item.id}`} className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.type}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">Popular Right Now</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {popularRightNow.map((item) => (
                <li key={`popular-${item.id}`} className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.type}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">Food Spots</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {foodSpots.map((item) => (
                <li key={`food-${item.id}`} className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.category}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
