import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { FilterIcon } from "@sanity/icons/Filter";
import { LaunchIcon } from "@sanity/icons/Launch";
import { SparkleIcon } from "@sanity/icons/Sparkle";
import { TrendUpwardIcon } from "@sanity/icons/TrendUpward";
import { defineArrayMember, defineField, defineType } from "sanity";

import { FEATURE_ICONS, STAT_ICONS } from "../icons";

const iconField = (list: { title: string; value: string }[]) =>
  defineField({
    name: "icon",
    title: "Icon",
    type: "string",
    description: "Pick from the icons the design provides.",
    options: { list },
    validation: (rule) => rule.required(),
  });

export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "object",
  icon: SparkleIcon,
  options: { columns: 2 },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "description",
      title: "One-line description",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    iconField(FEATURE_ICONS),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const statItem = defineType({
  name: "statItem",
  title: "Statistic",
  type: "object",
  icon: TrendUpwardIcon,
  options: { columns: 2 },
  fields: [
    defineField({
      name: "value",
      title: "Figure",
      type: "string",
      description: "Written exactly as it should appear, such as $4.8B or 1,200+.",
      validation: (rule) => rule.required().max(12),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    iconField(STAT_ICONS),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const searchFilter = defineType({
  name: "searchFilter",
  title: "Search filter",
  type: "object",
  icon: FilterIcon,
  fields: [
    defineField({
      name: "label",
      title: "Filter name",
      type: "string",
      description: "Such as Property Type or Budget.",
      validation: (rule) => rule.required().max(30),
    }),
    defineField({
      name: "options",
      title: "Choices",
      type: "array",
      description: "The first choice is what shows before a visitor picks anything.",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { title: "label", options: "options" },
    prepare: ({ title, options }) => ({
      title,
      subtitle: Array.isArray(options) ? options.join(", ") : "",
    }),
  },
});

export const advisorChannel = defineType({
  name: "advisorChannel",
  title: "Contact channel",
  type: "object",
  icon: EnvelopeIcon,
  options: { columns: 2 },
  fields: [
    defineField({
      name: "label",
      title: "Channel name",
      type: "string",
      description: "Also read aloud to screen-reader users.",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "LinkedIn", value: "linkedin" },
          { title: "Instagram", value: "instagram" },
          { title: "Email", value: "mail" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Their profile address, a mailto: link, or a section anchor such as #contact.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const bandAction = defineType({
  name: "bandAction",
  title: "Button",
  type: "object",
  icon: LaunchIcon,
  options: { columns: 2 },
  fields: [
    defineField({
      name: "label",
      title: "Button text",
      type: "string",
      validation: (rule) => rule.required().max(48),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      description: "Solid is the primary action. Use outline for the secondary one.",
      options: {
        list: [
          { title: "Solid", value: "solid" },
          { title: "Outline", value: "outline" },
        ],
      },
      initialValue: "solid",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
