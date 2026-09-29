import { describe, expect, it } from "vitest";
import { articles } from "@/lib/sample-data";

const september29 = articles.filter((article) => article.id.startsWith("editorial-september29-"));

describe("September 29 editorial package", () => {
  it("publishes all 11 shuffled, source-checked articles", () => {
    expect(september29).toHaveLength(11);
    expect(new Set(september29.map((article) => article.slug)).size).toBe(11);

    for (const article of september29) {
      expect(article.author.name).toBe("Tim Humphreys");
      expect(article.publicationStatus).toBe("publish");
      expect(article.editorialStatus).toBe("published");
      expect(article.indexingStatus).toBe("index");
      expect(article.sourceChecked).toBe(true);
      expect(article.humanEditorApproved).toBe(true);
      expect(article.sources?.length).toBeGreaterThanOrEqual(2);
      expect(article.image.caption).toBeTruthy();
      expect(article.inlineImages).toBeUndefined();
      expect(article.mediaSlots).toBeUndefined();

      const editorialText = [
        article.title,
        article.subhead,
        article.excerpt,
        article.whyItMatters,
        ...article.body,
        article.image.alt,
        article.image.caption ?? ""
      ].join(" ");
      expect(editorialText).not.toMatch(/\u2014|&mdash;|&#8212;|&#x2014;/i);
      expect([article.title, ...article.body].join(" ").split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(600);
    }
  });

  it("preserves corrections to unsupported premises from the supplied brief", () => {
    const samsung = september29.find((article) => article.slug.startsWith("samsung-flex-titanium"));
    const india = september29.find((article) => article.slug.startsWith("india-entry-level"));
    const openai = september29.find((article) => article.slug.startsWith("openai-gpt-live"));

    expect(samsung?.title).toContain("Flex Titanium");
    expect(samsung?.body.join(" ")).toContain("There is no official Samsung announcement for a technology named IronFold");
    expect(india?.title.toLowerCase()).toContain("no new central gst cut");
    expect(openai?.body.join(" ")).toContain("No internet service has literally zero latency");
  });
});
