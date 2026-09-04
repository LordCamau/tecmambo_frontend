import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageProtection } from "@/components/media/ImageProtection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { consentModeDenied } from "@/lib/cookie-consent";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteDescription, sitePreviewImage, siteTitle } from "@/lib/site-metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap"
});

const deploymentAllowsIndexing = process.env.NO_INDEX !== "true" && !["preview", "development"].includes(process.env.VERCEL_ENV ?? "");

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://tecmambo.com"),
  title: {
    default: siteTitle,
    template: "%s | tecMAMBO"
  },
  description: siteDescription,
  icons: {
    icon: [
      {
        url: "/brand/tecMAMBO-favicon.jpg",
        type: "image/jpeg"
      }
    ],
    apple: [
      {
        url: "/brand/tecMAMBO-favicon.jpg",
        type: "image/jpeg"
      }
    ]
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: deploymentAllowsIndexing,
    follow: deploymentAllowsIndexing,
    googleBot: {
      index: deploymentAllowsIndexing,
      follow: deploymentAllowsIndexing,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "tecMAMBO",
    type: "website",
    images: [sitePreviewImage]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [sitePreviewImage.url]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#141318" }
  ]
};

const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head />
      <body>
        <ThemeProvider>
          <Script
            id="tecmambo-consent-defaults"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', ${JSON.stringify(consentModeDenied)});
              `
            }}
          />
          {cookiebotId ? (
            <Script
              id="Cookiebot"
              src="https://consent.cookiebot.com/uc.js"
              data-cbid={cookiebotId}
              data-blockingmode="auto"
              type="text/javascript"
              strategy="beforeInteractive"
            />
          ) : null}
          <GoogleAnalytics gaId="G-6S7F1VKH5M" />
          <span id="top" className="visually-hidden" tabIndex={-1}>
            Top
          </span>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CookieConsent />
          <ImageProtection />
        </ThemeProvider>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
