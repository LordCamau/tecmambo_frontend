import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/lib/sample-data";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("homepage feature-card contract", () => {
  it("uses one shared component for every secondary feature story", () => {
    const homepage = source("app/page.tsx");
    expect(homepage).toContain("secondaryArticles.map");
    expect(homepage).toContain("supportingStories.map");
    expect(homepage).toContain("<FeatureSecondaryCard article={article}");
    expect(homepage).not.toContain("styles.supportCard");
    expect(homepage).not.toContain("styles.featureRail");
    expect(homepage).not.toContain('level: "lead" | "second" | "small"');
    expect(homepage).not.toContain("featureMiniGrid");
  });

  it("uses one three-column, two-row grid with a spanning hero", () => {
    const css = source("app/page.module.css");
    expect(css).toContain("grid-template-columns: minmax(0, 2fr) repeat(2, minmax(0, 1fr))");
    expect(css).toContain("grid-template-rows: repeat(2, minmax(0, 1fr))");
    expect(css).toContain("grid-row: 1 / span 2");
    expect(css).not.toContain(".featureRail");
  });

  it("keeps the vertical thumbnail, chip, dek, fallback clamp, and metadata in the shared component", () => {
    const component = source("components/cards/FeatureStoryCards.tsx");
    const css = source("components/cards/FeatureStoryCards.module.css");
    expect(component).toContain("export function FeatureSecondaryCard");
    expect(component).toContain('<p className={styles.secondaryDek}>{article.excerpt}</p>');
    expect(component).toContain("<ArticleCardMeta article={article}");
    expect(css).toContain("grid-template-rows: auto 1fr");
    expect(css).toContain("aspect-ratio: 2 / 1");
    expect(css).toContain("-webkit-line-clamp: 3");
    expect(css).not.toContain("grid-template-columns: 128px");
  });

  it("keeps format badges below card images sitewide", () => {
    const storyCard = source("components/cards/StoryCard.tsx");
    const storyCardCss = source("components/cards/StoryCard.module.css");
    expect(storyCard.indexOf('className={styles.body}')).toBeLessThan(storyCard.indexOf('className={styles.badge}'));
    expect(storyCardCss.match(/\.badge\s*\{[^}]*position:\s*absolute/s)).toBeNull();
  });

  it("provides editorial card headlines for the current smartphone feature lane", () => {
    const slugs = [
      "iphone-duo-official-price-specs-kenya",
      "apple-surprise-and-shine-event-2026-preview",
      "snapdragon-8-elite-gen-5-dimensity-9500-agentic-ai",
      "yellow-series-c-smartphone-solar-financing-africa"
    ];

    for (const slug of slugs) {
      const article = articles.find((candidate) => candidate.slug === slug);
      expect(article?.cardHeadline, slug).toBeTruthy();
      expect(article!.cardHeadline!.trim().split(/\s+/).length, slug).toBeGreaterThanOrEqual(8);
      expect(article!.cardHeadline!.trim().split(/\s+/).length, slug).toBeLessThanOrEqual(10);
    }
  });
});
