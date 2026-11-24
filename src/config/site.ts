import type { SiteConstants } from "@/types/site";

export const siteConstants: SiteConstants = {
  url: "https://velora.demo.aldyrosell.dev",
  // Demo content with fabricated NAP — true would publish invented business data to search engines.
  indexable: false,
  locale: "en",
  schemaType: "RealEstateAgent",
  routes: [
    {
      path: "/",
      label: "Home",
      inNav: false,
      changeFrequency: "weekly",
      priority: 1,
    },
  ],
};
