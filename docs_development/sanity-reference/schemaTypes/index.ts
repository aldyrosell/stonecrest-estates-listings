import type { SchemaTypeDefinition } from "sanity";

import {
  advisor,
  article,
  destination,
  listing,
  service,
  testimonial,
} from "./documents/collections";
import { homePage } from "./documents/homePage";
import { siteSettings } from "./documents/siteSettings";
import { advisorChannel, bandAction, feature, searchFilter, statItem } from "./objects/items";
import {
  cta,
  imageWithAlt,
  linkGroup,
  navItem,
  openingHoursSpec,
  postalAddress,
  richLine,
  socialLink,
} from "./objects/primitives";
import {
  advisorsSection,
  destinationsSection,
  featuresSection,
  heroSection,
  journalSection,
  listingsSection,
  photoBandSection,
  servicesSection,
  statsSection,
  testimonialsSection,
} from "./objects/sections";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,

  listing,
  advisor,
  service,
  destination,
  testimonial,
  article,

  imageWithAlt,
  cta,
  navItem,
  linkGroup,
  socialLink,
  postalAddress,
  openingHoursSpec,
  richLine,

  feature,
  statItem,
  searchFilter,
  bandAction,
  advisorChannel,

  heroSection,
  featuresSection,
  listingsSection,
  advisorsSection,
  servicesSection,
  destinationsSection,
  statsSection,
  testimonialsSection,
  journalSection,
  photoBandSection,
];
