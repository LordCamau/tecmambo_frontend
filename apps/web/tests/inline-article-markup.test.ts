import { describe, expect, it } from "vitest";
import { parseArticleInlineMarkup } from "../lib/inline-article-markup";

describe("article inline markup", () => {
  it("turns paired asterisk emphasis into strong text without exposing markers", () => {
    const source = "**Mariam Cassim** joined on **August 13, 2026** at approximately **55%** ownership.";
    const tokens = parseArticleInlineMarkup(source);

    expect(tokens.filter((token) => token.type === "strong").map((token) => token.value)).toEqual([
      "Mariam Cassim",
      "August 13, 2026",
      "55%"
    ]);
    expect(tokens.map((token) => token.value).join("")).not.toContain("**");
  });

  it("continues to parse internal article links alongside emphasis", () => {
    const tokens = parseArticleInlineMarkup("Read [our **earlier** analysis](/business/example) with **context** and *care*.");
    expect(tokens).toEqual([
      { type: "text", value: "Read ", start: 0 },
      { type: "link", value: "our earlier analysis", href: "/business/example", start: 5 },
      { type: "text", value: " with ", start: 50 },
      { type: "strong", value: "context", start: 56 },
      { type: "text", value: " and ", start: 67 },
      { type: "emphasis", value: "care", start: 72 },
      { type: "text", value: ".", start: 78 }
    ]);
  });
});
