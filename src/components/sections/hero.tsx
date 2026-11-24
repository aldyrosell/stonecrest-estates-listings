import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { Container } from "@/components/container";
import { SelectMenu } from "@/components/select-menu";
import type { HomeContent } from "@/lib/sanity/schema";

type HeroProps = HomeContent["hero"];

export function Hero({
  eyebrow,
  heading,
  body,
  watchCta,
  image,
  asideLineOne,
  asideLineTwo,
  locationLabel,
  searchPlaceholder,
  searchCtaLabel,
  filters,
}: HeroProps) {
  const filterId = useId();

  return (
    <section id="top" className="bg-ink text-cream relative">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,24,22,.82)_0%,rgba(20,24,22,.45)_55%,rgba(20,24,22,.15)_100%)]"
      />

      <Container className="pointer-events-none relative pt-[clamp(56px,9vw,120px)] pb-10">
        <div className="hero-enter w-full max-w-[820px] min-[900px]:w-[80%] min-[960px]:w-[58%]">
          <p className="text-on-dark-dim m-0 mb-4 text-[11px] tracking-[0.22em] uppercase">
            {eyebrow}
          </p>
          <h1 className="font-heading m-0 text-[clamp(44px,7vw,92px)] leading-[0.98] font-medium text-balance">
            {heading}
          </h1>
          <p className="text-on-dark mt-6 mb-0 max-w-[380px] text-[15px] leading-[1.6] font-light text-pretty">
            {body}
          </p>
          <Link
            href={watchCta.href}
            className="text-cream pointer-events-auto mt-6 inline-flex min-h-11 items-center gap-3 text-[13px]"
          >
            <span className="border-cream flex size-10 items-center justify-center rounded-full border text-[11px]">
              ▶
            </span>
            {watchCta.label}
          </Link>
        </div>

        <p className="text-on-dark-dim mt-[clamp(40px,6vw,80px)] flex justify-end text-right text-[10px] leading-[1.7] tracking-[0.22em] uppercase">
          {asideLineOne}
          <br />
          {asideLineTwo}
        </p>

        <div className="rounded-card text-ink pointer-events-auto mt-4 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] items-end gap-4 bg-white px-5 py-6 shadow-[0_20px_50px_rgba(0,0,0,.18)] min-[600px]:px-7 min-[600px]:py-8 min-[900px]:px-12 min-[900px]:py-11">
          <label className="flex flex-col gap-2 text-xs font-medium">
            {locationLabel}
            <input
              placeholder={searchPlaceholder}
              className="border-line-field rounded-control text-ink min-h-11 border bg-white px-3 text-[13px] font-light"
            />
          </label>

          {filters.map((filter, index) => (
            <div key={filter.label} className="flex flex-col gap-2">
              <label
                id={`${filterId}-${index}-label`}
                htmlFor={`${filterId}-${index}`}
                className="text-xs font-medium"
              >
                {filter.label}
              </label>
              <SelectMenu
                id={`${filterId}-${index}`}
                labelId={`${filterId}-${index}-label`}
                options={filter.options}
                className="border-line-field rounded-control text-ink min-h-11 gap-2 border bg-white pr-3 pl-2.5 text-[13px] font-light"
              />
            </div>
          ))}

          <button
            type="button"
            className="bg-gold-deep hover:bg-gold-hover rounded-control min-h-11 text-sm text-white"
          >
            {searchCtaLabel}
          </button>
        </div>
      </Container>
    </section>
  );
}
