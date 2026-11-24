const IMAGE = `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  "alt": coalesce(alt, ""),
  "decorative": coalesce(decorative, false)
}`;

const CTA = `{ label, href }`;

const LISTING = `{ _id, title, price, location, beds, baths, sqft, image ${IMAGE} }`;
const ADVISOR = `{
  _id,
  name,
  role,
  location,
  image ${IMAGE},
  "channels": coalesce(channels[]{ label, icon, href }, [])
}`;
const SERVICE = `{ _id, title, description, icon, href }`;
const DESTINATION = `{ _id, name, place, image ${IMAGE} }`;
const TESTIMONIAL = `{ _id, quote, name, location, image ${IMAGE} }`;
const ARTICLE = `{ _id, title, date, description, image ${IMAGE} }`;

const PHOTO_BAND = `{
  image ${IMAGE},
  eyebrow,
  heading,
  body,
  "actions": actions[]{ label, href, variant },
  quote,
  attribution,
  quoteWidth
}`;

export const HOME_QUERY = `{
  "settings": *[_id == "siteSettings"][0]{
    name,
    legalName,
    title,
    description,
    telephone,
    email,
    address,
    geo,
    "openingHours": openingHours[]{ days, opens, closes },
    "socials": socials[]{ label, href, icon },
    formEndpoint,
    "ogImage": ogImage ${IMAGE},
    monogram,
    wordmarkLineOne,
    wordmarkLineTwo,
    headerCta ${CTA},
    tagline,
    footerContactTitle,
    footerLinksTitle,
    "footerLinks": footerLinks[]{ label, href },
    "footerLegalLinks": footerLegalLinks[]{ label, href },
    newsletterTitle,
    newsletterBody,
    newsletterPlaceholder,
    newsletterSubmitLabel,
    newsletterSuccess,
    newsletterUnconfigured,
    newsletterError,
    "nav": nav[]{ label, href }
  },

  "home": *[_id == "homePage"][0]{
    seoTitle,
    seoDescription,
    _updatedAt,

    hero {
      eyebrow,
      heading,
      body,
      watchCta ${CTA},
      image ${IMAGE},
      asideLineOne,
      asideLineTwo,
      locationLabel,
      searchPlaceholder,
      searchCtaLabel,
      "filters": filters[]{ label, options }
    },

    features {
      "items": items[]{ title, description, icon }
    },

    listings {
      eyebrow,
      heading,
      link ${CTA},
      saveLabelPrefix,
      viewCtaLabel,
      areaUnit,
      bedsLabel,
      bathsLabel,
      "items": items[]-> ${LISTING}
    },

    advisors {
      eyebrow,
      heading,
      body,
      link ${CTA},
      connectCta ${CTA},
      "items": items[]-> ${ADVISOR}
    },

    services {
      eyebrow,
      heading,
      body,
      "items": items[]-> ${SERVICE}
    },

    "offerBand": offerBand ${PHOTO_BAND},

    destinations {
      eyebrow,
      heading,
      lead,
      link ${CTA},
      "items": items[]-> ${DESTINATION}
    },

    stats {
      "items": items[]{ value, label, icon }
    },

    testimonials {
      eyebrow,
      heading,
      link ${CTA},
      "items": items[]-> ${TESTIMONIAL}
    },

    journal {
      eyebrow,
      heading,
      link ${CTA},
      readCtaLabel,
      "items": items[]-> ${ARTICLE}
    },

    "contactBand": contactBand ${PHOTO_BAND}
  }
}`;
