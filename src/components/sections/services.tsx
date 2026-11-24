import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import type { HomeContent } from "@/lib/sanity/schema";

type ServicesProps = HomeContent["services"];

export function Services({ eyebrow, heading, body, items }: ServicesProps) {
  return (
    <section id="services" className="pb-[clamp(56px,7vw,88px)]">
      <Container>
        <div className="mb-6">
          <p className="text-muted-ink m-0 mb-2.5 text-[11px] tracking-[0.22em] uppercase">
            {eyebrow}
          </p>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading m-0 text-[clamp(32px,4vw,48px)] leading-[1.05] font-medium">
              {heading}
            </h2>
            <p className="text-muted-deep m-0 max-w-[65ch] text-sm leading-[1.6] font-light">
              {body}
            </p>
          </div>
        </div>

        <ul className="stagger grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-0">
          {items.map((service) => (
            <li key={service._id}>
              <Link
                href={service.href}
                className="rounded-card border-line hover:border-gold flex h-full flex-col gap-1.5 border bg-white px-[18px] pt-[18px] pb-4"
              >
                <Icon name={service.icon} className="text-gold size-7" />
                <span className="font-heading mt-1 text-[18px] leading-[1.2] font-medium">
                  {service.title}
                </span>
                <span className="flex flex-1 items-end justify-between gap-3">
                  <span className="text-muted-deep max-w-[250px] text-xs leading-[1.5] font-light">
                    {service.description}
                  </span>
                  <span className="text-gold-deep flex-none">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
