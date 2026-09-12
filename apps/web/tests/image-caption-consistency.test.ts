import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { articleToMarkdown } from "../content/markdown";
import { formatImageCaption } from "@/lib/image-caption";
import { articles } from "@/lib/sample-data";

describe("sitewide image caption contract", () => {
  it("uses one punctuated Caption plus Credit string", () => {
    expect(formatImageCaption("A caption without punctuation", "Image Credit: Apple and Xiaomi"))
      .toBe("A caption without punctuation. Credit: Apple and Xiaomi.");
    expect(formatImageCaption("A caption already punctuated.", "Credit: Samsung."))
      .toBe("A caption already punctuated. Credit: Samsung.");
    expect(formatImageCaption(undefined, "Financial Times"))
      .toBe("Credit: Financial Times.");
  });

  it("renders the repeated iPhone Duo and Xiaomi image identically", () => {
    const article = articles.find((item) => item.slug === "xiaomi-18-fold-iphone-duo-design-comparison");
    const repeatedSlot = article?.mediaSlots?.find((slot) => slot.src === article.image.src);
    expect(article).toBeDefined();
    expect(repeatedSlot).toBeDefined();
    expect(formatImageCaption(article?.image.caption, article?.image.credit))
      .toBe("Closed, the resemblance that started the comparison. Credit: Apple and Xiaomi.");
    expect(formatImageCaption(repeatedSlot?.caption, repeatedSlot?.credit))
      .toBe(formatImageCaption(article?.image.caption, article?.image.credit));
  });

  it("keeps the rule in one component and in the Markdown mirror", () => {
    const page = readFileSync(resolve(process.cwd(), "app/(sections)/[section]/[slug]/page.tsx"), "utf8");
    const styles = readFileSync(resolve(process.cwd(), "app/(sections)/[section]/[slug]/page.module.css"), "utf8");
    const captionStyles = readFileSync(resolve(process.cwd(), "components/media/ImageCaption.module.css"), "utf8");
    const contract = readFileSync(resolve(process.cwd(), "components/media/CAPTIONS.md"), "utf8");
    const article = articles.find((item) => item.slug === "xiaomi-18-fold-iphone-duo-design-comparison")!;
    const markdown = articleToMarkdown(article);

    expect(page.match(/<ImageCaption/g)).toHaveLength(3);
    expect(page).not.toContain("Image Credit:");
    expect(styles.match(/\.leadImage figcaption/)).toBeNull();
    expect(captionStyles).toContain("position: static;");
    expect(captionStyles).toContain("background: transparent;");
    expect(captionStyles).not.toContain("position: absolute;");
    expect(contract).toContain("Never overlay caption or credit text on an image.");
    expect(markdown).toContain("Closed, the resemblance that started the comparison. Credit: Apple and Xiaomi.");
    expect(markdown).not.toMatch(/Image credit:/i);
  });
});
