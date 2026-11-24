import Image from "next/image";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { blurProps } from "@/lib/sanity/image";
import type { HomeContent } from "@/lib/sanity/schema";

type TestimonialsProps = HomeContent["testimonials"];

export function Testimonials({ eyebrow, heading, link, items }: TestimonialsProps) {
  return (
    <section className="py-[clamp(56px,7vw,88px)]">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          link={link}
        />

        <div className="stagger stagger-cards grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {items.map((testimonial) => (
            <figure
              key={testimonial._id}
              className="rounded-card border-line hover:border-gold-light lift m-0 flex flex-col gap-6 border bg-white p-7 hover:shadow-[0_14px_34px_rgba(31,38,34,.10)]"
            >
              <blockquote className="font-heading text-quote m-0 max-w-[380px] text-[19px] leading-[1.45] italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <div className="relative size-12 flex-none overflow-hidden rounded-full bg-[#d8d0c2]">
                  <Image
                    src={testimonial.image.url}
                    alt={testimonial.image.alt}
                    fill
                    sizes="48px"
                    className="object-cover"
                    {...blurProps(testimonial.image)}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-heading text-base font-medium">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-ink text-xs font-light">
                    {testimonial.location}
                  </div>
                </div>
                <span
                  role="img" className="text-gold-deep text-xs tracking-[2px]"
                  aria-label="Rated 5 out of 5"
                >
                  ★★★★★
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
