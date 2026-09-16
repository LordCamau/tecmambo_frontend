import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { editorialSeptember16ImportReport } from "@/lib/editorial-bundle-september-16-2026";
import { curateHomeContent } from "@/lib/home-curation";
import { articles } from "@/lib/sample-data";

const slugs = editorialSeptember16ImportReport.map((entry) => entry.slug);
const imported = slugs.map((slug) => articles.find((article) => article.slug === slug));

function articleText(article: NonNullable<(typeof imported)[number]>) {
  return [
    article.title,
    article.seo?.title,
    article.seo?.description,
    article.quickAnswer,
    ...article.body,
    ...(article.faq ?? []).flatMap((entry) => [entry.question, entry.answer]),
    article.image.alt,
    article.image.caption
  ].filter(Boolean).join(" ");
}

describe("September 16 corrected special edition", () => {
  it("publishes two unique, approved and indexable articles", () => {
    expect(imported).toHaveLength(2);
    expect(new Set(slugs).size).toBe(2);
    for (const article of imported) {
      expect(article).toBeDefined();
      expect(article?.author.slug).toBe("tim-humphreys");
      expect(article?.publicationStatus).toBe("publish");
      expect(article?.editorialStatus).toBe("published");
      expect(article?.indexingStatus).toBe("index");
      expect(article?.sourceChecked).toBe(true);
      expect(article?.humanEditorApproved).toBe(true);
      expect(article?.googleAdsEligible).toBe(true);
      expect(article?.isNewsworthy).toBe(true);
      expect(isContentPubliclyEligible(article!)).toBe(true);
      expect(isArticleIndexable(article!)).toBe(true);
      expect(article?.faq?.length).toBeGreaterThanOrEqual(4);
      expect(article?.sources?.every((source) => source.url.startsWith("https://"))).toBe(true);
    }
    expect(editorialSeptember16ImportReport.every((entry) => entry.outstandingGates.length === 0)).toBe(true);
  });

  it("keeps the corrected facts and contains no prohibited dash characters", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-special-edition-corrected-2026-09-16.md"), "utf8");
    expect(source).not.toMatch(/[—–�]/);
    for (const article of imported) expect(articleText(article!)).not.toMatch(/[—–�]/);

    const apple = articleText(imported[0]!);
    expect(apple).toContain("$0.99");
    expect(apple).toContain("KES 128");
    expect(apple).toContain("Apple Music Select");
    expect(apple).toContain("more than 100 countries");

    const court = articleText(imported[1]!);
    expect(court).toContain("closed on June 30, 2026");
    expect(court).toContain("September 15 ruling is a final judgment");
    expect(court).toContain("Francis Gikonyo");
    expect(court).toContain("Roselyne Aburili");
    expect(court).toContain("Tabitha Ouya");
    expect(court).not.toContain("Grace Nzioka");
    expect(court).not.toContain("Tabitha Wanyama");
  });

  it("uses the supplied hero images and requested caption metadata", () => {
    const apple = imported[0]!;
    const court = imported[1]!;
    expect(apple.image).toMatchObject({
      src: "/articles/september16/Apple_TV_Now_Available_in_Kenya.jpg",
      credit: "Apple",
      width: 1040,
      height: 520
    });
    expect(apple.image.alt).toBeTruthy();
    expect(apple.image.caption).toBeTruthy();
    expect(court.image).toMatchObject({
      src: "/articles/september16/Safaricom_Sale_Voided_by_Kenyan_Court.jpg",
      credit: "",
      creditOmitted: true,
      width: 1040,
      height: 520
    });
    expect(court.image.alt).toBeTruthy();
    expect(court.image.caption).toBeTruthy();
    for (const article of imported) {
      expect(existsSync(resolve(process.cwd(), "public", article!.image.src.slice(1)))).toBe(true);
    }
  });

  it("places the Apple expansion image below the requested section", () => {
    const apple = imported[0]!;
    expect(apple.mediaSlots).toHaveLength(1);
    expect(apple.mediaSlots?.[0]).toMatchObject({
      id: "september16-icloud-plus-expansion",
      src: "/articles/september16/Apple_iCloud_Plus_expansion_hero.jpg",
      caption: "iCloud+ subscribers in Kenya will gain access to Apple TV and Apple Arcade as part of their iCloud+ subscription starting this month.",
      credit: "Apple",
      status: "ready"
    });
    const headingIndex = apple.body.indexOf("## What actually changed, and what the price actually is");
    expect(apple.body[headingIndex + 1]).toBe("[[media:september16-icloud-plus-expansion]]");
    expect(existsSync(resolve(process.cwd(), "public/articles/september16/Apple_iCloud_Plus_expansion_hero.jpg"))).toBe(true);
  });

  it("applies internal links, taxonomy and the requested homepage lead", () => {
    const apple = imported[0]!;
    const court = imported[1]!;
    expect(apple.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["business", "kenya", "streaming", "apple"]));
    expect(court.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["business", "kenya", "policy", "telecoms", "safaricom", "vodacom"]));
    expect(apple.body.join("\n")).toContain("/news/apple-surprise-and-shine-keynote-full-recap");
    expect(court.body.join("\n")).toContain("/business/safaricom-board-reshuffle-vodacom-mariam-cassim-matimba-mbungela");
    const home = curateHomeContent(articles, []);
    expect(home.hero.slug).toBe("apple-icloud-plus-apple-tv-arcade-kenya-bundle");
    const placements = [home.hero, ...home.supportingStories, ...home.latestRail, ...home.lanes.flatMap((lane) => lane.articles)];
    expect(placements.filter((article) => article.slug === home.hero.slug)).toHaveLength(2);
  });

  it("adds both records to RSS and Google News", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const slug of slugs) {
      expect(rss).toContain(slug);
      expect(news).toContain(slug);
    }
  });
});
