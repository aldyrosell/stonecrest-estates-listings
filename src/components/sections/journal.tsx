import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { blurProps } from "@/lib/sanity/image";
import type { HomeContent } from "@/lib/sanity/schema";

type JournalProps = HomeContent["journal"];

export function Journal({ eyebrow, heading, link, readCtaLabel, items }: JournalProps) {
  return (
    <section id="journal" className="pb-[clamp(56px,7vw,88px)]">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          link={link}
        />

        <ul className="stagger stagger-cards grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 p-0">
          {items.map((article) => (
            <li
              key={article._id}
              className="rounded-card border-line hover:border-gold-light lift zoom flex flex-col overflow-hidden border bg-white hover:shadow-[0_14px_34px_rgba(31,38,34,.10)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.image.url}
                  alt={article.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                  {...blurProps(article.image)}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-[22px]">
                <span className="text-muted-ink text-[11px] tracking-[0.14em] uppercase">
                  {article.date}
                </span>
                <h3 className="font-heading m-0 text-[23px] leading-[1.2] font-medium">
                  {article.title}
                </h3>
                <p className="text-muted-deep m-0 max-w-[380px] text-[13px] leading-[1.55] font-light">
                  {article.description}
                </p>
                <Link
                  href={link.href}
                  className="text-gold-deep hover:text-gold-hover mt-auto flex min-h-11 items-center text-[13px]"
                >
                  {readCtaLabel}
                  <span className="sr-only"> {article.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
