import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { Advisors } from "@/components/sections/advisors";
import { Destinations } from "@/components/sections/destinations";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Journal } from "@/components/sections/journal";
import { Listings } from "@/components/sections/listings";
import { PhotoBand } from "@/components/sections/photo-band";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { websiteSchema } from "@/lib/jsonld";
import { getHomeQuery, getSiteConfig } from "@/lib/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHomeQuery();

  return {
    ...(home.seoTitle ? { title: { absolute: home.seoTitle } } : {}),
    ...(home.seoDescription ? { description: home.seoDescription } : {}),
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [config, { settings, home }] = await Promise.all([
    getSiteConfig(),
    getHomeQuery(),
  ]);

  return (
    <>
      <JsonLd data={websiteSchema(config)} />

      <SiteHeader
        monogram={settings.monogram}
        lineOne={settings.wordmarkLineOne}
        lineTwo={settings.wordmarkLineTwo}
        nav={settings.nav}
        cta={settings.headerCta}
      />

      <main>
        <Hero {...home.hero} />
        <Features {...home.features} />
        <Listings {...home.listings} />
        <Advisors {...home.advisors} />
        <Services {...home.services} />
        <PhotoBand {...home.offerBand} />
        <Destinations {...home.destinations} />
        <Stats {...home.stats} />
        <Testimonials {...home.testimonials} />
        <Journal {...home.journal} />
        <PhotoBand id="contact" {...home.contactBand} />
      </main>

      <SiteFooter
        monogram={settings.monogram}
        wordmark={`${settings.wordmarkLineOne} ${settings.wordmarkLineTwo}`}
        legalName={settings.legalName}
        tagline={settings.tagline}
        socials={settings.socials ?? []}
        contactTitle={settings.footerContactTitle}
        telephone={settings.telephone}
        email={settings.email}
        address={config.address}
        linksTitle={settings.footerLinksTitle}
        links={settings.footerLinks}
        legalLinks={settings.footerLegalLinks}
        newsletterTitle={settings.newsletterTitle}
        newsletterBody={settings.newsletterBody}
        newsletter={{
          placeholder: settings.newsletterPlaceholder,
          submitLabel: settings.newsletterSubmitLabel,
          success: settings.newsletterSuccess,
          unconfigured: settings.newsletterUnconfigured,
          error: settings.newsletterError,
        }}
        formEndpoint={config.formEndpoint}
      />
    </>
  );
}
