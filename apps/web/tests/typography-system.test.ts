import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const source = (path: string) => readFileSync(resolve(root, path), "utf8");

function filesUnder(path: string): string[] {
  const absolute = resolve(root, path);
  return readdirSync(absolute).flatMap((entry) => {
    const child = resolve(absolute, entry);
    return statSync(child).isDirectory()
      ? filesUnder(child.slice(root.length + 1))
      : [child];
  });
}

describe("Britti Sans typography system", () => {
  it("self-hosts every available production weight and italic", () => {
    const layout = source("app/layout.tsx");
    expect(layout).toContain('from "next/font/local"');
    expect(layout).not.toContain('from "next/font/google"');
    expect(layout).toContain('variable: "--font-britti-sans"');
    for (const file of [
      "BrittiSans-Light.otf",
      "BrittiSans-LightItalic.otf",
      "BrittiSans-Regular.otf",
      "BrittiSans-RegularItalic.otf",
      "BrittiSans-Semibold.otf",
      "BrittiSans-SemiboldItalic.otf",
      "BrittiSans-Bold.otf",
      "BrittiSans-BoldItalic.otf"
    ]) {
      expect(existsSync(resolve(root, "app/fonts", file)), file).toBe(true);
      expect(layout).toContain(file);
    }
  });

  it("uses one family and central typography tokens", () => {
    const tokens = source("styles/tokens.css");
    expect(tokens).toContain("--font-sans: var(--font-britti-sans), Arial, sans-serif");
    expect(tokens).toContain("--font-display: var(--font-sans)");
    expect(tokens).toContain("--font-body: var(--font-sans)");
    for (const token of [
      "--type-display",
      "--type-article-h1",
      "--type-section-h2",
      "--type-card-title",
      "--type-deck",
      "--type-body",
      "--type-body-mobile",
      "--type-meta",
      "--type-label",
      "--type-nav",
      "--type-button"
    ]) expect(tokens).toContain(token);
  });

  it("removes App Sans, Inter, unsupported weights, and decorative gradients from interface CSS", () => {
    const css = ["app", "components", "styles"].flatMap(filesUnder).filter((file) => file.endsWith(".css"));
    const combined = css.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(combined).not.toMatch(/App Sans|\bInter\b/);
    expect(combined).not.toMatch(/font-weight:\s*(?:100|200|500|800|900)\b/);
    expect(combined).not.toMatch(/(?:linear|radial|conic)-gradient\(/);
  });

  it("renders editorial labels as plain text rather than pills", () => {
    const badge = source("components/signature/FormatBadge.module.css");
    const mainRule = badge.match(/\.badge\.badge\s*\{([\s\S]*?)\}/)?.[1] ?? "";
    expect(mainRule).not.toMatch(/background|border(?:-radius)?:/);
    expect(mainRule).toContain("padding: 0");
    expect(mainRule).toContain("font-weight: 600");

    const glossary = source("app/glossary/glossary.module.css");
    expect(glossary.match(/\.pill,[\s\S]*?\{([\s\S]*?)\}/)?.[1]).not.toMatch(/background|border(?:-radius)?:/);
  });

  it("keeps every editorial image provision at 2:1 across breakpoints", () => {
    const featureCards = source("components/cards/FeatureStoryCards.module.css");
    const storyCards = source("components/cards/StoryCard.module.css");
    const article = source("app/(sections)/[section]/[slug]/page.module.css");
    expect(featureCards).not.toContain("aspect-ratio: 5 / 2");
    expect(featureCards.match(/aspect-ratio: 2 \/ 1/g)?.length).toBeGreaterThanOrEqual(3);
    expect(storyCards).toContain("aspect-ratio: 2 / 1");
    expect(article.match(/aspect-ratio: 2 \/ 1/g)?.length).toBeGreaterThanOrEqual(2);
  });
});
