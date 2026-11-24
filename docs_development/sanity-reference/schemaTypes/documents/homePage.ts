import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";

const section = (name: string, title: string, type: string) =>
  defineField({
    name,
    title,
    type,
    group: "sections",
    options: { collapsible: true, collapsed: true },
    validation: (rule) => rule.required(),
  });

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "sections", title: "Sections", default: true },
    { name: "seo", title: "Search engines" },
  ],
  fields: [
    defineField({
      name: "seoTitle",
      title: "Search result title",
      type: "string",
      group: "seo",
      description:
        "Leave empty to use the title from Site settings.",
      validation: (rule) => [
        rule.max(70).error(),
        rule.max(60).warning("Titles longer than 60 characters get truncated in search results."),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "Search result description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Leave empty to use the site-wide description from Site settings.",
      validation: (rule) => [
        rule.max(180).error(),
        rule.max(160).warning("Descriptions longer than 160 characters get truncated."),
      ],
    }),

    section("hero", "Hero", "heroSection"),
    section("features", "Features", "featuresSection"),
    section("listings", "Listings", "listingsSection"),
    section("advisors", "Advisors", "advisorsSection"),
    section("services", "Services", "servicesSection"),
    section("offerBand", "Photo band — consultation", "photoBandSection"),
    section("destinations", "Destinations", "destinationsSection"),
    section("stats", "Statistics", "statsSection"),
    section("testimonials", "Testimonials", "testimonialsSection"),
    section("journal", "Journal", "journalSection"),
    section("contactBand", "Photo band — contact", "photoBandSection"),
  ],
  preview: {
    select: { title: "hero.heading" },
    prepare: ({ title }) => ({ title: "Home page", subtitle: title }),
  },
});
