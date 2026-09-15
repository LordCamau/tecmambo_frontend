import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { curateHomeContent } from "@/lib/home-curation";
import { editorialSeptember15ImportReport } from "@/lib/editorial-bundle-september-15-2026";
import { articles } from "@/lib/sample-data";

const slugs = editorialSeptember15ImportReport.map((entry) => entry.slug);
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

describe("September 15 final roundup publication", () => {
  it("publishes seven unique, approved and indexable articles", () => {
    expect(imported).toHaveLength(7);
    expect(new Set(slugs).size).toBe(7);
    for (const article of imported) {
      expect(article).toBeDefined();
      expect(article?.publicationStatus).toBe("publish");
      expect(article?.editorialStatus).toBe("published");
      expect(article?.indexingStatus).toBe("index");
      expect(article?.excludeFromDiscovery).toBe(false);
      expect(article?.sourceChecked).toBe(true);
      expect(article?.humanEditorApproved).toBe(true);
      expect(article?.googleAdsEligible).toBe(true);
      expect(article?.isNewsworthy).toBe(true);
      expect(isContentPubliclyEligible(article!)).toBe(true);
      expect(isArticleIndexable(article!)).toBe(true);
      expect(article?.faq?.length).toBeGreaterThanOrEqual(3);
      expect(article?.sources?.every((source) => source.url.startsWith("https://"))).toBe(true);
    }
  });

  it("preserves the final source and contains no prohibited dash characters", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-sept14-15-roundup-final-2026-09-15.md"), "utf8");
    expect(source).not.toMatch(/[—–�]/);
    for (const article of imported) expect(articleText(article!)).not.toMatch(/[—–�]/);
    expect(articleText(imported[0]!)).toContain("roughly 15% lower power consumption");
    expect(articleText(imported[1]!)).toContain("Google's Gemini models");
    expect(articleText(imported[3]!)).toContain("GT Flow is the company that entered administration");
    expect(articleText(imported[5]!)).toContain("LCD panels, not OLED");
    expect(articleText(imported[5]!)).toContain("SteamOS 3");
  });

  it("uses the fixed bylines, taxonomy and shuffled publication times", () => {
    expect(imported.filter((article) => article?.author.slug === "lulu-camau")).toHaveLength(2);
    expect(imported.filter((article) => article?.author.slug === "tim-humphreys")).toHaveLength(5);
    const sourceOrderTimes = imported.map((article) => article!.publishedAt);
    expect(sourceOrderTimes).not.toEqual([...sourceOrderTimes].sort());
    expect(new Set(sourceOrderTimes).size).toBe(7);
    expect(imported[2]?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["evs-mobility", "kenya", "policy", "kenya-power"]));
    expect(imported[4]?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["ai", "markets", "anthropic", "xai"]));
    expect(imported[5]?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["gaming", "vr-ar", "consumer-tech", "valve"]));
    expect(editorialSeptember15ImportReport.every((entry) => entry.outstandingGates.length === 0)).toBe(true);
  });

  it("uses every supplied hero image with complete alt, caption and credit metadata", () => {
    const expected = {
      "iphone-18-pro-max-us-qualcomm-modem-c2": ["Apple_iPhone_18_Max_Worldwide_C2_Modem.jpg", "David Paul Morris/Bloomberg"],
      "ios-27-release-siri-ai-overhaul-explained": ["Apple_Rollsout_iOS_27_Worldwide.jpg", "Apple"],
      "nairobi-e-mobility-week-2026-kicc": ["Nairobi_Emobility_Week_KICC.jpg", "Kenya Power/Facebook"],
      "twiga-foods-administration-gt-flow-kenya": ["Twiga_Foods_Placed_Under_Administration.jpg", "Twiga Foods"],
      "amodei-altman-musk-ai-slowdown-markets": ["Anthropic_OpenAI_xAI_CEOs_Slowdown_on_AI.jpg", ""],
      "valve-steam-frame-vr-headset-launch": ["Valve_Steam_Frame_Now_Available.jpg", "Valve"],
      "altman-two-ai-scenarios-china-trump-reaction": ["OpenAI_CEO_Sam_Altman.jpg", "Getty Images"]
    } as const;
    for (const article of imported) {
      const [filename, credit] = expected[article!.slug as keyof typeof expected];
      expect(article?.image.src).toBe(`/articles/september15/${filename}`);
      expect(article?.image.credit).toBe(credit);
      expect(article?.image.alt).toBeTruthy();
      expect(article?.image.caption).toBeTruthy();
      expect(article?.image.width).toBe(1040);
      expect(article?.image.height).toBe(520);
      expect(existsSync(resolve(process.cwd(), "public", article!.image.src.slice(1)))).toBe(true);
    }
    expect(imported[4]?.image.creditOmitted).toBe(true);
  });

  it("applies the requested internal links and keeps the iOS 27 story in the hero slot", () => {
    expect(imported[4]?.quickAnswer).toContain("/explainers/altman-two-ai-scenarios-china-trump-reaction");
    expect(imported[6]?.quickAnswer).toContain("/explainers/amodei-altman-musk-ai-slowdown-markets");
    expect(imported[5]?.body.join("\n")).toContain("/explainers/iphone-18-pro-max-us-qualcomm-modem-c2");
    expect(imported[2]?.body.join("\n")).toContain("/business/roam-gen-3-battery-working-boda-boda-riders");
    const home = curateHomeContent(articles, []);
    expect(home.hero.slug).toBe("ios-27-release-siri-ai-overhaul-explained");
    const placements = [home.hero, ...home.supportingStories, ...home.latestRail, ...home.lanes.flatMap((lane) => lane.articles)];
    expect(placements.filter((article) => article.slug === home.hero.slug)).toHaveLength(2);
  });

  it("adds all seven records to RSS and Google News", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const slug of slugs) {
      expect(rss).toContain(slug);
      expect(news).toContain(slug);
    }
  });
});
