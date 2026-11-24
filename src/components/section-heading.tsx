import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  lead?: string;
  link?: { label: string; href: string };
  children?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  heading,
  lead,
  link,
  children,
}: SectionHeadingProps) {
  return (
    <div className="reveal mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-[820px]">
        <p className="text-muted-ink m-0 mb-2.5 text-[11px] tracking-[0.22em] uppercase">
          {eyebrow}
        </p>
        <h2 className="font-heading m-0 text-[clamp(32px,4vw,48px)] leading-[1.05] font-medium text-balance">
          {heading}
        </h2>
        {lead ? (
          <p className="text-muted-deep mt-2.5 mb-0 text-sm leading-[1.6] font-light">
            {lead}
          </p>
        ) : null}
      </div>
      {children}
      {link ? (
        <Link
          href={link.href}
          className="text-gold-deep hover:text-gold-hover press flex min-h-11 items-center text-[13px]"
        >
          {link.label} →
        </Link>
      ) : null}
    </div>
  );
}
