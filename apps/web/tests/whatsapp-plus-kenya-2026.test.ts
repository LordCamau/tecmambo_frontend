import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "../content/feeds";
import { articleWordCount } from "../lib/article-quality";
import { articleQualityIssues, isArticleIndexable, isContentPubliclyEligible } from "../lib/content-quality";
import { articlePath } from "../lib/formats";
import { getRegion } from "../lib/regions";
import { articles, authors, brands, topics } from "../lib/sample-data";
import { articleJsonLd } from "../lib/seo";
import { buildWhatsAppPlusKenyaArticle } from "../lib/whatsapp-plus-kenya-2026";

const kenya = getRegion("kenya");
if (!kenya) throw new Error("Missing Kenya region.");

const article = buildWhatsAppPlusKenyaArticle({ authors, topics, brands, regions: [kenya] });
const canonicalPath = "/explainers/whatsapp-plus-kenya-ksh-119-features-worth-it";
const publicCopy = [
  article.title,
  article.subhead,
  article.excerpt,
  article.whyItMatters,
  ...article.body,
  ...(article.faq?.flatMap((item) => [item.question, item.answer]) ?? [])
].join("\n");

describe("WhatsApp Plus Kenya publication", () => {
  it("uses the gated publication workflow and remains indexable", () => {
    expect(article.publicationStatus).toBe("publish");
    expect(article.editorialStatus).toBe("published");
    expect(article.sourceChecked).toBe(true);
    expect(article.humanEditorApproved).toBe(true);
    expect(article.editor).toBe("Dev Camau");
    expect(article.reviewedAt).toBeTruthy();
    expect(article.googleAdsEligible).toBe(true);
    expect(articleQualityIssues(article)).toEqual([]);
    expect(isContentPubliclyEligible(article)).toBe(true);
    expect(isArticleIndexable(article)).toBe(true);
  });

  it("preserves the product, pricing and payment guardrails", () => {
    expect(articleWordCount(article)).toBeGreaterThan(2500);
    expect(publicCopy).toContain("optional subscription");
    expect(publicCopy).toContain("does not charge users for sending messages and media or making voice and video calls");
    expect(publicCopy).toContain("pin up to three chats");
    expect(publicCopy).toContain("expands that limit to 20");
    expect(publicCopy).toContain("current locally observed price");
    expect(publicCopy).toContain("some users also seeing a one-month free trial");
    expect(publicCopy).toContain("available payment option for their specific WhatsApp Plus subscription");
    expect(publicCopy).toContain("separate from the WhatsApp Business application");
    expect(publicCopy).toContain("unofficial third-party versions");
    expect(publicCopy).toContain("Meta has not publicly said");
    expect(publicCopy).not.toContain("Plus was WhatsApp's first-ever monetisation");
    expect(publicCopy).not.toContain("**");
  });

  it("ships four complete media provisions with reserved dimensions", () => {
    const media = [article.image, ...(article.mediaSlots ?? [])];
    expect(media).toHaveLength(4);
    expect(article.image).toMatchObject({
      src: "/articles/whatsapp-plus/whatsapp-plus-kenya-hero.webp",
      width: 1672,
      height: 941,
      type: "image/webp"
    });
    expect(article.mediaSlots?.every((slot) => slot.status === "ready")).toBe(true);
    expect(article.mediaSlots?.every((slot) => Boolean(slot.src && slot.alt && slot.width && slot.height))).toBe(true);
  });

  it("renders its comparison, FAQ, sources and real internal links", () => {
    expect(article.comparisonTables).toHaveLength(1);
    expect(article.comparisonTables?.[0].rows.find((row) => row.label === "Pinned chats")?.values).toEqual(["Up to 3", "Up to 20"]);
    expect(article.faq).toHaveLength(11);
    expect(article.sources?.length).toBeGreaterThanOrEqual(8);
    const links = [...publicCopy.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1]);
    const knownPaths = new Set(articles.map((item) => articlePath(item.format, item.slug)));
    expect(links).toEqual([
      "/news/whatsapp-usernames-reserve-now",
      "/explainers/whatsapp-scam-alert-on-device-ai-explained"
    ]);
    links.forEach((link) => expect(knownPaths.has(link)).toBe(true));
  });

  it("contains no unresolved publishing markers or forbidden Unicode dashes", () => {
    expect(publicCopy).not.toMatch(/verification needed|before publication|before publishing|this draft|this piece needs|TODO|FIXME|lorem ipsum|\[placeholder\]|source needed|image needed|verify before publishing/i);
    expect(publicCopy).not.toContain("\u2014");
    expect(publicCopy).not.toContain("\u2013");
  });

  it("appears in feeds and uses canonical structured metadata", () => {
    expect(articlePath(article.format, article.slug)).toBe(canonicalPath);
    expect(articles.some((item) => item.slug === article.slug)).toBe(true);
    expect(buildRssFeed([article])).toContain(`https://tecmambo.com${canonicalPath}`);
    expect(buildGoogleNewsSitemap([article])).not.toContain(`https://tecmambo.com${canonicalPath}`);
    const jsonLd = articleJsonLd(article) as unknown as Record<string, unknown>;
    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd.url).toBe(`https://tecmambo.com${canonicalPath}`);
    expect(jsonLd.headline).toBe(article.title);
  });
});
