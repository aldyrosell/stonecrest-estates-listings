import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { NewsletterForm, type NewsletterCopy } from "@/components/newsletter-form";
import type { NavItem, SiteSettings } from "@/lib/sanity/schema";
import type { PostalAddress } from "@/types/site";

type SiteFooterProps = {
  monogram: string;
  wordmark: string;
  legalName: string;
  tagline: string;
  socials: NonNullable<SiteSettings["socials"]>;
  contactTitle: string;
  telephone: string;
  email: string;
  address: PostalAddress;
  linksTitle: string;
  links: readonly NavItem[];
  legalLinks: readonly NavItem[];
  newsletterTitle: string;
  newsletterBody: string;
  newsletter: NewsletterCopy;
  formEndpoint: string;
};

export function SiteFooter({
  monogram,
  wordmark,
  legalName,
  tagline,
  socials,
  contactTitle,
  telephone,
  email,
  address,
  linksTitle,
  links,
  legalLinks,
  newsletterTitle,
  newsletterBody,
  newsletter,
  formEndpoint,
}: SiteFooterProps) {
  return (
    <footer className="bg-footer text-footer-ink">
      <Container className="pt-14 pb-7">
        <div className="stagger grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-9">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <span className="font-heading text-gold-light text-[30px] leading-none font-medium">
                {monogram}
              </span>
              <span className="font-heading text-cream text-[19px] font-medium tracking-[0.14em]">
                {wordmark}
              </span>
            </div>
            <p className="m-0 max-w-[250px] text-[13px] font-light">
              {tagline}
            </p>
            <ul className="m-0 flex list-none gap-1.5 p-0">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="text-cream hover:text-gold-light press lift flex size-10 items-center justify-center"
                  >
                    <Icon name={social.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 text-[13px] font-light">
            <h2 className="text-cream m-0 text-xs font-medium">{contactTitle}</h2>
            <a
              href={`tel:${telephone.replace(/[^+\d]/g, "")}`}
              className="text-footer-ink hover:text-gold-light press flex items-center gap-2.5"
            >
              <Icon name="phone" className="text-gold-light size-4 flex-none" />
              {telephone}
            </a>
            <a
              href={`mailto:${email}`}
              className="text-footer-ink hover:text-gold-light press flex items-center gap-2.5"
            >
              <Icon name="mail" className="text-gold-light size-4 flex-none" />
              {email}
            </a>
            <address className="flex items-start gap-2.5 not-italic">
              <Icon name="pin" className="text-gold-light size-4 flex-none" />
              {address.streetAddress}, {address.addressLocality},{" "}
              {address.addressRegion} {address.postalCode}
            </address>
          </div>

          <nav
            aria-label={linksTitle}
            className="flex flex-col gap-2.5 text-[13px] font-light"
          >
            <h2 className="text-cream m-0 text-xs font-medium">{linksTitle}</h2>
            <div className="grid grid-cols-2 gap-2 gap-x-4">
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-footer-ink hover:text-gold-light press"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-2.5 text-[13px] font-light">
            <h2 className="text-cream m-0 text-xs font-medium">
              {newsletterTitle}
            </h2>
            <span className="max-w-[340px]">{newsletterBody}</span>
            <NewsletterForm endpoint={formEndpoint} {...newsletter} />
          </div>
        </div>

        <div className="border-footer-line reveal mt-7 flex flex-wrap justify-between gap-3 border-t pt-5 text-xs font-light">
          <span>
            © {new Date().getFullYear()} {legalName}. All rights reserved.
          </span>
          <div className="flex flex-wrap gap-5">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-footer-ink hover:text-gold-light press"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
