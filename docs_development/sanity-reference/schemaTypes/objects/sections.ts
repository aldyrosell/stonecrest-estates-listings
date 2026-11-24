import { defineArrayMember, defineField, defineType } from "sanity";

const eyebrow = (description = "The small line above the heading.") =>
  defineField({
    name: "eyebrow",
    title: "Eyebrow",
    type: "string",
    description,
    validation: (rule) => rule.required().max(60),
  });

const heading = (description: string, max = 90) =>
  defineField({
    name: "heading",
    title: "Heading",
    type: "string",
    description,
    validation: (rule) => rule.required().max(max),
  });

const refList = (name: string, title: string, to: string, description: string) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [defineArrayMember({ type: "reference", to: [{ type: to }] })],
    validation: (rule) => rule.required().min(1),
  });

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    eyebrow(),
    defineField({
      name: "heading",
      title: "Page headline",
      type: "string",
      description:
        "The main headline of your homepage.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "body",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({ name: "watchCta", title: "Video link", type: "cta" }),
    defineField({
      name: "image",
      title: "Background photograph",
      type: "imageWithAlt",
      description:
        "The large photo at the top. Upload the full-size original.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "asideLineOne",
      title: "Side note, first line",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "asideLineTwo",
      title: "Side note, second line",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "locationLabel",
      title: "Location field label",
      type: "string",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "searchPlaceholder",
      title: "Search box placeholder",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "searchCtaLabel",
      title: "Search button text",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "filters",
      title: "Search filters",
      type: "array",
      of: [defineArrayMember({ type: "searchFilter" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

export const featuresSection = defineType({
  name: "featuresSection",
  title: "Features",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "feature" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

export const listingsSection = defineType({
  name: "listingsSection",
  title: "Listings",
  type: "object",
  fields: [
    eyebrow(),
    heading("The section heading above the property cards."),
    defineField({ name: "link", title: "Heading link", type: "cta" }),
    defineField({
      name: "saveLabelPrefix",
      title: "Save button label",
      type: "string",
      description: "The property name is appended, e.g. 'Save' becomes 'Save Alpine Retreat'.",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "viewCtaLabel",
      title: "Card button text",
      type: "string",
      description: "Repeated on every property card.",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "areaUnit",
      title: "Floor area unit",
      type: "string",
      description: "Shown after the floor area, such as sq ft or m².",
      validation: (rule) => rule.required().max(10),
    }),
    defineField({
      name: "bedsLabel",
      title: "Bedrooms label (screen readers)",
      type: "string",
      description: "Not shown on screen. Read aloud after the bedroom count.",
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: "bathsLabel",
      title: "Bathrooms label (screen readers)",
      type: "string",
      description: "Not shown on screen. Read aloud after the bathroom count.",
      validation: (rule) => rule.required().max(20),
    }),
    refList("items", "Listings shown", "listing", "Drag to reorder. Remove one to hide it."),
  ],
});

export const advisorsSection = defineType({
  name: "advisorsSection",
  title: "Advisors",
  type: "object",
  fields: [
    eyebrow(),
    heading("The section heading above the advisor cards."),
    defineField({
      name: "body",
      title: "Body copy",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({ name: "link", title: "Heading link", type: "cta" }),
    defineField({
      name: "connectCta",
      title: "Card button",
      type: "cta",
      description: "Repeated on every advisor card. The advisor's name is added for screen readers.",
      validation: (rule) => rule.required(),
    }),
    refList("items", "Advisors shown", "advisor", "Drag to reorder. Remove one to hide it."),
  ],
});

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services",
  type: "object",
  fields: [
    eyebrow(),
    heading("The section heading above the service list."),
    defineField({
      name: "body",
      title: "Body copy",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    refList("items", "Services shown", "service", "Shown in this order. Drag to reorder."),
  ],
});

export const destinationsSection = defineType({
  name: "destinationsSection",
  title: "Destinations",
  type: "object",
  fields: [
    eyebrow(),
    heading("The section heading above the destination tiles."),
    defineField({
      name: "lead",
      title: "Lead paragraph",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({ name: "link", title: "Heading link", type: "cta" }),
    refList("items", "Destinations shown", "destination", "Drag to reorder."),
  ],
});

export const statsSection = defineType({
  name: "statsSection",
  title: "Statistics",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Statistics",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "object",
  fields: [
    eyebrow(),
    heading("The section heading above the client quotes."),
    defineField({ name: "link", title: "Heading link", type: "cta" }),
    refList("items", "Testimonials shown", "testimonial", "Drag to reorder."),
  ],
});

export const journalSection = defineType({
  name: "journalSection",
  title: "Journal",
  type: "object",
  fields: [
    eyebrow(),
    heading("The section heading above the articles."),
    defineField({ name: "link", title: "Heading link", type: "cta" }),
    defineField({
      name: "readCtaLabel",
      title: "Article link text",
      type: "string",
      description: "Repeated on every article card.",
      validation: (rule) => rule.required().max(24),
    }),
    refList("items", "Articles shown", "article", "Drag to reorder."),
  ],
});

export const photoBandSection = defineType({
  name: "photoBandSection",
  title: "Photo band",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Photograph",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    eyebrow(),
    heading("The heading inside the band."),
    defineField({
      name: "body",
      title: "Body copy",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "actions",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "bandAction" })],
      validation: (rule) => rule.required().min(1).max(2),
    }),
    defineField({
      name: "quote",
      title: "Pull quote",
      type: "string",
      description: "Include the quotation marks exactly as they should appear.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "attribution",
      title: "Quote attribution",
      type: "string",
      description: "Optional. Leave empty for an unattributed quote.",
    }),
    defineField({
      name: "quoteWidth",
      title: "Quote width",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "narrow" },
          { title: "Wide", value: "wide" },
        ],
      },
      initialValue: "narrow",
      validation: (rule) => rule.required(),
    }),
  ],
});
