import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "../content/feeds";
import { articleWordCount } from "../lib/article-quality";
import { isArticleIndexable, isContentPubliclyEligible } from "../lib/content-quality";
import { articlePath } from "../lib/formats";
import { articles } from "../lib/sample-data";
import { articleJsonLd, articleSocialImage } from "../lib/seo";

const canonicalSlugs = [
  "apple-airpods-cameras-visual-intelligence-leak-2026",
  "ncba-pesalink-ksh20-flat-fee-kenya",
  "africa-fintech-ipos-opay-palmpay-airtel-money-offshore",
  "on-device-agentic-ai-qualcomm-mediatek-hardware-2026",
  "transsion-hong-kong-listing-africa-smartphone-growth",
  "equity-absa-h1-2026-results-digital-banking-kenya",
  "yellow-series-c-smartphone-solar-financing-africa",
  "eu-dma-interoperability-smartphones-apple-google-2026",
  "anker-kenya-expansion-east-africa-smart-home-ecosystem",
  "kenya-innovation-ecosystem-intelligence-platform-startups-investors-policy",
  "bolt-send-motorbikes-mombasa-last-mile-logistics",
  "standard-bank-unionpay-ecommerce-nine-african-markets",
  "china-car-exports-smart-driving-europe-global-pressure-2026",
  "trusted-saas-cloud-platforms-malware-phishing-europe-2026"
];

const bundle = canonicalSlugs.map((slug) => {
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) throw new Error(`Missing August 21 article: ${slug}`);
  return article;
});

describe("August 21 verified editorial bundle", () => {
  it("publishes 14 unique canonical stories in the requested order", () => {
    expect(bundle.map((article) => article.slug)).toEqual(canonicalSlugs);
    expect(new Set(bundle.map((article) => article.slug)).size).toBe(14);
    for (const article of bundle) {
      expect(articles.filter((entry) => entry.slug === article.slug)).toHaveLength(1);
    }
  });

  it("refreshes the existing EU DMA canonical instead of creating a duplicate", () => {
    const article = bundle[7];
    expect(article.id).toBe("editorial-august10-eu-dma-interoperability-smartphones-apple-google-2026");
    expect(article.format).toBe("opinion");
    expect(article.publishedAt).toBe("2026-08-10T08:48:00+03:00");
    expect(article.updatedAt).toBe("2026-08-21T13:20:00+03:00");
    expect(article.title).toBe("Europe is turning interoperability from a principle into an engineering requirement");
  });

  it("uses the gated publication workflow and passes the public quality gate", () => {
    for (const article of bundle) {
      expect(article.publicationStatus).toBe("publish");
      expect(article.editorialStatus).toBe("published");
      expect(article.indexingStatus).toBe("index");
      expect(article.workflowVersion).toBe("gated");
      expect(article.sourceChecked).toBe(true);
      expect(article.humanEditorApproved).toBe(true);
      expect(article.editor).toBe("Dev Camau");
      expect(article.reviewedAt).toBe("2026-08-21T13:20:00+03:00");
      expect(article.excludeFromDiscovery).toBe(false);
      expect(article.googleAdsEligible).toBe(true);
      expect(article.sources?.length).toBeGreaterThanOrEqual(2);
      expect(articleWordCount(article)).toBeGreaterThanOrEqual(600);
      expect(isContentPubliclyEligible(article)).toBe(true);
      expect(isArticleIndexable(article)).toBe(true);
    }
  });

  it("keeps critical factual distinctions intact", () => {
    const text = Object.fromEntries(bundle.map((article) => [article.slug, article.body.join("\n")]));
    expect(text[canonicalSlugs[0]]).toMatch(/not a retail launch|remains unannounced/i);
    expect(text[canonicalSlugs[1]]).toMatch(/up to KSh 1,000 are free/i);
    expect(text[canonicalSlugs[2]]).toMatch(/not at the same stage/i);
    expect(text[canonicalSlugs[4]]).toMatch(/does not mean trading has started/i);
    expect(text[canonicalSlugs[5]]).toMatch(/Absa.*down 10%/i);
    expect(text[canonicalSlugs[6]]).toMatch(/This story is about Yellow, the asset-financing company/i);
    expect(text[canonicalSlugs[9]]).toMatch(/not a government platform/i);
    expect(text[canonicalSlugs[10]]).toMatch(/not a food-delivery service/i);
    expect(text[canonicalSlugs[11]]).toMatch(/Botswana, Ghana, Kenya, Malawi, Namibia, Tanzania, Uganda, Zambia and Zimbabwe/i);
    expect(text[canonicalSlugs[12]]).toMatch(/not robotaxis/i);
    expect(text[canonicalSlugs[13]]).toMatch(/does not mean GitHub or OneDrive are unsafe products/i);
  });

  it("uses 14 unique 16:9 original hero assets with complete metadata", () => {
    expect(new Set(bundle.map((article) => article.image.src)).size).toBe(14);
    for (const article of bundle) {
      expect(article.image.src).toMatch(/^\/articles\/august21\/.+\.svg$/);
      expect(article.image.width).toBe(1600);
      expect(article.image.height).toBe(900);
      expect(article.image.type).toBe("image/svg+xml");
      expect(article.image.alt.length).toBeGreaterThan(40);
      expect(article.image.credit).toBe("tecMAMBO original illustration");
      expect(existsSync(join(process.cwd(), "public", article.image.src))).toBe(true);
      expect(articleSocialImage(article)).toMatchObject({ width: 1600, height: 900, type: "image/svg+xml" });
    }
    expect(bundle[0].image.alt).toMatch(/concept illustration/i);
    expect(bundle[0].image.alt).toMatch(/not official product photography/i);
  });

  it("publishes RSS, structured data and eligible News sitemap entries", () => {
    const rss = buildRssFeed(bundle);
    const news = buildGoogleNewsSitemap(bundle);
    for (const article of bundle) {
      const canonical = `https://tecmambo.com${articlePath(article.format, article.slug)}`;
      expect(rss).toContain(canonical);
      expect(articleJsonLd(article)).toMatchObject({ mainEntityOfPage: canonical });
      if (article.format === "business") expect(news).toContain(canonical);
      else expect(news).not.toContain(canonical);
    }
  });

  it("contains no public editorial markers or forbidden dash characters", () => {
    const publicCopy = bundle.flatMap((article) => [
      article.title,
      article.seo?.title ?? "",
      article.seo?.description ?? "",
      article.subhead,
      ...article.body
    ]).join("\n");
    expect(publicCopy).not.toMatch(/verification needed|before publication|before publishing|this draft|this piece needs|this article needs|TODO|FIXME|lorem ipsum|\[placeholder\]|source needed|image needed|verify before publishing|insert source/i);
    expect(publicCopy).not.toContain("**");
    expect(publicCopy).not.toContain("\u2014");
    expect(publicCopy).not.toContain("\u2013");
    const moduleSource = readFileSync(join(process.cwd(), "lib", "editorial-bundle-august-21-2026.ts"), "utf8");
    expect(moduleSource).not.toContain("\u2014");
    expect(moduleSource).not.toContain("\u2013");
  });
});
