import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { MotionArm, MotionReveal } from "@/components/motion-script";
import { siteConstants } from "@/config/site";
import { businessSchema } from "@/lib/jsonld";
import { getSiteConfig } from "@/lib/sanity/content";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    metadataBase: new URL(config.url),
    title: {
      default: config.title,
      template: `%s | ${config.name}`,
    },
    description: config.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: config.locale,
      siteName: config.name,
      url: config.url,
      title: config.title,
      description: config.description,
      images: [{ url: config.ogImageUrl, width: 1200, height: 630, alt: config.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.ogImageUrl],
    },
    robots: { index: config.indexable, follow: true },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const config = await getSiteConfig();
  const { isEnabled: isDraft } = await draftMode();

  return (
    <html
      lang={siteConstants.locale}
      suppressHydrationWarning
      className={`${jost.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <MotionArm />
      </head>
      <body className="bg-page text-ink flex min-h-full flex-col overflow-x-hidden">
        <JsonLd data={businessSchema(config)} />
        {children}
        <MotionReveal />
        {isDraft ? <VisualEditing trailingSlash /> : null}
      </body>
    </html>
  );
}
