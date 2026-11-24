import Image from "next/image";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { blurProps } from "@/lib/sanity/image";
import type { HomeContent } from "@/lib/sanity/schema";

type DestinationsProps = HomeContent["destinations"];

export function Destinations({ eyebrow, heading, lead, link, items }: DestinationsProps) {
  return (
    <section id="destinations" className="pt-[clamp(56px,7vw,88px)]">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          lead={lead}
          link={link}
        />

        <ul className="tiles grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 p-0">
          {items.map((destination) => (
            <li
              key={destination._id}
              className="rounded-card lift zoom relative aspect-4/5 overflow-hidden"
            >
              <Image
                src={destination.image.url}
                alt={destination.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 260px"
                className="object-cover"
                {...blurProps(destination.image)}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-[linear-gradient(transparent,rgba(20,24,22,.85))] px-4 pt-12 pb-4 text-white">
                <div>
                  <div className="font-heading text-[26px] leading-none">
                    {destination.name}
                  </div>
                  <div className="mt-1.5 text-[10px] tracking-[0.2em] uppercase">
                    {destination.place}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="flex size-8 flex-none items-center justify-center rounded-full border border-white text-[13px]"
                >
                  →
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
