import { z } from "zod";

export const FEATURE_ICONS = ["heart", "globe", "shield", "user"] as const;
export const SERVICE_ICONS = ["house", "tag", "chart", "pin", "folder"] as const;
export const STAT_ICONS = ["buildings", "house", "people", "globe"] as const;
export const SOCIAL_ICONS = ["instagram", "linkedin", "youtube", "pinterest"] as const;
export const CHANNEL_ICONS = ["linkedin", "instagram", "mail"] as const;

const text = z.string().min(1);

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const imageSchema = z
  .object({
    url: text,
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    lqip: z.string().nullish(),
    alt: z.string(),
    decorative: z.boolean(),
  })
  .refine((image) => image.decorative || image.alt.length > 0, {
    message: "alt text is required unless the image is marked decorative",
    path: ["alt"],
  });

const ctaSchema = z.object({ label: text, href: text });
const navItemSchema = z.object({ label: text, href: text });

const photoBandSchema = z.object({
  image: imageSchema,
  eyebrow: text,
  heading: text,
  body: text,
  actions: z
    .array(z.object({ label: text, href: text, variant: z.enum(["solid", "outline"]) }))
    .min(1),
  quote: text,
  attribution: z.string().nullish(),
  quoteWidth: z.enum(["narrow", "wide"]),
});

export const settingsSchema = z.object({
  name: text,
  legalName: text,
  title: text,
  description: text,
  telephone: text,
  email: text,
  address: z.object({
    streetAddress: z.string().nullish(),
    addressLocality: text,
    addressRegion: z.string().nullish(),
    postalCode: z.string().nullish(),
    addressCountry: text,
  }),
  geo: z.object({ latitude: z.number(), longitude: z.number() }).nullish(),
  openingHours: z
    .array(z.object({ days: z.array(z.enum(WEEKDAYS)).min(1), opens: text, closes: text }))
    .nullish(),
  socials: z
    .array(z.object({ label: text, href: text, icon: z.enum(SOCIAL_ICONS) }))
    .nullish(),
  formEndpoint: z.string().nullish(),
  ogImage: imageSchema.nullish(),
  monogram: text,
  wordmarkLineOne: text,
  wordmarkLineTwo: text,
  headerCta: ctaSchema,
  tagline: text,
  footerContactTitle: text,
  footerLinksTitle: text,
  footerLinks: z.array(navItemSchema).min(1),
  footerLegalLinks: z.array(navItemSchema).min(1),
  newsletterTitle: text,
  newsletterBody: text,
  newsletterPlaceholder: text,
  newsletterSubmitLabel: text,
  newsletterSuccess: text,
  newsletterUnconfigured: text,
  newsletterError: text,
  nav: z.array(navItemSchema).min(1),
});

const listingSchema = z.object({
  _id: text,
  title: text,
  price: text,
  location: text,
  beds: z.number(),
  baths: z.number(),
  sqft: text,
  image: imageSchema,
});

const advisorSchema = z.object({
  _id: text,
  name: text,
  role: text,
  location: text,
  image: imageSchema,
  channels: z.array(z.object({ label: text, icon: z.enum(CHANNEL_ICONS), href: text })),
});

const serviceSchema = z.object({
  _id: text,
  title: text,
  description: text,
  icon: z.enum(SERVICE_ICONS),
  href: text,
});

const destinationSchema = z.object({ _id: text, name: text, place: text, image: imageSchema });

const testimonialSchema = z.object({
  _id: text,
  quote: text,
  name: text,
  location: text,
  image: imageSchema,
});

const articleSchema = z.object({
  _id: text,
  title: text,
  date: text,
  description: text,
  image: imageSchema,
});

export const homeSchema = z.object({
  seoTitle: z.string().nullish(),
  seoDescription: z.string().nullish(),
  _updatedAt: text,

  hero: z.object({
    eyebrow: text,
    heading: text,
    body: text,
    watchCta: ctaSchema,
    image: imageSchema,
    asideLineOne: text,
    asideLineTwo: text,
    locationLabel: text,
    searchPlaceholder: text,
    searchCtaLabel: text,
    filters: z.array(z.object({ label: text, options: z.array(text).min(1) })).min(1),
  }),

  features: z.object({
    items: z
      .array(z.object({ title: text, description: text, icon: z.enum(FEATURE_ICONS) }))
      .min(1),
  }),

  listings: z.object({
    eyebrow: text,
    heading: text,
    link: ctaSchema,
    saveLabelPrefix: text,
    viewCtaLabel: text,
    areaUnit: text,
    bedsLabel: text,
    bathsLabel: text,
    items: z.array(listingSchema).min(1),
  }),

  advisors: z.object({
    eyebrow: text,
    heading: text,
    body: text,
    link: ctaSchema,
    connectCta: ctaSchema,
    items: z.array(advisorSchema).min(1),
  }),

  services: z.object({
    eyebrow: text,
    heading: text,
    body: text,
    items: z.array(serviceSchema).min(1),
  }),

  offerBand: photoBandSchema,

  destinations: z.object({
    eyebrow: text,
    heading: text,
    lead: text,
    link: ctaSchema,
    items: z.array(destinationSchema).min(1),
  }),

  stats: z.object({
    items: z.array(z.object({ value: text, label: text, icon: z.enum(STAT_ICONS) })).min(1),
  }),

  testimonials: z.object({
    eyebrow: text,
    heading: text,
    link: ctaSchema,
    items: z.array(testimonialSchema).min(1),
  }),

  journal: z.object({
    eyebrow: text,
    heading: text,
    link: ctaSchema,
    readCtaLabel: text,
    items: z.array(articleSchema).min(1),
  }),

  contactBand: photoBandSchema,
});

export const homeQuerySchema = z.object({
  settings: settingsSchema,
  home: homeSchema,
});

export type SanityImage = z.infer<typeof imageSchema>;
export type Cta = z.infer<typeof ctaSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type SiteSettings = z.infer<typeof settingsSchema>;
export type HomeContent = z.infer<typeof homeSchema>;
export type PhotoBandContent = z.infer<typeof photoBandSchema>;
