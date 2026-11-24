import { CaseIcon } from "@sanity/icons/Case";
import { CommentIcon } from "@sanity/icons/Comment";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { TagIcon } from "@sanity/icons/Tag";
import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { SERVICE_ICONS } from "../icons";

export const listing = defineType({
  name: "listing",
  title: "Listing",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Property name",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Written exactly as it should appear, such as $12,500,000.",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Such as Laguna Beach, CA.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "beds",
      title: "Bedrooms",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "baths",
      title: "Bathrooms",
      type: "number",
      description: "Halves are fine, such as 5.5.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "sqft",
      title: "Floor area",
      type: "string",
      description: "Square feet, written as it should appear, such as 7,200.",
      validation: (rule) => rule.required().max(16),
    }),
    defineField({
      name: "image",
      title: "Photograph",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "location", media: "image" } },
});

export const advisor = defineType({
  name: "advisor",
  title: "Advisor",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "location",
      title: "Based in",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "channels",
      title: "Contact channels",
      type: "array",
      description: "The small icons under the advisor's name.",
      of: [defineArrayMember({ type: "advisorChannel" })],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Service name",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "description",
      title: "One-line description",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: SERVICE_ICONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Where the card goes when clicked. A section anchor such as #contact is fine.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Neighborhood",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "place",
      title: "City or country",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "image",
      title: "Photograph",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "place", media: "image" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  description:
    "Only use real quotes from real clients.",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "location", media: "image" } },
});

export const article = defineType({
  name: "article",
  title: "Journal article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "date",
      title: "Published",
      type: "string",
      description: "Written as it should appear, such as Apr 12, 2026.",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "description",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "image",
      title: "Photograph",
      type: "imageWithAlt",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});
