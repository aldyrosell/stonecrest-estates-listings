import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { dataset, projectId } from "../projectConfig.ts";

const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "SANITY_WRITE_TOKEN is not set.\n" +
      "Copy .env.example to .env.local and paste an Editor-permission token\n" +
      "from sanity.io/manage > API > Tokens.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-25",
  token,
  useCdn: false,
});

const HERE = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_DIR = path.resolve(HERE, "../seed-images");

const assetCache = new Map<string, string>();

async function image(file: string, alt: string, decorative = false) {
  let assetId = assetCache.get(file);

  if (!assetId) {
    const buffer = await readFile(path.join(IMAGE_DIR, file));
    const asset = await client.assets.upload("image", buffer, { filename: file });
    assetId = asset._id;
    assetCache.set(file, assetId);
    console.log(`  uploaded ${file}`);
  }

  return {
    _type: "imageWithAlt",
    asset: { _type: "reference", _ref: assetId },
    alt,
    decorative,
  };
}

const keyed = <T extends object>(items: T[], prefix: string) =>
  items.map((item, index) => ({ ...item, _key: `${prefix}${index}` }));

const link = (label: string, href: string) => ({ _type: "cta", label, href });

const refs = (ids: string[], prefix: string) =>
  ids.map((id, index) => ({ _type: "reference", _ref: id, _key: `${prefix}${index}` }));

const LISTINGS = [
  {
    _id: "listing-oceanview-estate",
    title: "Modern Oceanview Estate",
    price: "$12,500,000",
    location: "Laguna Beach, CA",
    beds: 5,
    baths: 5.5,
    sqft: "7,200",
    file: "listing-oceanview-estate.webp",
  },
  {
    _id: "listing-contemporary-villa",
    title: "Contemporary Villa",
    price: "$8,950,000",
    location: "Miami, FL",
    beds: 4,
    baths: 4.5,
    sqft: "6,100",
    file: "listing-contemporary-villa.webp",
  },
  {
    _id: "listing-alpine-retreat",
    title: "Alpine Retreat",
    price: "$6,475,000",
    location: "Aspen, CO",
    beds: 5,
    baths: 4.5,
    sqft: "5,800",
    file: "listing-alpine-retreat.webp",
  },
  {
    _id: "listing-skyline-penthouse",
    title: "Skyline Penthouse",
    price: "$15,900,000",
    location: "New York, NY",
    beds: 3,
    baths: 3.5,
    sqft: "4,200",
    file: "listing-skyline-penthouse.webp",
  },
];

const ADVISORS = [
  {
    _id: "advisor-alexandra-pierce",
    name: "Alexandra Pierce",
    role: "Global Real Estate Advisor",
    location: "Los Angeles, CA",
    file: "advisor-alexandra-pierce.webp",
  },
  {
    _id: "advisor-marcus-chen",
    name: "Marcus Chen",
    role: "Luxury Property Specialist",
    location: "New York, NY",
    file: "advisor-marcus-chen.webp",
  },
  {
    _id: "advisor-isabella-romano",
    name: "Isabella Romano",
    role: "International Advisor",
    location: "London, UK",
    file: "advisor-isabella-romano.webp",
  },
  {
    _id: "advisor-daniel-whitmore",
    name: "Daniel Whitmore",
    role: "Private Client Advisor",
    location: "Miami, FL",
    file: "advisor-daniel-whitmore.webp",
  },
];

const SERVICES = [
  {
    _id: "service-buying",
    title: "Buying",
    description: "Find the perfect home with expert guidance.",
    icon: "house",
  },
  {
    _id: "service-selling",
    title: "Selling",
    description: "Strategic marketing for exceptional results.",
    icon: "tag",
  },
  {
    _id: "service-investment-advisory",
    title: "Investment Advisory",
    description: "Build and grow your real estate portfolio.",
    icon: "chart",
  },
  {
    _id: "service-relocation",
    title: "Relocation",
    description: "A seamless move, anywhere in the world.",
    icon: "pin",
  },
  {
    _id: "service-property-management",
    title: "Property Management",
    description: "Your assets, expertly cared for.",
    icon: "folder",
  },
];

const DESTINATIONS = [
  { _id: "destination-bel-air", name: "Bel Air", place: "Los Angeles", file: "destination-bel-air.webp" },
  { _id: "destination-tribeca", name: "Tribeca", place: "New York", file: "destination-tribeca.webp" },
  { _id: "destination-mayfair", name: "Mayfair", place: "London", file: "destination-mayfair.webp" },
  { _id: "destination-aspen", name: "Aspen", place: "Colorado", file: "destination-aspen.webp" },
  {
    _id: "destination-dubai-marina",
    name: "Dubai Marina",
    place: "UAE",
    file: "destination-dubai-marina.webp",
  },
];

const TESTIMONIALS = [
  {
    _id: "testimonial-samantha-caldwell",
    quote:
      "Velora Estates made our dream home a reality. Their discretion, market knowledge, and personalized approach were unmatched. Every detail was handled with care.",
    name: "Samantha Caldwell",
    location: "Beverly Hills, CA",
    file: "testimonial-samantha-caldwell.webp",
  },
  {
    _id: "testimonial-richard-tan",
    quote:
      "From our first conversation to the final closing, the Velora team was exceptional. They understood our vision and delivered beyond expectations.",
    name: "Richard Tan",
    location: "New York, NY",
    file: "testimonial-richard-tan.webp",
  },
  {
    _id: "testimonial-elena-martins",
    quote:
      "A seamless, world-class experience. Professional, insightful, and truly committed to their clients. We couldn't be happier with our new home.",
    name: "Elena Martins",
    location: "Miami, FL",
    file: "testimonial-elena-martins.webp",
  },
];

const ARTICLES = [
  {
    _id: "article-future-of-luxury-living",
    title: "The Future of Luxury Living: Trends Shaping 2026",
    date: "Apr 12, 2026",
    description:
      "Explore emerging trends, from sustainable design to global investment opportunities.",
    file: "journal-future-of-luxury-living.webp",
  },
  {
    _id: "article-choosing-the-right-location",
    title: "How to Choose the Right Location for Your Lifestyle",
    date: "Mar 28, 2026",
    description:
      "From coastal retreats to urban elegance, discover what makes a location truly exceptional.",
    file: "journal-choosing-the-right-location.webp",
  },
  {
    _id: "article-investing-in-timeless-value",
    title: "Investing in Timeless Value",
    date: "Feb 16, 2026",
    description:
      "Why luxury real estate remains one of the most resilient and rewarding investments.",
    file: "journal-investing-in-timeless-value.webp",
  },
];

type SeedDocument = { _id: string; _type: string } & Record<string, unknown>;

async function seedCollections() {
  console.log("Listings, advisors, services, destinations, testimonials, journal");

  const documents: SeedDocument[] = SERVICES.map((service) => ({
    _id: service._id,
    _type: "service",
    title: service.title,
    description: service.description,
    icon: service.icon,
    href: "#contact",
  }));

  for (const listing of LISTINGS) {
    documents.push({
      _id: listing._id,
      _type: "listing",
      title: listing.title,
      price: listing.price,
      location: listing.location,
      beds: listing.beds,
      baths: listing.baths,
      sqft: listing.sqft,
      image: await image(listing.file, `${listing.title}, ${listing.location}`),
    });
  }

  for (const advisor of ADVISORS) {
    documents.push({
      _id: advisor._id,
      _type: "advisor",
      name: advisor.name,
      role: advisor.role,
      location: advisor.location,
      image: await image(advisor.file, `Portrait of ${advisor.name}`),
      channels: keyed(
        [
          { _type: "advisorChannel", label: "LinkedIn", icon: "linkedin", href: "#contact" },
          { _type: "advisorChannel", label: "Instagram", icon: "instagram", href: "#contact" },
          { _type: "advisorChannel", label: "Email", icon: "mail", href: "#contact" },
        ],
        "channel",
      ),
    });
  }

  for (const destination of DESTINATIONS) {
    documents.push({
      _id: destination._id,
      _type: "destination",
      name: destination.name,
      place: destination.place,
      image: await image(destination.file, `${destination.name}, ${destination.place}`),
    });
  }

  for (const testimonial of TESTIMONIALS) {
    documents.push({
      _id: testimonial._id,
      _type: "testimonial",
      quote: testimonial.quote,
      name: testimonial.name,
      location: testimonial.location,
      image: await image(testimonial.file, "", true),
    });
  }

  for (const article of ARTICLES) {
    documents.push({
      _id: article._id,
      _type: "article",
      title: article.title,
      date: article.date,
      description: article.description,
      image: await image(article.file, article.title),
    });
  }

  const transaction = documents.reduce(
    (tx, document) => tx.createOrReplace(document),
    client.transaction(),
  );

  await transaction.commit();
  console.log(`  wrote ${documents.length} documents`);
}

async function seedSiteSettings() {
  console.log("Site settings");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "Velora Estates",
    legalName: "Velora Estates",
    title: "Velora Estates — Live Beyond the Expected",
    description:
      "Curated luxury residences, private advisory, and exceptional locations worldwide. Velora Estates connects discerning individuals with homes that inspire.",
    telephone: "+1 (310) 555-0123",
    email: "hello@veloraestates.com",
    address: {
      _type: "postalAddress",
      streetAddress: "9870 Wilshire Blvd",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US",
    },
    openingHours: keyed(
      [
        {
          _type: "openingHoursSpec",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      "hours",
    ),
    socials: keyed(
      [
        { _type: "socialLink", label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
        { _type: "socialLink", label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
        { _type: "socialLink", label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
        { _type: "socialLink", label: "Pinterest", href: "https://www.pinterest.com/", icon: "pinterest" },
      ],
      "social",
    ),
    monogram: "V",
    wordmarkLineOne: "VELORA",
    wordmarkLineTwo: "ESTATES",
    headerCta: link("Book a Private Tour →", "#contact"),
    tagline: "Extraordinary homes. A brighter tomorrow.",
    footerLinks: keyed(
      [
        { _type: "navItem", label: "Home", href: "#top" },
        { _type: "navItem", label: "About", href: "#top" },
        { _type: "navItem", label: "Listings", href: "#top" },
        { _type: "navItem", label: "Journal", href: "#top" },
        { _type: "navItem", label: "Communities", href: "#top" },
        { _type: "navItem", label: "Careers", href: "#top" },
        { _type: "navItem", label: "Advisors", href: "#top" },
        { _type: "navItem", label: "Contact", href: "#top" },
      ],
      "footer",
    ),
    footerContactTitle: "Contact",
    footerLinksTitle: "Quick Links",
    footerLegalLinks: keyed(
      [
        { _type: "navItem", label: "Privacy Policy", href: "#top" },
        { _type: "navItem", label: "Terms of Service", href: "#top" },
        { _type: "navItem", label: "Sitemap", href: "/sitemap.xml" },
      ],
      "legal",
    ),
    newsletterTitle: "Stay Inspired",
    newsletterBody: "Get exclusive insights, new listings, and more.",
    newsletterPlaceholder: "Enter your email address",
    newsletterSubmitLabel: "Subscribe",
    newsletterSuccess: "Thank you — you’re on the list.",
    newsletterUnconfigured: "Subscriptions aren’t connected yet. Please email us instead.",
    newsletterError: "Something went wrong. Please try again or email us.",
    nav: keyed(
      [
        { _type: "navItem", label: "Home", href: "#top" },
        { _type: "navItem", label: "Listings", href: "#listings" },
        { _type: "navItem", label: "Communities", href: "#destinations" },
        { _type: "navItem", label: "Advisors", href: "#advisors" },
        { _type: "navItem", label: "About", href: "#services" },
        { _type: "navItem", label: "Journal", href: "#journal" },
      ],
      "nav",
    ),
  });
}

async function seedHomePage() {
  console.log("Home page");

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",

    hero: {
      _type: "heroSection",
      eyebrow: "Exceptional places. A more extraordinary you.",
      heading: "Live Beyond the Expected",
      body: "Curated luxury residences. Private advisory. Exceptional locations around the world. Velora Estates connects discerning individuals with homes that inspire a richer life.",
      watchCta: link("Watch Our Story", "#journal"),
      image: await image("hero.webp", "A Velora Estates villa at dusk"),
      asideLineOne: "More than homes.",
      asideLineTwo: "A brighter tomorrow.",
      locationLabel: "Location",
      searchPlaceholder: "City, neighborhood, or country",
      searchCtaLabel: "Explore Listings →",
      filters: keyed(
        [
          {
            _type: "searchFilter",
            label: "Property Type",
            options: ["Any type", "Villa", "Penthouse", "Estate", "Chalet"],
          },
          {
            _type: "searchFilter",
            label: "Budget",
            options: ["Any budget", "$2M – $5M", "$5M – $10M", "$10M+"],
          },
          {
            _type: "searchFilter",
            label: "Bedrooms",
            options: ["Any", "2+", "3+", "4+", "5+"],
          },
        ],
        "filter",
      ),
    },

    features: {
      _type: "featuresSection",
      items: keyed(
        [
          { _type: "feature", title: "Private Advisory", description: "A personalized approach", icon: "heart" },
          { _type: "feature", title: "Global Network", description: "Local experts. Worldwide reach.", icon: "globe" },
          { _type: "feature", title: "Off-Market Access", description: "Exclusive opportunities.", icon: "shield" },
          { _type: "feature", title: "Concierge Support", description: "From search to settlement.", icon: "user" },
        ],
        "feature",
      ),
    },

    listings: {
      _type: "listingsSection",
      eyebrow: "Featured residences",
      heading: "Extraordinary Homes. Singular Opportunities.",
      link: link("View All Listings", "#listings"),
      saveLabelPrefix: "Save",
      viewCtaLabel: "View Residence →",
      areaUnit: "sq ft",
      bedsLabel: "bedrooms",
      bathsLabel: "bathrooms",
      items: refs(LISTINGS.map((l) => l._id), "listing"),
    },

    advisors: {
      _type: "advisorsSection",
      eyebrow: "Meet our advisors",
      heading: "Guidance from the World’s Best",
      body: "Our advisors are more than real estate professionals — they are trusted partners, committed to understanding your goals and delivering extraordinary results.",
      link: link("View All Advisors", "#advisors"),
      connectCta: link("Connect", "#contact"),
      items: refs(ADVISORS.map((a) => a._id), "advisor"),
    },

    services: {
      _type: "servicesSection",
      eyebrow: "Tailored services",
      heading: "A Higher Standard at Every Step",
      body: "From acquisition to advisory, we provide a full suite of services designed around your lifestyle and ambitions.",
      items: refs(SERVICES.map((s) => s._id), "service"),
    },

    offerBand: {
      _type: "photoBandSection",
      image: await image("offer.webp", "A living room with an expansive view"),
      eyebrow: "Your extraordinary next chapter",
      heading: "Begin Your Next Move with Confidence",
      body: "A private consultation offers a personalized approach to help you find what's next.",
      actions: keyed(
        [
          {
            _type: "bandAction",
            label: "Book a Private Consultation →",
            href: "#contact",
            variant: "solid",
          },
        ],
        "action",
      ),
      quote: "“The right home changes everything.”",
      quoteWidth: "narrow",
    },

    destinations: {
      _type: "destinationsSection",
      eyebrow: "Explore the world",
      heading: "Signature Destinations",
      lead: "Extraordinary neighborhoods. Unmatched lifestyles. Discover our curated collections in the world's most coveted locations.",
      link: link("Explore All Destinations", "#destinations"),
      items: refs(DESTINATIONS.map((d) => d._id), "destination"),
    },

    stats: {
      _type: "statsSection",
      items: keyed(
        [
          { _type: "statItem", value: "$4.8B", label: "In Transactions", icon: "buildings" },
          { _type: "statItem", value: "1,200+", label: "Properties Sold", icon: "house" },
          { _type: "statItem", value: "98%", label: "Client Referral Rate", icon: "people" },
          { _type: "statItem", value: "35", label: "Global Markets", icon: "globe" },
        ],
        "stat",
      ),
    },

    testimonials: {
      _type: "testimonialsSection",
      eyebrow: "Client stories",
      heading: "More Than Clients. Lifelong Relationships.",
      link: link("View More Stories", "#contact"),
      items: refs(TESTIMONIALS.map((t) => t._id), "quote"),
    },

    journal: {
      _type: "journalSection",
      eyebrow: "The Velora journal",
      heading: "Insights for a More Inspired Life",
      link: link("View All Articles", "#journal"),
      readCtaLabel: "Read Article →",
      items: refs(ARTICLES.map((a) => a._id), "article"),
    },

    contactBand: {
      _type: "photoBandSection",
      image: await image("cta.webp", "A terrace at sunset"),
      eyebrow: "Exceptional homes await",
      heading: "Let's Create What's Next",
      body: "Whether you're searching for a dream home, exploring investment opportunities, or simply want expert advice, we're here to help.",
      actions: keyed(
        [
          {
            _type: "bandAction",
            label: "Schedule a Private Tour →",
            href: "#contact",
            variant: "solid",
          },
          {
            _type: "bandAction",
            label: "Speak with an Advisor",
            href: "#advisors",
            variant: "outline",
          },
        ],
        "action",
      ),
      quote: "“Extraordinary lives begin with the right address.”",
      attribution: "— VELORA ESTATES",
      quoteWidth: "wide",
    },
  });
}

async function main() {
  console.log(`Seeding ${projectId}/${dataset}\n`);
  await seedCollections();
  await seedSiteSettings();
  await seedHomePage();
  console.log("\nDone. These are published documents, live in the dataset immediately.");
}

main().catch((error) => {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
