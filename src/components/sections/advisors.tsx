import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { blurProps } from "@/lib/sanity/image";
import type { HomeContent } from "@/lib/sanity/schema";

type AdvisorsProps = HomeContent["advisors"];

export function Advisors({ eyebrow, heading, body, link, connectCta, items }: AdvisorsProps) {
  return (
    <section id="advisors" className="py-[clamp(56px,7vw,88px)]">
      <Container>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[820px]">
            <p className="text-muted-ink m-0 mb-2.5 text-[11px] tracking-[0.22em] uppercase">
              {eyebrow}
            </p>
            <h2 className="font-heading m-0 text-[clamp(32px,4vw,48px)] leading-[1.05] font-medium">
              {heading}
            </h2>
          </div>
          <p className="text-muted-deep m-0 max-w-[380px] flex-[1_1_280px] text-[13px] leading-[1.6] font-light">
            {body}
          </p>
          <Link
            href={link.href}
            className="text-gold-deep hover:text-gold-hover flex min-h-11 items-center text-[13px]"
          >
            {`${link.label} →`}
          </Link>
        </div>

        <ul className="stagger stagger-cards grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 p-0">
          {items.map((advisor) => (
            <li
              key={advisor._id}
              className="rounded-card border-line hover:border-gold-light lift zoom grid grid-cols-[96px_1fr] items-stretch gap-3.5 border bg-white p-3 hover:shadow-[0_14px_34px_rgba(31,38,34,.10)]"
            >
              <div className="rounded-control relative h-full min-h-[128px] overflow-hidden bg-[#d8d0c2]">
                <Image
                  src={advisor.image.url}
                  alt={advisor.image.alt}
                  fill
                  sizes={`${Math.ceil(Math.max(96, (160 * advisor.image.width) / advisor.image.height))}px`}
                  className="object-cover"
                  {...blurProps(advisor.image)}
                />
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="font-heading text-[18px] font-medium">
                  {advisor.name}
                </div>
                <div className="text-muted-deep text-xs font-light">
                  {advisor.role}
                </div>
                <div className="text-muted-ink text-xs font-light">
                  {advisor.location}
                </div>

                <ul className="m-0 mt-1.5 flex list-none gap-1 p-0">
                  {advisor.channels.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={`${advisor.name} on ${social.label}`}
                        className="text-muted-deep hover:text-gold flex size-8 items-center justify-center"
                      >
                        <Icon name={social.icon} className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>

                <Link
                  href={connectCta.href}
                  className="text-ink mt-auto flex min-h-11 items-end self-end pb-1 text-[13px]"
                >
                  {connectCta.label}
                  <span className="sr-only"> with {advisor.name}</span>
                  <span className="text-gold-deep ml-2">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
