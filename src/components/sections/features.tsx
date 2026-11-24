import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import type { HomeContent } from "@/lib/sanity/schema";

type FeaturesProps = HomeContent["features"];

export function Features({ items }: FeaturesProps) {
  return (
    <section className="bg-band border-line border-b">
      <Container>
        <ul className="stagger grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 p-0 py-6">
          {items.map((feature) => (
            <li key={feature.title} className="flex items-center gap-3.5">
              <Icon
                name={feature.icon}
                className="text-gold size-[34px] shrink-0"
              />
              <div>
                <div className="font-heading text-[17px] font-medium">
                  {feature.title}
                </div>
                <div className="text-muted-ink text-xs font-light">
                  {feature.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
