const STORAGE_KEY = "stKittsVisitorType";

const VARIANTS = {
  "first-time": {
    label: "First-Time Visitor",
    heroTitle: "Discover Your Caribbean Paradise",
    heroCopy:
      "Let St Kitts sweep you away with lush rainforests, volcanic peaks, and turquoise shores crafted for unforgettable first moments.",
    heroCta: "Start Planning Your Adventure",
    heroImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Mountain and coastline view of the Caribbean",
    highlights: ["Why St Kitts", "Photo Galleries", "Island Essentials"],
    sectionTitle: "Why St Kitts",
    sectionCopy:
      "From scenic rail journeys to vibrant beach culture, the island is a mosaic of adventure, flavor, and heritage.",
    cards: [
      {
        title: "Inspiration Gallery",
        copy: "Capture sunrise viewpoints, secluded coves, and rainforest escapes.",
      },
      {
        title: "Signature Experiences",
        copy: "Hike Mount Liamuiga, ride the heritage railway, and snorkel reef lagoons.",
      },
      {
        title: "Plan with Confidence",
        copy: "Seasonal tips, event highlights, and curated stays for first-time guests.",
      },
    ],
  },
  cruise: {
    label: "Cruise Visitor",
    heroTitle: "Make the Most of Your Port Day",
    heroCopy:
      "Step off the ship into a tropical playground of quick adventures, iconic sights, and flavorful local stops just minutes away.",
    heroCta: "Book Your Shore Excursion",
    heroImage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Cruise ship near a tropical island",
    highlights: ["Half-Day Tours", "Nearby Attractions", "Port Guides"],
    sectionTitle: "Port Day Favorites",
    sectionCopy:
      "Maximize every hour with curated shore excursions and easy-to-reach highlights.",
    cards: [
      {
        title: "Scenic Rail + Beach",
        copy: "Combine coastal rail views with a refreshing beach escape.",
      },
      {
        title: "History in a Half-Day",
        copy: "Visit Brimstone Hill and charming Basseterre in one loop.",
      },
      {
        title: "Taste of St Kitts",
        copy: "Local rum tastings, spice markets, and Caribbean cuisine stops.",
      },
    ],
  },
  returning: {
    label: "Returning Visitor",
    heroTitle: "Welcome Back to St Kitts",
    heroCopy:
      "We saved your island favorites and curated what's new since your last visit—fresh stays, fresh flavors, and fresh adventures.",
    heroCta: "Continue Your Itinerary",
    heroImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Tropical forest and hills",
    highlights: ["Saved Itineraries", "New Openings", "Local Events"],
    sectionTitle: "New Since Your Last Visit",
    sectionCopy:
      "Check out newly opened resorts, culinary pop-ups, and curated island events.",
    cards: [
      {
        title: "Refreshed Itineraries",
        copy: "Pick up where you left off or build a new multi-day escape.",
      },
      {
        title: "What's New",
        copy: "Discover boutique stays, wellness retreats, and chef-led tasting rooms.",
      },
      {
        title: "Local Insider Picks",
        copy: "Seasonal festivals and cultural celebrations worth a repeat visit.",
      },
    ],
  },
  romance: {
    label: "Romance Seeker",
    heroTitle: "Say 'I Do' in Paradise",
    heroCopy:
      "Celebrate love with oceanfront vows, candlelit dinners, and serene escapes made for two.",
    heroCta: "Request Wedding Information",
    heroImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Couple enjoying a sunset view",
    highlights: ["Wedding Venues", "Romantic Packages", "Couple Adventures"],
    sectionTitle: "Romance & Weddings",
    sectionCopy:
      "Find dreamy venues, curated packages, and unforgettable couple experiences.",
    cards: [
      {
        title: "Oceanfront Venues",
        copy: "Private villas, beachside chapels, and sunset ceremony decks.",
      },
      {
        title: "Romantic Packages",
        copy: "Spa rituals, private dining, and bespoke island surprises.",
      },
      {
        title: "Couple Experiences",
        copy: "Catamaran sails, scenic hikes, and champagne beach picnics.",
      },
    ],
  },
};

const elements = {
  root: document.getElementById("personalizationRoot"),
  select: document.getElementById("visitorType"),
  heroTitle: document.getElementById("heroTitle"),
  heroCopy: document.getElementById("heroCopy"),
  heroCta: document.getElementById("heroCta"),
  heroImage: document.getElementById("heroImage"),
  heroHighlights: document.getElementById("heroHighlights"),
  personalizedTitle: document.getElementById("personalizedTitle"),
  personalizedCopy: document.getElementById("personalizedCopy"),
  personalizedCards: document.getElementById("personalizedCards"),
};

const getStoredType = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && VARIANTS[stored] ? stored : "first-time";
};

const storeType = (type) => {
  localStorage.setItem(STORAGE_KEY, type);
};

const renderHighlights = (highlights) => {
  elements.heroHighlights.innerHTML = "";
  highlights.forEach((item) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = item;
    elements.heroHighlights.appendChild(pill);
  });
};

const renderCards = (cards) => {
  elements.personalizedCards.innerHTML = "";
  cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = "card";

    const title = document.createElement("h4");
    title.textContent = card.title;

    const copy = document.createElement("p");
    copy.textContent = card.copy;

    article.appendChild(title);
    article.appendChild(copy);
    elements.personalizedCards.appendChild(article);
  });
};

const applyVariant = (type) => {
  const variant = VARIANTS[type] || VARIANTS["first-time"];

  elements.heroTitle.textContent = variant.heroTitle;
  elements.heroCopy.textContent = variant.heroCopy;
  elements.heroCta.textContent = variant.heroCta;
  elements.heroImage.src = variant.heroImage;
  elements.heroImage.alt = variant.heroAlt;
  elements.personalizedTitle.textContent = variant.sectionTitle;
  elements.personalizedCopy.textContent = variant.sectionCopy;

  renderHighlights(variant.highlights);
  renderCards(variant.cards);
};

const transitionUpdate = (type) => {
  elements.root.classList.add("is-transitioning");
  window.setTimeout(() => {
    applyVariant(type);
    window.requestAnimationFrame(() => {
      elements.root.classList.remove("is-transitioning");
    });
  }, 200);
};

const init = () => {
  const currentType = getStoredType();
  elements.select.value = currentType;
  applyVariant(currentType);

  elements.select.addEventListener("change", (event) => {
    const newType = event.target.value;
    storeType(newType);
    transitionUpdate(newType);
  });
};

init();
