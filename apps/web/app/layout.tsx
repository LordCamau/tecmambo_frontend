import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";
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
import { googleReaderEngagementConfig, preferredSourceScriptUrl } from "@/lib/google-reader-engagement";

const brittiSans = localFont({
  src: [
    { path: "./fonts/BrittiSans-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/BrittiSans-LightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/BrittiSans-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/BrittiSans-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "./fonts/BrittiSans-Semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/BrittiSans-SemiboldItalic.otf", weight: "600", style: "italic" },
    { path: "./fonts/BrittiSans-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/BrittiSans-BoldItalic.otf", weight: "700", style: "italic" }
  ],
  variable: "--font-britti-sans",
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
const { preferredSourceEnabled } = googleReaderEngagementConfig();
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={brittiSans.variable}
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
          {preferredSourceEnabled ? (
            <Script
              id="google-preferred-source-queue"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  self.PREFERRED_SOURCE = self.PREFERRED_SOURCE || [];
                  self.PREFERRED_SOURCE.push(function(preferredSource) {
                    self.__tecmamboPreferredSourceClient = preferredSource;
                  });
                `
              }}
            />
          ) : null}
          {preferredSourceEnabled ? (
            <Script
              id="google-preferred-sources"
              src={preferredSourceScriptUrl}
              strategy="afterInteractive"
              preferred-sources-control="manual"
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
