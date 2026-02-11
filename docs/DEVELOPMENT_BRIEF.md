# St Kitts Tourism PWA Demo - Development Brief

## Project Overview

Build a **working demo** of a modernized St Kitts Tourism website that showcases a Progressive Web App (PWA) architecture with innovative features. This demo will be presented as part of a proposal to win the St Kitts Tourism Authority website modernization contract.

**Key Objective**: Demonstrate technical excellence and innovative features that competitors won't have.

**Current Website**: https://www.visitstkitts.com  
**Target Audience**: St Kitts Tourism Authority decision-makers

---

## Core Architecture

### Technology Stack

**Frontend (PWA)**:
- Framework: Next.js 14+ (App Router) with React 18+
- Styling: Tailwind CSS
- PWA: next-pwa plugin
- State Management: React Context or Zustand
- Maps: Mapbox GL JS or Google Maps API
- Icons: Lucide React

**Backend/CMS (Simulated for Demo)**:
- For this demo, use static JSON files to simulate a headless WordPress API
- Structure data as if it's coming from WordPress REST API endpoints
- Include example data models that match WordPress post types

**Hosting for Demo**:
- Vercel (free tier) for easy deployment and sharing
- Public URL for stakeholders to test

---

## Feature Requirements

### 1. Progressive Web App Capabilities

**Must Have**:
- ✅ Installable (Add to Home Screen)
- ✅ Offline capability for key pages
- ✅ Service worker with caching strategy
- ✅ Fast loading (target <2s FCP)
- ✅ Responsive design (mobile-first)

**Implementation**:
```javascript
// In next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  // ... other config
})
```

**Offline Pages to Cache**:
- Homepage
- Things to Do page
- Plan Your Trip page
- Saved itineraries
- FAQs

**Show offline indicator** when user loses connection.

---

### 2. Personalisation Engine ⭐ PRIORITY FEATURE

**Goal**: Show different content based on visitor type and behavior.

**Visitor Segments to Demonstrate**:

1. **First-Time Visitor**
   - Hero: "Discover Your Caribbean Paradise"
   - Focus: Inspiration content, photo galleries, "Why St Kitts" section
   - CTA: "Start Planning Your Adventure"

2. **Cruise Visitor**
   - Hero: "Make the Most of Your Port Day"
   - Focus: Shore excursions, half-day tours, nearby attractions
   - CTA: "Book Your Shore Excursion"

3. **Returning Visitor**
   - Hero: "Welcome Back to St Kitts"
   - Show: Previously saved itineraries, new since last visit
   - CTA: "Continue Your Itinerary"

4. **Wedding/Romance Seeker**
   - Hero: "Say 'I Do' in Paradise"
   - Focus: Wedding venues, romantic packages, couple activities
   - CTA: "Request Wedding Information"

**Technical Implementation**:

```javascript
// Store in localStorage or cookie
const visitorProfile = {
  type: 'first-time' | 'cruise' | 'returning' | 'romance',
  visitCount: number,
  interests: ['beaches', 'culture', 'food', 'adventure'],
  lastVisit: timestamp,
  savedItineraries: []
}

// Personalization rules engine
const getPersonalizedContent = (profile, page) => {
  // Return different hero images, copy, CTAs based on profile
}
```

**Demo Feature**: Add a **"View As" toggle** in the corner so stakeholders can switch between visitor types and see the personalization in action.

---

### 3. Assistant Conversational Trip Planner ⭐ PRIORITY FEATURE

**Two Modes**:

#### Mode 1: Quick Form-Based Planner
Simple form with dropdowns:
- How long is your stay? (1-3 days, 4-7 days, 1-2 weeks)
- What are you interested in? (Beaches, Culture, Food, Adventure, Romance)
- Travel style? (Relaxed, Moderate, Packed)
- Accommodation type? (All-inclusive, Boutique hotel, Villa)

Output: Pre-built itinerary template

#### Mode 2: Assistant-Powered Conversational Planner ⭐ SHOWCASE THIS
Chat-style interface powered by Claude API (use Anthropic API).

**Conversation Flow**:
```
Assistant: "Hi! I'm your St Kitts travel guide. Let me help you create the perfect itinerary. 
     First, how many days will you be visiting?"

User: "4 days"

Assistant: "Great! 4 days gives us time to see the highlights. What brings you to St Kitts? 
     Are you looking for relaxation, adventure, cultural experiences, or a mix?"

User: "I love food and history"

Assistant: "Perfect! St Kitts has an amazing food scene and rich colonial history. I'll create 
     an itinerary featuring historic sites and the best local restaurants. Would you 
     like to include any specific activities like snorkeling, hiking, or beach time?"

User: "Some beach time but mostly interested in the food and historic sites"

Assistant: [Generates personalized day-by-day itinerary]
```

**Assistant Implementation** (Use Anthropic Claude API):
```javascript
// System prompt for Claude
const systemPrompt = `You are a knowledgeable St Kitts tourism guide. 
Your role is to ask clarifying questions and create personalized itineraries 
based on visitor preferences. 

Available data:
- Attractions: ${JSON.stringify(attractions)}
- Restaurants: ${JSON.stringify(restaurants)}
- Hotels: ${JSON.stringify(hotels)}
- Events: ${JSON.stringify(events)}

Create day-by-day itineraries in this JSON format:
{
  "days": [
    {
      "day": 1,
      "title": "Colonial Heritage & Coastal Cuisine",
      "activities": [
        {
          "time": "9:00 AM",
          "duration": "2 hours",
          "name": "Brimstone Hill Fortress",
          "type": "attraction",
          "description": "...",
          "location": { "lat": 17.341, "lng": -62.695 }
        }
      ]
    }
  ]
}`

// Frontend component
const [messages, setMessages] = useState([])
const [itinerary, setItinerary] = useState(null)

const sendMessage = async (userMessage) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        ...messages,
        { role: 'user', content: userMessage }
      ],
      system: systemPrompt
    })
  })
  
  // Parse response and update UI
}
```

**Itinerary Output Features**:
- ✅ Day-by-day breakdown with times
- ✅ Interactive map showing route
- ✅ Estimated travel times between activities
- ✅ Restaurant recommendations with cuisine type
- ✅ "Save Itinerary" button (stores in localStorage)
- ✅ "Share via Email" or "Download PDF" options
- ✅ "Book Activities" integration points

**Show Travel Mode**: Walking, driving, or mixed

---

### 4. Assistant-Powered Chatbot (Site-Wide Assistant)

**Purpose**: Answer questions about St Kitts tourism in real-time.

**Knowledge Base** (Embed in system prompt):
- Visa requirements by country
- Best beaches for snorkeling, families, quiet time
- Transportation options (taxis, car rentals, water taxis)
- Weather by season
- Popular activities and their costs
- Dining recommendations by cuisine type
- Airport information
- Currency and tipping customs

**UI/UX**:
- Floating chat bubble in bottom right corner
- Opens to chat interface
- Show typing indicator
- Support markdown in responses
- Include quick action buttons: "Plan a Trip", "Find Restaurants", "Beach Recommendations"

**Implementation**:
```javascript
const ChatBot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about visiting St Kitts.' }
  ])

  const sendMessage = async (query) => {
    // Call Anthropic API with St Kitts knowledge base
    // System prompt includes all FAQ data, attractions, restaurants, etc.
  }

  return (
    <>
      <FloatingButton onClick={() => setOpen(true)}>
        <MessageCircle /> Ask Me Anything
      </FloatingButton>
      {open && <ChatInterface messages={messages} onSend={sendMessage} />}
    </>
  )
}
```

---

### 5. Strategic Insights Dashboard (Admin View)

**Purpose**: Show stakeholders how they'll gain valuable first-party data.

**Create a `/admin/insights` route** (password protected for demo: `stkitts2026`)

**Dashboard Sections**:

1. **Visitor Analytics**
   - Total visitors (last 30 days)
   - New vs returning
   - Geographic distribution (top countries)
   - Device breakdown (mobile/desktop)

2. **Itinerary Intelligence**
   - Most saved attractions
   - Popular activity combinations
   - Average trip length
   - Peak travel interests by season

3. **Search Trends**
   - Top chatbot queries
   - Trending destinations/activities
   - Unanswered questions (improvement opportunities)

4. **Engagement Metrics**
   - Pages per session
   - Trip planner completion rate
   - Email captures
   - Itinerary shares

5. **Content Performance**
   - Most viewed pages
   - Highest engagement content
   - Bounce rates by page type

**Implementation** (Simulated Data for Demo):
```javascript
const mockInsights = {
  visitors: {
    total: 45234,
    new: 32156,
    returning: 13078,
    topCountries: ['USA', 'UK', 'Canada', 'Germany'],
  },
  itineraries: {
    mostSaved: [
      { name: 'Brimstone Hill Fortress', saves: 3421 },
      { name: 'Cockleshell Beach', saves: 2987 },
      { name: 'St Kitts Scenic Railway', saves: 2654 }
    ],
    popularCombinations: [
      ['Beach Day', 'Sunset Dinner', 'Snorkeling'],
      ['Historic Sites', 'Rum Tour', 'Local Cuisine']
    ]
  },
  searches: {
    topQueries: [
      'best snorkeling spots',
      'visa requirements',
      'beach wedding venues',
      'romantic restaurants'
    ]
  }
}
```

**Charts**: Use Recharts or Chart.js for visualizations.

---

### 6. Structured Data & SEO Optimization ⭐ KEY DIFFERENTIATOR

**Goal**: Make St Kitts the easiest destination to discover via Google and Assistant search.

**Schema Types to Implement**:

1. **TouristDestination** (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "St Kitts",
  "description": "A Caribbean paradise...",
  "image": "...",
  "touristType": ["Beach Lovers", "History Enthusiasts", "Foodies"],
  "includesAttraction": [...]
}
```

2. **TouristAttraction** (Each attraction page)
```json
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Brimstone Hill Fortress",
  "description": "...",
  "image": "...",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.341",
    "longitude": "-62.695"
  },
  "openingHours": "Mo-Su 09:00-17:00",
  "isAccessibleForFree": false,
  "publicAccess": true
}
```

3. **Restaurant** (Each restaurant)
```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Marshall's",
  "servesCuisine": "Caribbean",
  "priceRange": "$$",
  "address": {...},
  "aggregateRating": {...}
}
```

4. **Event** (Events page)
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "St Kitts Music Festival",
  "startDate": "2026-06-25",
  "endDate": "2026-06-27",
  "location": {...}
}
```

5. **FAQPage** (FAQ section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a visa to visit St Kitts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

**Add a section on demo site**: `/seo-preview` that shows:
- How a page would appear in Google search results
- How the structured data would appear in Google Travel
- Example of how Assistant assistants would cite the information

---

## Content Structure & Data Models

### Based on Current Sitemap

Create these **core page types** with realistic content:

#### 1. Homepage
- Hero section (personalized)
- Featured attractions (3-4 cards)
- Quick trip planner CTA
- Popular experiences grid
- Latest news/events
- Call-to-action sections

#### 2. Things to Do
**Subcategories**:
- Attractions
- Restaurants
- Events

**Attraction Data Model**:
```javascript
{
  id: 'brimstone-hill-fortress',
  name: 'Brimstone Hill Fortress',
  slug: 'brimstone-hill-fortress',
  category: 'Historical Site',
  description: 'UNESCO World Heritage Site...',
  shortDescription: 'Historic fortress with panoramic views',
  images: ['url1', 'url2', 'url3'],
  location: {
    lat: 17.341,
    lng: -62.695,
    address: 'Main Road, St. Paul Capisterre Parish'
  },
  hours: 'Monday-Sunday: 9:00 AM - 5:00 PM',
  pricing: {
    adult: 15,
    child: 8,
    currency: 'USD'
  },
  duration: '2-3 hours',
  bestFor: ['History Buffs', 'Photographers', 'Families'],
  features: ['UNESCO Site', 'Guided Tours', 'Gift Shop'],
  nearbyAttractions: ['romney-manor', 'old-road-town']
}
```

**Restaurant Data Model**:
```javascript
{
  id: 'marshalls',
  name: "Marshall's",
  cuisine: ['Caribbean', 'Seafood'],
  priceRange: '$$',
  location: {...},
  hours: {...},
  specialties: ['Conch Fritters', 'Grilled Lobster'],
  ambiance: 'Casual Beachfront',
  images: [...],
  averageRating: 4.7,
  dietaryOptions: ['Vegetarian', 'Gluten-Free Options']
}
```

#### 3. Stay (Accommodations)
- Hotels
- Resorts
- Villas
- Boutique properties

**Hotel Data Model**:
```javascript
{
  id: 'marriott-resort',
  name: 'St Kitts Marriott Resort',
  type: 'Resort',
  starRating: 4,
  location: {...},
  amenities: ['Beach Access', 'Pool', 'Spa', 'Casino'],
  roomTypes: [...],
  priceRange: '$200-$500/night',
  images: [...],
  bestFor: ['Families', 'Golf', 'Beach Lovers']
}
```

#### 4. Plan Your Trip
- Interactive Map
- Sample Itineraries (3-day, 5-day, 7-day)
- Getting Around
- FAQ
- Travel Deals

#### 5. Romance (Weddings & Honeymoons)
- Wedding venues
- Romantic experiences
- Honeymoon packages

---

## Sample Content to Include

### Create Content for These Specific Pages (From Sitemap):

**Top Priority Pages** (Must be fully functional):
1. Homepage (`/`)
2. Things to Do - Attractions (`/things-to-do/attractions`)
3. Things to Do - Restaurants (`/things-to-do/restaurants`)
4. Plan Your Trip - Itinerary Builder (`/plan-your-trip/itinerary`)
5. About St Kitts (`/about`)

**Secondary Pages** (Can be simpler):
6. Stay (`/stay`)
7. Events (`/things-to-do/events`)
8. FAQ (`/plan-your-trip/faq`)

**Include These Specific Locations** (from sitemap):

**Attractions**:
- Brimstone Hill Fortress (UNESCO site)
- St Kitts Scenic Railway
- Romney Manor & Caribelle Batik
- Mount Liamuiga (volcano hike)
- Historical sites in Basseterre

**Beaches**:
- Cockleshell Beach
- South Friars Bay
- Frigate Bay
- Timothy Beach

**Restaurants**:
- Marshall's
- Vibes Beach Bar
- Carambola Beach Club
- Sunset Cafe
- Fisherman's Village

**Events**:
- St Kitts Music Festival (June)
- Restaurant Week
- Carnival

---

## UI/UX Design Guidelines

### Visual Design

**Color Palette** (Based on Caribbean/St Kitts branding):
```css
:root {
  --primary: #00A3E0; /* Ocean blue */
  --secondary: #FDB913; /* Sunshine yellow */
  --accent: #00B140; /* Tropical green */
  --neutral-900: #1A1A1A;
  --neutral-100: #F5F5F5;
  --white: #FFFFFF;
}
```

**Typography**:
- Headings: Inter or Poppins (bold, modern)
- Body: Inter or Open Sans (clean, readable)
- Accent: Playfair Display (elegant, for hero text)

**Image Guidelines**:
- Use high-quality Caribbean imagery (beaches, culture, food)
- Hero images should be 1920x1080 minimum
- Lazy loading for performance
- WebP format with fallbacks

**Component Library**:
Create reusable components:
- `Card` (attraction card, restaurant card)
- `Hero` (with personalized variants)
- `CTAButton` (primary, secondary, ghost)
- `FilterBar` (for browsing attractions/restaurants)
- `MapView` (Mapbox with custom markers)
- `ItineraryDay` (collapsible day-by-day view)
- `ChatMessage` (for chatbot and trip planner)

### Key UX Principles

1. **Mobile-First**: 70% of tourism traffic is mobile
2. **Fast Loading**: Target <2s for initial load
3. **Intuitive Navigation**: Max 3 clicks to any page
4. **Clear CTAs**: Every page should have obvious next steps
5. **Accessible**: WCAG 2.2 AA compliance
   - Proper heading hierarchy
   - Alt text for images
   - Keyboard navigation
   - Color contrast ratios
   - Focus indicators

### Navigation Structure

```
Header (Sticky):
├── About St Kitts
├── Things to Do
│   ├── Attractions
│   ├── Restaurants
│   └── Events
├── Stay
├── Plan Your Trip
│   ├── Trip Planner ⭐
│   ├── Itineraries
│   ├── Getting Around
│   └── FAQ
└── Romance

Footer:
├── Contact
├── Media/Press
├── Travel Professionals
├── Diaspora Program
└── Social Links
```

**Floating Elements**:
- Chatbot button (bottom right)
- "Plan Trip" quick action (mobile bottom nav)

---

## Interactive Features

### 1. Interactive Map

**Use**: Mapbox GL JS

**Features**:
- Custom markers for attractions, restaurants, hotels
- Cluster markers when zoomed out
- Click marker to see details popup
- Filter by category (beaches, historical sites, dining)
- "Get Directions" integration
- "Add to Itinerary" button on each location
- Show user's planned route if itinerary exists

**Implementation**:
```javascript
import mapboxgl from 'mapbox-gl'

const Map = ({ attractions }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-62.717, 17.320], // St Kitts center
      zoom: 11
    })

    attractions.forEach(attraction => {
      new mapboxgl.Marker({ color: '#00A3E0' })
        .setLngLat([attraction.location.lng, attraction.location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3>${attraction.name}</h3>
          <p>${attraction.shortDescription}</p>
          <button>Add to Itinerary</button>
        `))
        .addTo(map)
    })
  }, [])

  return <div id="map" style={{ height: '500px', width: '100%' }} />
}
```

### 2. Filter & Sort System

**For Attractions/Restaurants pages**:
- Category filter (chips)
- Price range filter ($ to $$$)
- Sort by: Popularity, Rating, Price, Distance
- Search bar
- "View: Grid | List | Map"

### 3. Saved Items & Itineraries

**localStorage-based for demo**:
```javascript
const useItinerary = () => {
  const [itinerary, setItinerary] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('st-kitts-itinerary')
    if (saved) setItinerary(JSON.parse(saved))
  }, [])

  const addToItinerary = (activity, day) => {
    const updated = [...itinerary, { activity, day, addedAt: Date.now() }]
    setItinerary(updated)
    localStorage.setItem('st-kitts-itinerary', JSON.stringify(updated))
  }

  return { itinerary, addToItinerary }
}
```

**Show**:
- Floating "Itinerary" button with count badge
- Slide-out panel to review saved items
- Organize by day
- Export options (PDF, Email)

---

## Performance Optimization

### Targets
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s
- Lighthouse Score: 90+ (all categories)

### Implementation
- ✅ Image optimization (next/image)
- ✅ Code splitting by route
- ✅ Lazy load below-the-fold content
- ✅ Minimize third-party scripts
- ✅ Service worker caching
- ✅ Prefetch critical assets
- ✅ CDN for images (Cloudinary or ImgIX)

---

## Offline Functionality

**Demonstrate PWA Power**:

1. **Add to Home Screen**
   - Show install prompt on first visit
   - Custom app icon and splash screen

2. **Offline Pages**
   - Cache these pages for offline viewing:
     * Homepage
     * Things to Do
     * Saved itineraries
     * FAQ
   - Show offline indicator: "You're viewing cached content"

3. **Offline Form Submissions**
   - Queue form submissions when offline
   - Sync when connection returns
   - Show "Will send when online" message

**manifest.json**:
```json
{
  "name": "Visit St Kitts",
  "short_name": "St Kitts",
  "description": "Your guide to paradise in St Kitts",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#00A3E0",
  "theme_color": "#00A3E0",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## Technical Requirements Checklist

### Must-Have for Demo:

**Architecture**:
- [ ] Next.js 14+ with App Router
- [ ] PWA configured (installable, service worker)
- [ ] Tailwind CSS styling
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Vercel deployment with public URL

**Core Features**:
- [ ] Personalization engine (4 visitor types)
- [ ] "View As" toggle for demo purposes
- [ ] Assistant Trip Planner (conversational mode with Claude API)
- [ ] Form-based quick planner (fallback)
- [ ] Assistant Chatbot (site-wide)
- [ ] Interactive map (Mapbox)
- [ ] Save itineraries (localStorage)
- [ ] Insights dashboard (admin route)

**Content**:
- [ ] Homepage (with personalization variants)
- [ ] 5+ attraction pages with full details
- [ ] 5+ restaurant pages
- [ ] 3+ hotel pages
- [ ] 2+ sample itineraries
- [ ] FAQ page (with 10+ questions)
- [ ] About St Kitts page

**SEO & Structured Data**:
- [ ] Schema.org markup (5+ types)
- [ ] Open Graph tags
- [ ] XML sitemap
- [ ] robots.txt
- [ ] /seo-preview page to showcase

**Performance**:
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Service worker caching
- [ ] Lighthouse score 85+

**UX**:
- [ ] Smooth animations (Framer Motion)
- [ ] Loading states
- [ ] Error boundaries
- [ ] Toast notifications
- [ ] Accessible (keyboard nav, ARIA labels)

---

## Demo Presentation Features

### Special Demo Tools

**1. "View As" Visitor Type Toggle**
Add a floating control (top right) for stakeholders:
```jsx
<select onChange={switchVisitorType}>
  <option value="first-time">First-Time Visitor</option>
  <option value="cruise">Cruise Visitor</option>
  <option value="returning">Returning Visitor</option>
  <option value="romance">Romance/Wedding</option>
</select>
```

**2. "Show Structured Data" Button**
On attraction/restaurant pages, add a button that opens a modal showing the JSON-LD schema for that page.

**3. Admin Dashboard Access**
- URL: `/admin/insights`
- Password: `stkitts2026`
- Show real-time simulated analytics

**4. Feature Tour**
On first visit, offer a guided tour:
- "Try installing as an app"
- "Ask the chatbot a question"
- "Create a personalized itinerary"
- "See how content changes for different visitors"

---

## Content Generation Guidelines

### Assistant-Generated Content Notes

**For this demo**, content can be Assistant-generated but should be:
- Realistic and factually accurate for St Kitts
- Professionally written (tourism copywriting style)
- Diverse in tone (inspirational for some, practical for others)
- Properly attributed (use real business names from sitemap)

**Example Tone**:
```
❌ Generic: "Visit our beautiful beaches"
✅ Compelling: "Sink your toes into the powdery white sand of Cockleshell Beach, 
    where twin volcanic peaks frame a perfect Caribbean sunset."
```

### Image Assets

**For demo purposes**, use:
- Unsplash (search: "caribbean beach", "tropical island", "historic fortress")
- Pexels (free stock photos)
- Placeholder images from Cloudinary or Lorem Picsum

**Required Images**:
- 10+ hero images (various scenes)
- 5+ attraction photos per location
- 5+ restaurant/food photos
- 3+ hotel/accommodation photos
- 2+ event/festival photos

---

## Testing Checklist

Before sharing the demo:

**Device Testing**:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Desktop (Chrome, Safari, Firefox)
- [ ] Tablet (iPad)

**Feature Testing**:
- [ ] PWA install prompt appears
- [ ] Offline mode works
- [ ] Personalization switches correctly
- [ ] Trip planner generates valid itineraries
- [ ] Chatbot responds to common questions
- [ ] Map markers clickable
- [ ] Forms submit successfully
- [ ] Itinerary saves persist

**Performance Testing**:
- [ ] Run Lighthouse audit
- [ ] Test on slow 3G connection
- [ ] Check page load times
- [ ] Verify images load efficiently

**Accessibility Testing**:
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG
- [ ] Focus indicators visible

---

## Deployment Instructions

**Vercel Deployment**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Custom domain (optional)
# Set up: st-kitts-demo.vercel.app
```

**Environment Variables** (set in Vercel):
```
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

**Share with Stakeholders**:
- Public URL: `https://st-kitts-demo.vercel.app`
- Include QR code in proposal for mobile testing
- Demo video (3-5 min screencast)

---

## Success Metrics

This demo should prove:

1. **Technical Excellence**
   - Lighthouse scores 90+
   - Works offline
   - Installable as app

2. **Innovation**
   - Assistant trip planning no competitor has
   - Personalization that adapts to visitors
   - First-party data insights

3. **Practical Value**
   - Easy content management (simulated CMS)
   - Actionable analytics dashboard
   - Conversion-focused design

4. **Competitive Differentiation**
   - Only vendor with working Assistant features
   - Only vendor showing structured data strategy
   - Only vendor with full PWA implementation

---

## Timeline Estimate

**Realistic Build Time**: 40-60 hours

**Breakdown**:
- Setup & Architecture: 4 hours
- Core Pages & Routing: 8 hours
- Data Models & Content: 6 hours
- Personalization Engine: 6 hours
- Assistant Trip Planner: 10 hours
- Assistant Chatbot: 6 hours
- Interactive Map: 4 hours
- Insights Dashboard: 6 hours
- SEO & Structured Data: 4 hours
- Styling & Responsive: 6 hours
- Testing & Deployment: 4 hours

**Rush Timeline**: Can be done in 2-3 focused days if needed.

---

## Priority Order

If time is limited, build in this order:

**Phase 1 (Must Have)**:
1. Homepage with personalization
2. Trip planner (Assistant mode)
3. Attractions listing + detail pages
4. Basic chatbot

**Phase 2 (Should Have)**:
5. Restaurants page
6. Interactive map
7. Insights dashboard
8. Offline mode

**Phase 3 (Nice to Have)**:
9. Form-based planner
10. Events page
11. FAQ with structured data
12. Feature tour

---

## Questions for Clarification

Before starting, confirm:

1. **API Keys**: Do you have Anthropic API key and Mapbox token?
2. **Content**: Should we scrape existing St Kitts site for real content, or use Assistant-generated?
3. **Branding**: Do we have access to official St Kitts Tourism logo/brand assets?
4. **Timeline**: When is the demo needed?
5. **Scope**: Any features above we should deprioritize?

---

## Additional Resources

**St Kitts Tourism Info**:
- Current site: https://www.visitstkitts.com
- Key attractions: Brimstone Hill Fortress, Scenic Railway, beaches
- Target markets: USA, UK, Canada
- Main competition: Other Caribbean destinations

**Technical References**:
- Next.js PWA: https://github.com/shadowwalker/next-pwa
- Mapbox GL JS: https://docs.mapbox.com/mapbox-gl-js/
- Anthropic API: https://docs.anthropic.com/
- Schema.org: https://schema.org/TouristDestination

**Design Inspiration**:
- Visit Iceland: https://www.visiticeland.com
- Bermuda Tourism: https://www.gotobermuda.com
- Visit Maldives: https://visitmaldives.com

---

## Final Notes

This demo should **wow** the stakeholders by showing them:
1. A working prototype, not just mockups
2. Features competitors won't have (Assistant trip planner, personalization)
3. Strategic value (insights dashboard, structured data)
4. Modern tech done right (PWA, fast, accessible)

The goal is to make the decision easy: "Why would we choose anyone else when this vendor has already built a working demo?"

Good luck! 🚀
