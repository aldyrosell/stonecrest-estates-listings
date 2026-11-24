import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { blurProps } from "@/lib/sanity/image";
import type { PhotoBandContent } from "@/lib/sanity/schema";

type PhotoBandProps = PhotoBandContent & { id?: string };

export function PhotoBand({
  id,
  image,
  eyebrow,
  heading,
  body,
  actions,
  quote,
  attribution,
  quoteWidth,
}: PhotoBandProps) {
  return (
    <section id={id} className="bg-ink text-cream relative">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover"
        {...blurProps(image)}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,24,22,.9)_0%,rgba(20,24,22,.55)_60%,rgba(20,24,22,.3)_100%)]"
      />

      <Container className="pointer-events-none relative">
        <div className="flex flex-wrap items-center justify-between gap-8 py-6 min-[600px]:py-8 min-[900px]:py-11">
          <div className="reveal w-full max-w-[820px] min-[900px]:w-[80%] min-[960px]:w-[56%]">
            <p className="text-on-dark-dim m-0 mb-3 text-[11px] tracking-[0.22em] uppercase">
              {eyebrow}
            </p>
            <h2 className="font-heading m-0 text-[clamp(34px,4.5vw,56px)] leading-[1.05] font-medium">
              {heading}
            </h2>
            <p className="text-on-dark mt-3.5 mb-6 max-w-[380px] text-sm leading-[1.6] font-light">
              {body}
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={
                    action.variant === "solid"
                      ? "bg-gold-light text-ink rounded-control flex min-h-12 items-center px-[22px] text-[13px]"
                      : "border-cream text-cream rounded-control flex min-h-12 items-center border px-[22px] text-[13px] hover:bg-white/10"
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`font-heading text-cream text-[clamp(22px,2.4vw,30px)] leading-[1.3] font-normal italic ${
              quoteWidth === "wide" ? "max-w-[340px]" : "max-w-[250px]"
            }`}
          >
            {quote}
            {attribution ? (
              <div className="mt-3.5 font-sans text-[10px] tracking-[0.3em] not-italic">
                {attribution}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
