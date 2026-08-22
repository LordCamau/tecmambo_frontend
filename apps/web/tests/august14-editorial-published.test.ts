import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "../content/feeds";
import { articleWordCount } from "../lib/article-quality";
import { isArticleIndexable, isContentPubliclyEligible } from "../lib/content-quality";
import { editorialAugust14Records } from "../lib/editorial-bundle-august-14-2026";
import { articlePath } from "../lib/formats";
import { articles, authors } from "../lib/sample-data";
import { articleJsonLd } from "../lib/seo";

const slugs = [
  "whatsapp-scam-alert-on-device-ai-explained",
  "kenya-crypto-vasp-capital-rules-november-2026",
  "instagram-new-wordmark-2026-design-refresh",
  "wsa-banking-index-etf-nse-kenya-explained",
  "spotify-kobalt-licensed-ai-covers-remixes",
  "kenya-cyber-cafe-rules-ca-clarification-privacy",
  "jumia-50-million-ifc-axian-profitability",
  "spotify-ai-persona-badge-synthetic-artists",
  "google-quick-share-tap-to-share-pixel-nfc",
  "mpesa-ethiopia-bank-of-abyssinia-cardless-atm",
  "anthropic-claude-invisible-text-watermarks-explained",
  "kenya-intimate-image-privacy-ruling-2-5-million",
  "disney-tiktok-verts-fan-videos-disney-plus",
  "microsoft-openai-24-1-billion-revenue-concentration",
  "agentic-ai-financial-fraud-kenya-bcg",
  "tiktok-songs-of-live-professional-inbox-creator-tools"
];

const suppliedImageCredits: Record<string, string> = {
  "whatsapp-scam-alert-on-device-ai-explained": "LightRocket",
  "kenya-crypto-vasp-capital-rules-november-2026": "CoinGeek",
  "instagram-new-wordmark-2026-design-refresh": "Daijiworld",
  "wsa-banking-index-etf-nse-kenya-explained": "Kenyan Wall Street",
  "spotify-kobalt-licensed-ai-covers-remixes": "Picture Alliance",
  "kenya-cyber-cafe-rules-ca-clarification-privacy": "Rest of World",
  "jumia-50-million-ifc-axian-profitability": "Jumia",
  "spotify-ai-persona-badge-synthetic-artists": "Spotify",
  "google-quick-share-tap-to-share-pixel-nfc": "Google",
  "mpesa-ethiopia-bank-of-abyssinia-cardless-atm": "Bank of Abyssinia",
  "anthropic-claude-invisible-text-watermarks-explained": "",
  "kenya-intimate-image-privacy-ruling-2-5-million": "Wikipedia",
  "disney-tiktok-verts-fan-videos-disney-plus": "Disney",
  "microsoft-openai-24-1-billion-revenue-concentration": "GeekWire",
  "agentic-ai-financial-fraud-kenya-bcg": "",
  "tiktok-songs-of-live-professional-inbox-creator-tools": ""
};

describe("August 14 published editorial bundle", () => {
  it("publishes all 16 distinct, substantial stories through the gated workflow", () => {
    expect(editorialAugust14Records.map((article) => article.slug)).toEqual(slugs);
    expect(new Set(editorialAugust14Records.map((article) => article.title)).size).toBe(16);
    expect(editorialAugust14Records.every((article) => articleWordCount({ ...article, author: { name: "tecMAMBO Team", slug: "tecmambo-team", role: "Editorial", bio: "Editorial desk", avatar: "", expertise: [] }, regions: [] }) >= 600)).toBe(true);
    expect(editorialAugust14Records.every((article) => article.workflowVersion === "gated")).toBe(true);
    expect(editorialAugust14Records.every((article) => article.publicationStatus === "publish")).toBe(true);
    expect(editorialAugust14Records.every((article) => article.editorialStatus === "published")).toBe(true);
    expect(editorialAugust14Records.every((article) => article.humanEditorApproved === true)).toBe(true);
    expect(editorialAugust14Records.every((article) => article.editor === "Dev Camau")).toBe(true);
    expect(editorialAugust14Records.every((article) => Boolean(article.reviewedAt))).toBe(true);
    expect(editorialAugust14Records.every((article) => article.indexingStatus === "index")).toBe(true);
    expect(editorialAugust14Records.every((article) => article.excludeFromDiscovery === false)).toBe(true);
  });

  it("makes every approved record publicly eligible", () => {
    const author = { name: "tecMAMBO Team", slug: "tecmambo-team", role: "Editorial", bio: "Editorial desk", avatar: "", expertise: [] };
    expect(editorialAugust14Records.every((article) => isContentPubliclyEligible({ ...article, author, regions: [] }))).toBe(true);
  });

  it("publishes every route through search, RSS, News sitemap, and structured data", () => {
    const bundle = slugs.map((slug) => {
      const article = articles.find((item) => item.slug === slug);
      if (!article) throw new Error(`Missing published August 14 article: ${slug}`);
      return article;
    });
    const rss = buildRssFeed(bundle);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-15T10:00:00+03:00"));
    const newsSitemap = buildGoogleNewsSitemap(bundle);
    vi.useRealTimers();

    for (const article of bundle) {
      const path = articlePath(article.format, article.slug);
      const canonical = `https://tecmambo.com${path}`;
      expect(isArticleIndexable(article)).toBe(true);
      expect(rss).toContain(canonical);
      expect(articleJsonLd(article)).toMatchObject({ mainEntityOfPage: canonical });
      if (["news", "business"].includes(article.format)) expect(newsSitemap).toContain(canonical);
    }
  });

  it("uses the requested Tim Humphreys and Lulu Camau bylines", () => {
    const expectedAuthors: Record<string, string> = {
      "microsoft-openai-24-1-billion-revenue-concentration": "tim-humphreys",
      "disney-tiktok-verts-fan-videos-disney-plus": "tim-humphreys",
      "mpesa-ethiopia-bank-of-abyssinia-cardless-atm": "tim-humphreys",
      "spotify-ai-persona-badge-synthetic-artists": "tim-humphreys",
      "kenya-crypto-vasp-capital-rules-november-2026": "tim-humphreys",
      "agentic-ai-financial-fraud-kenya-bcg": "lulu-camau",
      "anthropic-claude-invisible-text-watermarks-explained": "lulu-camau"
    };

    for (const [slug, authorSlug] of Object.entries(expectedAuthors)) {
      expect(articles.find((article) => article.slug === slug)?.author.slug).toBe(authorSlug);
    }
    expect(authors.find((author) => author.slug === "lulu-camau")?.name).toBe("Lulu Camau");
    expect(authors.some((author) => author.slug === "lulu-kiritu")).toBe(false);
  });

  it("records completed source checks and preserves the Songs of LIVE sourcing caveat", () => {
    const sourcePending = editorialAugust14Records.filter((article) => article.sourceChecked !== true).map((article) => article.slug);
    expect(sourcePending).toEqual([]);
    expect(editorialAugust14Records.find((article) => article.slug === "tiktok-songs-of-live-professional-inbox-creator-tools")?.sourceDisclosure).toMatch(/official @tiktoklive account/i);
  });

  it("disables Google ad eligibility for the intimate-image privacy judgment", () => {
    expect(editorialAugust14Records.find((article) => article.slug === "kenya-intimate-image-privacy-ruling-2-5-million")?.googleAdsEligible).toBe(false);
  });

  it("provides unique 16:9 production assets and contains no Unicode em dash", () => {
    expect(new Set(editorialAugust14Records.map((article) => article.image.src)).size).toBe(16);
    for (const article of editorialAugust14Records) {
      const suppliedCredit = suppliedImageCredits[article.slug];
      if (suppliedCredit !== undefined) {
        expect(article.image.src).toMatch(/\.webp$/);
        expect(article.image.width).toBe(1040);
        expect(article.image.height).toBe(520);
        expect(article.image.type).toBe("image/webp");
        expect(article.image.credit).toBe(suppliedCredit);
        if (!suppliedCredit) expect(article.image.creditOmitted).toBe(true);
      } else {
        expect(article.image.src).toMatch(/\.svg$/);
        expect(article.image.width).toBe(1600);
        expect(article.image.height).toBe(900);
        expect(article.image.type).toBe("image/svg+xml");
      }
      expect(existsSync(join(process.cwd(), "public", article.image.src))).toBe(true);
    }
    const source = readFileSync(join(process.cwd(), "lib", "editorial-bundle-august-14-2026.ts"), "utf8");
    expect(source).not.toContain("\u2014");
  });
});
