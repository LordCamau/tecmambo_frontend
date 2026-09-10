import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articles } from "@/lib/sample-data";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("homepage feature-card contract", () => {
  it("uses one shared component for every secondary feature story", () => {
    const homepage = source("app/page.tsx");
    expect(homepage).toContain("secondaryArticles.map");
    expect(homepage).toContain("<FeatureSecondaryCard article={article}");
    expect(homepage).not.toContain('level: "lead" | "second" | "small"');
    expect(homepage).not.toContain("featureMiniGrid");
  });

  it("keeps the secondary thumbnail, fallback clamp, and metadata in the shared component", () => {
    const component = source("components/cards/FeatureStoryCards.tsx");
    const css = source("components/cards/FeatureStoryCards.module.css");
    expect(component).toContain("export function FeatureSecondaryCard");
    expect(component).toContain("<ArticleCardMeta article={article}");
    expect(css).toContain("aspect-ratio: 4 / 3");
    expect(css).toContain("-webkit-line-clamp: 3");
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
