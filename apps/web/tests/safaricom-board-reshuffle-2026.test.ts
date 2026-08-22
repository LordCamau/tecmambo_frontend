import { describe, expect, it, vi } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "../content/feeds";
import { articles, authors, brands, topics } from "../lib/sample-data";
import { articleWordCount } from "../lib/article-quality";
import { articleQualityIssues, isArticleIndexable, isContentPubliclyEligible } from "../lib/content-quality";
import { articlePath } from "../lib/formats";
import { getRegion } from "../lib/regions";
import { articleJsonLd } from "../lib/seo";
import { buildSafaricomBoardReshuffleArticle } from "../lib/safaricom-board-reshuffle-2026";

const kenya = getRegion("kenya");
if (!kenya) throw new Error("Missing Kenya region.");

const article = buildSafaricomBoardReshuffleArticle({ authors, topics, brands, regions: [kenya] });
const canonicalPath = "/business/safaricom-board-reshuffle-vodacom-mariam-cassim-matimba-mbungela";

describe("Safaricom board reshuffle publication", () => {
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

  it("preserves the core factual guardrails and original analysis", () => {
    const publicCopy = [article.title, article.subhead, article.whyItMatters, ...article.body, ...(article.faq?.flatMap((item) => [item.question, item.answer]) ?? [])].join("\n");
    expect(articleWordCount(article)).toBeGreaterThan(1800);
    expect(publicCopy).toContain("August 13, 2026");
    expect(publicCopy).toContain("subject to regulatory approvals");
    expect(publicCopy).toContain("Chief Executive Officer of Vodacom Fintech Group and Group Partnerships");
    expect(publicCopy).toContain("Chief Officer for Human Resources");
    expect(publicCopy).toContain("James Ludlow");
    expect(publicCopy).toContain("Dr. John Kipngetich Mosonik");
    expect(publicCopy).toContain("approximately 55%");
    expect(publicCopy).toContain("A 15% Safaricom stake acquired from the Government of Kenya.");
    expect(publicCopy).toContain("A further effective 5% interest acquired from Vodafone Group.");
    expect(publicCopy).toContain("A non-executive director does not run M-Pesa day to day.");
    expect(publicCopy).not.toContain("**");
  });

  it("ships the four supplied media assets with reserved dimensions", () => {
    const media = [article.image, ...(article.mediaSlots ?? [])];
    expect(media).toHaveLength(4);
    expect(article.image).toMatchObject({
      src: "/articles/safaricom-board/Vodacom_Mariam_Cassim_And_Matiba_Mbugela_Safaricom_Non_Executive_Directors_tecMAMBO.jpg",
      credit: "",
      creditOmitted: true,
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(article.mediaSlots?.every((slot) => slot.status === "ready")).toBe(true);
    expect(article.mediaSlots?.every((slot) => Boolean(slot.src && slot.alt && slot.width && slot.height))).toBe(true);
    expect(article.mediaSlots?.map((slot) => slot.src)).toEqual([
      "/articles/safaricom-board/Vodacom_Mariam_Cassim_Safaricom_Non_Executive_Director_tecMAMBO.jpg",
      "/articles/safaricom-board/Vodacom_Matiba_Mbugela_Safaricom_Non_Executive_Director_tecMAMBO.jpg",
      "/articles/safaricom-board/Safaricom_Ownership_and_Governance_tecMAMBO.jpg"
    ]);
  });

  it("uses real internal routes and contains no unresolved publishing markers", () => {
    const copy = [article.title, article.subhead, article.excerpt, article.whyItMatters, ...article.body].join("\n");
    const links = [...copy.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1]);
    const knownPaths = new Set(articles.map((item) => articlePath(item.format, item.slug)));
    expect(links).toHaveLength(4);
    links.forEach((link) => expect(knownPaths.has(link)).toBe(true));
    expect(copy).not.toMatch(/verification needed|before publication|before publishing|this draft|this piece needs|TODO|FIXME|lorem ipsum|\[placeholder\]|source needed|image needed|verify before publishing/i);
    expect(copy).not.toContain("\u2014");
  });

  it("appears in public feeds, search data and structured metadata", () => {
    expect(articlePath(article.format, article.slug)).toBe(canonicalPath);
    expect(articles.some((item) => item.slug === article.slug)).toBe(true);
    expect(buildRssFeed([article])).toContain(`https://tecmambo.com${canonicalPath}`);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-15T10:00:00+03:00"));
    expect(buildGoogleNewsSitemap([article])).toContain(`https://tecmambo.com${canonicalPath}`);
    vi.useRealTimers();
    const jsonLd = articleJsonLd(article) as unknown as Record<string, unknown>;
    expect(jsonLd["@type"]).toBe("NewsArticle");
    expect(jsonLd.url).toBe(`https://tecmambo.com${canonicalPath}`);
    expect(jsonLd.headline).toBe(article.title);
  });
});
