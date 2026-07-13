import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { AuroraIntro } from "@/components/brand/AuroraIntro";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ImageProtection } from "@/components/media/ImageProtection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { consentModeDenied } from "@/lib/cookie-consent";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteDescription, sitePreviewImage, siteTitle } from "@/lib/site-metadata";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500"],
  display: "swap"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap"
});

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
const auroraIntroScript = `
  (function () {
    var root = document.documentElement;
    try {
      var key = "tm_loader_seen";
      var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || window.sessionStorage.getItem(key) === "1") {
        root.classList.remove("js-intro");
        return;
      }
    } catch (error) {
      return;
    }
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="js-intro" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6410608625427921" />
        <style>{`
          html.js-intro,
          html.js-intro body {
            background: #07060d;
            overflow: hidden;
            scrollbar-gutter: stable;
          }
        `}</style>
        <Script id="tecmambo-aurora-intro-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: auroraIntroScript }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable}`}>
        <AuroraIntro />
        <ThemeProvider>
          <AdSenseScript />
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
