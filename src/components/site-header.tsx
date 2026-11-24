"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { CloseIcon, Icon, MenuIcon } from "@/components/icon";
import type { Cta, NavItem } from "@/lib/sanity/schema";

type WordmarkProps = { monogram: string; lineOne: string; lineTwo: string };

function Wordmark({ monogram, lineOne, lineTwo }: WordmarkProps) {
  return (
    <Link href="#top" className="flex items-center gap-2.5">
      <span className="font-heading text-gold text-[30px] leading-none font-medium">
        {monogram}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[19px] font-medium tracking-[0.14em]">
          {lineOne}
        </span>
        <span className="text-muted-ink text-[8px] tracking-[0.42em]">
          {lineTwo}
        </span>
      </span>
    </Link>
  );
}

type SiteHeaderProps = WordmarkProps & {
  nav: readonly NavItem[];
  cta: Cta;
};

export function SiteHeader({
  monogram,
  lineOne,
  lineTwo,
  nav,
  cta,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-line-soft header-condense sticky top-0 z-50 border-b bg-white/95">
      <Container className="flex h-[68px] items-center justify-between gap-6">
        <Wordmark monogram={monogram} lineOne={lineOne} lineTwo={lineTwo} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-[13px] min-[960px]:flex"
        >
          {nav.map((item) => {
            const isHome = item.href === "#top";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isHome ? "page" : undefined}
                className={
                  isHome
                    ? "text-gold-deep border-gold-deep border-b py-1.5"
                    : "hover:text-gold nav-underline press border-b border-transparent py-1.5"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            aria-label="Search"
            className="flex size-10 items-center justify-center"
          >
            <Icon name="search" className="size-[18px]" />
          </button>
        </nav>

        <Link
          href={cta.href}
          className="bg-gold-deep hover:bg-gold-hover press rounded-control hidden min-h-11 items-center gap-2.5 px-5 text-[13px] tracking-[0.04em] text-white min-[960px]:flex"
        >
          {cta.label}
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="border-line text-ink rounded-control grid size-11 place-items-center border bg-white min-[960px]:hidden"
        >
          {menuOpen ? (
            <CloseIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>
      </Container>

      <nav
        id="mobile-menu"
        aria-label="Primary"
        className={cn(
          "mobile-menu absolute inset-x-0 top-full border-line flex flex-col border-t bg-white px-5 pt-2 pb-5 min-[600px]:px-8 min-[960px]:hidden shadow-[0_18px_30px_rgba(31,38,34,.10)]",
          !menuOpen && "invisible -translate-y-2 opacity-0",
        )}
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="border-line font-heading flex min-h-12 items-center border-b text-[22px]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={cta.href}
          onClick={() => setMenuOpen(false)}
          className="bg-gold-deep press rounded-control mt-4 flex min-h-12 items-center justify-center text-sm text-white"
        >
          {cta.label}
        </Link>
      </nav>
    </header>
  );
}
