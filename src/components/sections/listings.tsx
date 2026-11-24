import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { blurProps } from "@/lib/sanity/image";
import type { HomeContent } from "@/lib/sanity/schema";

type ListingsProps = HomeContent["listings"];

export function Listings({
  eyebrow,
  heading,
  link,
  saveLabelPrefix,
  viewCtaLabel,
  areaUnit,
  bedsLabel,
  bathsLabel,
  items,
}: ListingsProps) {
  return (
    <section id="listings" className="pt-[clamp(56px,7vw,88px)]">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          link={link}
        />

        <ul className="stagger stagger-cards grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 p-0">
          {items.map((listing) => (
            <li
              key={listing._id}
              className="rounded-card border-line hover:border-gold-light lift zoom flex flex-col overflow-hidden border bg-white hover:shadow-[0_14px_34px_rgba(31,38,34,.10)]"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={listing.image.url}
                  alt={listing.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover"
                  {...blurProps(listing.image)}
                />
                <button
                  type="button"
                  aria-label={`${saveLabelPrefix} ${listing.title}`}
                  className="text-ink absolute top-2.5 right-2.5 z-[2] flex size-9 items-center justify-center rounded-full bg-white/90"
                >
                  <Icon name="heart" className="size-[18px]" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 px-[18px] pt-[18px] pb-5">
                <div className="font-heading text-[22px] font-medium">
                  {listing.price}
                </div>
                <div className="text-sm">{listing.title}</div>
                <div className="text-muted-ink text-xs font-light">
                  {listing.location}
                </div>

                <ul className="text-muted-deep m-0 mt-3 mb-4 flex list-none flex-wrap gap-1.5 gap-x-4 border-t border-[#eee7da] p-0 pt-3 text-xs">
                  <li className="flex items-center gap-1.5">
                    <Icon name="bed" className="size-4" />
                    {listing.beds}
                    <span className="sr-only">{bedsLabel}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Icon name="bath" className="size-4" />
                    {listing.baths}
                    <span className="sr-only">{bathsLabel}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Icon name="area" className="size-4" />
                    {listing.sqft} {areaUnit}
                  </li>
                </ul>

                <Link
                  href={link.href}
                  className="rounded-control border-ink hover:bg-ink hover:text-cream mt-auto flex min-h-11 items-center justify-center border text-[13px]"
                >
                  {viewCtaLabel}
                  <span className="sr-only"> {listing.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
