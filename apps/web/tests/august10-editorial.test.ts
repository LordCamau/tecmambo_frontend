import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "../content/feeds";
import { articleToMarkdown } from "../content/markdown";
import { articleWordCount } from "../lib/article-quality";
import { assertArticleImageMetadata, assertArticleSeoMetadata, assertArticlesArePublishable } from "../lib/content-guard";
import { articlePath } from "../lib/formats";
import { articles } from "../lib/sample-data";
import { articleJsonLd } from "../lib/seo";

const slugs = [
  "airtel-bizna-wallet-pochi-la-biashara-price-war-kenya",
  "apple-65-percent-premium-smartphone-market-h1-2026",
  "dji-osmo-360-ii-august-13-launch-what-is-confirmed",
  "google-assistant-shutdown-september-4-gemini",
  "byd-geely-chery-global-top-10-h1-2026",
  "kcb-ncba-coop-bank-ceos-ksh363m-case-explained",
  "pixel-11-proactive-assistance-gemini-context-leak",
  "india-electronics-manufacturing-tax-breaks-2041-apple-suppliers",
  "zeekr-7x-ningbo-fire-previous-collision-investigation",
  "apple-mac-trade-in-values-rise-2026-worth-it",
  "insta360-go-ultra-gemini-ai-voice-assistant-kira",
  "smart-2-micro-ev-miit-filing-2026",
  "pixel-august-2026-update-touch-gpu-fixes",
  "eu-dma-interoperability-smartphones-apple-google-2026",
  "cac-byd-blade-battery-blogger-cai-shen-dao-dispute",
  "snapdragon-x2-enterprise-windows-arm-business-pcs",
  "catl-byd-solid-state-battery-2027-trial-production",
  "apple-telegram-app-store-removal-moderation-power",
  "east-africa-electric-mobility-charging-battery-swap-infrastructure",
  "iphone-windows-clipboard-sync-not-launched-eu-timeline"
];

const bundle = slugs.map((slug) => {
  const article = articles.find((item) => item.slug === slug);
  if (!article) throw new Error(`Missing August 10 article: ${slug}`);
  return article;
});

function articleText(slug: string) {
  const article = bundle.find((item) => item.slug === slug);
  if (!article) throw new Error(`Missing August 10 article text: ${slug}`);
  return articleToMarkdown(article);
}

describe("August 10 verified editorial bundle", () => {
  it("publishes all 20 substantial articles through the existing schema", () => {
    expect(bundle).toHaveLength(20);
    expect(new Set(bundle.map((article) => article.title)).size).toBe(20);
    expect(new Set(bundle.map((article) => article.seo?.description)).size).toBe(20);
    expect(bundle.every((article) => articleWordCount(article) >= 700)).toBe(true);
    expect(bundle.every((article) => article.author.slug === "tim-humphreys")).toBe(true);
    expect(bundle.every((article) => article.publishedAt === article.updatedAt)).toBe(true);
    expect(bundle.every((article) => article.publishedAt.endsWith("+03:00"))).toBe(true);
    expect(bundle.every((article) => article.publicationStatus === "publish")).toBe(true);
    expect(bundle.every((article) => article.editorialStatus === "published")).toBe(true);
    expect(bundle.every((article) => article.indexingStatus === "index")).toBe(true);
    expect(bundle.every((article) => article.faq?.length === 5)).toBe(true);
    expect(bundle.every((article) => (article.sources?.length ?? 0) >= 2)).toBe(true);

    assertArticlesArePublishable(bundle);
    assertArticleSeoMetadata(bundle);
    assertArticleImageMetadata(bundle);
  });

  it("resolves every hero asset and emits production JSON-LD URLs", () => {
    bundle.forEach((article) => {
      const expectedDimensions = article.slug === "byd-geely-chery-global-top-10-h1-2026"
        ? { width: 1040, height: 520 }
        : { width: 1200, height: 675 };
      expect(article.image.width).toBe(expectedDimensions.width);
      expect(article.image.height).toBe(expectedDimensions.height);
      expect(article.image.type).toBe("image/webp");
      expect(existsSync(join(process.cwd(), "public", article.image.src))).toBe(true);

      const schema = articleJsonLd(article) as unknown as Record<string, unknown>;
      expect(schema.mainEntityOfPage).toBe(`https://tecmambo.com${articlePath(article.format, article.slug)}`);
      expect(schema.datePublished).toBe(article.publishedAt);
      expect(schema.dateModified).toBe(article.updatedAt);
      expect(schema.image).toBeTruthy();
    });
  });

  it("uses the supplied hero-image attributions", () => {
    const expectedCredits: Record<string, string> = {
      "airtel-bizna-wallet-pochi-la-biashara-price-war-kenya": "",
      "apple-65-percent-premium-smartphone-market-h1-2026": "",
      "dji-osmo-360-ii-august-13-launch-what-is-confirmed": "DJI",
      "google-assistant-shutdown-september-4-gemini": "Innovation Village",
      "byd-geely-chery-global-top-10-h1-2026": "",
      "kcb-ncba-coop-bank-ceos-ksh363m-case-explained": "",
      "pixel-11-proactive-assistance-gemini-context-leak": "CNET",
      "zeekr-7x-ningbo-fire-previous-collision-investigation": "Shuma IT Jun",
      "apple-mac-trade-in-values-rise-2026-worth-it": "Bloomberg",
      "insta360-go-ultra-gemini-ai-voice-assistant-kira": "Insta360",
      "smart-2-micro-ev-miit-filing-2026": "Instagram | sugardesign_1",
      "pixel-august-2026-update-touch-gpu-fixes": "9TO5Google",
      "eu-dma-interoperability-smartphones-apple-google-2026": "European Commission",
      "cac-byd-blade-battery-blogger-cai-shen-dao-dispute": "BYD",
      "snapdragon-x2-enterprise-windows-arm-business-pcs": "Windows Central",
      "catl-byd-solid-state-battery-2027-trial-production": "Latam Mobility",
      "apple-telegram-app-store-removal-moderation-power": "Reuters",
      "east-africa-electric-mobility-charging-battery-swap-infrastructure": "Kenya Power",
      "iphone-windows-clipboard-sync-not-launched-eu-timeline": "Microsoft"
    };

    for (const [slug, credit] of Object.entries(expectedCredits)) {
      const article = bundle.find((item) => item.slug === slug);
      expect(article?.image.credit).toBe(credit);
      if (!credit) expect(article?.image.creditOmitted).toBe(true);
    }
  });

  it("keeps the mandatory accuracy caveats next to the reporting", () => {
    expect(articleText("google-assistant-shutdown-september-4-gemini")).toMatch(/4 September 2026[\s\S]*several weeks/i);
    expect(articleText("google-assistant-shutdown-september-4-gemini")).toMatch(/Google built-in[\s\S]*(?:not being switched off|keep Assistant)/i);
    expect(articleText("pixel-11-proactive-assistance-gemini-context-leak")).toMatch(/app teardown[\s\S]*12 August 2026/i);
    expect(articleText("pixel-august-2026-update-touch-gpu-fixes")).toMatch(/touch[\s\S]*Pixel 10/i);
    expect(articleText("pixel-august-2026-update-touch-gpu-fixes")).toMatch(/GPU[\s\S]*(?:selected|supported) Pixel 10/i);
    expect(articleText("apple-65-percent-premium-smartphone-market-h1-2026")).toMatch(/65 percent[\s\S]*premium smartphone[\s\S]*wholesale[\s\S]*\$600/i);
    expect(articleText("kcb-ncba-coop-bank-ceos-ksh363m-case-explained")).toMatch(/(?:charged|allegations)[\s\S]*not convicted/i);
    expect(articleText("zeekr-7x-ningbo-fire-previous-collision-investigation")).toMatch(/cause[\s\S]*under investigation/i);
    expect(articleText("catl-byd-solid-state-battery-2027-trial-production")).toMatch(/trial production[\s\S]*not broad mass-market production/i);
    expect(articleText("iphone-windows-clipboard-sync-not-launched-eu-timeline")).toMatch(/has not already rolled out[\s\S]*2027/i);
  });

  it("includes the bundle in RSS and the fresh-news sitemap", () => {
    const rss = buildRssFeed(articles);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-11T10:00:00+03:00"));
    const newsSitemap = buildGoogleNewsSitemap(articles);
    vi.useRealTimers();
    bundle.forEach((article) => {
      const path = articlePath(article.format, article.slug);
      expect(rss).toContain(`https://tecmambo.com${path}`);
      expect(newsSitemap).toContain(`https://tecmambo.com${path}`);
    });
  });
});
