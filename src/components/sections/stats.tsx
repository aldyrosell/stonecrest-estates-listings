import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import type { HomeContent } from "@/lib/sanity/schema";

type StatsProps = HomeContent["stats"];

export function Stats({ items }: StatsProps) {
  return (
    <section className="bg-band mt-[clamp(40px,5vw,56px)]">
      <Container>
        <div className="overflow-hidden">
          <ul className="stagger -mr-px m-0 grid list-none grid-cols-1 p-0 min-[480px]:grid-cols-2 min-[900px]:grid-cols-4">
            {items.map((stat) => (
              <li
                key={stat.label}
                className="border-line-field flex items-center justify-center gap-4 border-r px-2 py-2.5 my-[22px]"
              >
                <Icon name={stat.icon} className="text-gold size-11 shrink-0" />
                <div>
                  <div className="font-heading text-ink text-4xl leading-none">
                    {stat.value}
                  </div>
                  <div className="text-muted-deep mt-1 text-[13px] font-light">
                    {stat.label}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
