import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { googleReaderEngagementConfig, preferredSourceScriptUrl, verifiedGoogleDiscoverUrl } from "../lib/google-reader-engagement";
import { articleShareLinks } from "../lib/share-links";
import { contrastRatio } from "../lib/contrast-tokens";

const root = process.cwd();
const source = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("Google reader engagement", () => {
  it("keeps unverified Google actions disabled by default", () => {
    expect(googleReaderEngagementConfig({})).toEqual({
      preferredSourceEnabled: false,
      discoverUrl: undefined
    });
  });

  it("accepts only an HTTPS profile.google.com Discover destination", () => {
    expect(verifiedGoogleDiscoverUrl("https://profile.google.com/tecmambo")).toBe("https://profile.google.com/tecmambo");
    expect(verifiedGoogleDiscoverUrl("http://profile.google.com/tecmambo")).toBeUndefined();
    expect(verifiedGoogleDiscoverUrl("https://example.com/tecmambo")).toBeUndefined();
    expect(verifiedGoogleDiscoverUrl("not-a-url")).toBeUndefined();
  });

  it("loads Google's official manual-control library once at the root", () => {
    const layout = source("app/layout.tsx");
    const page = source("app/(sections)/[section]/[slug]/page.tsx");
    expect(preferredSourceScriptUrl).toBe("https://news.google.com/swg/js/v1/publisher.js");
    expect(layout).toContain('id="google-preferred-source-queue"');
    expect(layout).toContain('id="google-preferred-sources"');
    expect(layout).toContain('preferred-sources-control="manual"');
    expect(page).not.toContain(preferredSourceScriptUrl);
  });
});

describe("article sharing", () => {
  const canonicalUrl = "https://tecmambo.com/explainers/example-story";
  const title = "A useful tecMAMBO story";

  it("builds platform share links from the canonical URL and title", () => {
    const links = articleShareLinks(canonicalUrl, title);
    expect(new URL(links.facebook).searchParams.get("u")).toBe(canonicalUrl);
    expect(new URL(links.linkedin).searchParams.get("url")).toBe(canonicalUrl);
    expect(new URL(links.x).searchParams.get("url")).toBe(canonicalUrl);
    expect(new URL(links.x).searchParams.get("text")).toBe(title);
    expect(new URL(links.whatsapp).searchParams.get("text")).toBe(`${title}\n${canonicalUrl}`);
  });

  it("places discovery after the lead image and sharing before article-footer utilities", () => {
    const page = source("app/(sections)/[section]/[slug]/page.tsx");
    const leadImage = page.indexOf('className={styles.leadImage}');
    const googlePrompt = page.indexOf("<GoogleSourcePrompt");
    const articleBody = page.indexOf('className={`readable ${styles.body}`}');
    const share = page.indexOf("<ArticleShare");
    const askMambo = page.indexOf('className={styles.ask}');
    const related = page.indexOf('className={`container ${styles.related}`}');

    expect(leadImage).toBeGreaterThan(-1);
    expect(googlePrompt).toBeGreaterThan(leadImage);
    expect(articleBody).toBeGreaterThan(googlePrompt);
    expect(share).toBeGreaterThan(articleBody);
    expect(askMambo).toBeGreaterThan(share);
    expect(related).toBeGreaterThan(askMambo);
  });

  it("provides all five named actions, clipboard fallback, and non-intrusive feedback", () => {
    const component = source("components/engagement/ArticleShare.tsx");
    for (const label of ["Facebook", "LinkedIn", "X", "WhatsApp", "Copy Link"]) {
      expect(component).toContain(label);
    }
    expect(component).toContain('document.execCommand("copy")');
    expect(component).toContain('role="status"');
    expect(component).not.toContain("alert(");
  });

  it("keeps every branded social action at WCAG AA contrast", () => {
    for (const background of ["#0b5fcc", "#0a66c2", "#17171a", "#087d6d"]) {
      expect(contrastRatio("#ffffff", background)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
