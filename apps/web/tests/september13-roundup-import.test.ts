import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { editorialSeptember13ImportReport } from "@/lib/editorial-bundle-september-13-2026";
import { articles } from "@/lib/sample-data";

const slugs = editorialSeptember13ImportReport.map((entry) => entry.slug);
const imported = slugs.map((slug) => articles.find((article) => article.slug === slug));
const minimumWords = [1300, 1000, 1000, 1000, 1100, 1100, 1000, 900, 1000];

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

describe("September 13 corrected roundup publication", () => {
  it("publishes nine unique, fully approved and indexable articles", () => {
    expect(imported).toHaveLength(9);
    expect(new Set(slugs).size).toBe(9);
    expect(slugs).not.toContain("samsung-galaxy-s26-fe");
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

  it("meets the substantive length targets without prohibited dash characters", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-sept10-12-roundup-2026-09-12.md"), "utf8");
    expect(source).not.toMatch(/[—–�]/);
    imported.forEach((article, index) => {
      const words = articleText(article!).split(/\s+/).filter(Boolean).length;
      expect(words).toBeGreaterThanOrEqual(minimumWords[index]!);
      expect(articleText(article!)).not.toMatch(/[—–�]/);
    });
  });

  it("uses the fixed bylines, expanded taxonomy, and shuffled timestamps", () => {
    expect(imported.filter((article) => article?.author.slug === "lulu-camau")).toHaveLength(5);
    expect(imported.filter((article) => article?.author.slug === "tim-humphreys")).toHaveLength(4);
    const sourceOrderTimes = imported.map((article) => article!.publishedAt);
    expect(sourceOrderTimes).not.toEqual([...sourceOrderTimes].sort());
    expect(new Set(sourceOrderTimes).size).toBe(9);
    expect(imported[0]?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["ai-ethics", "kenya", "politics", "anthropic"]));
    expect(imported[6]?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["robotics", "research", "unitree"]));
    expect(imported[8]?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["security", "software", "fido-alliance"]));
    expect(editorialSeptember13ImportReport.every((entry) => entry.outstandingGates.length === 0)).toBe(true);
  });

  it("preserves every corrected framing in the published records", () => {
    const anthropic = articleText(imported[0]!);
    expect(anthropic).toContain("single operator");
    expect(anthropic).toContain("no evidence Wandayi personally commissioned it");
    expect(anthropic).not.toMatch(/bot network|Cabinet Secretaries/);

    const education = [imported[3]!.title, imported[3]!.quickAnswer, ...imported[3]!.body].join(" ");
    expect(education).toContain("June 9, 2026");
    expect(education).toContain("Stephen Isaboke");
    expect(education).not.toContain("Julius Bitok");

    const android = articleText(imported[8]!);
    expect(android).toContain("isn't a brand-new industry protocol");
    expect(android).toContain("partner apps can impose later requirements");

    const robot = articleText(imported[6]!);
    expect(robot).toContain("separate tracking policy for each motion");
    expect(robot).toContain("August 26, 2026");

    const nubia = articleText(imported[5]!);
    expect(nubia).toContain("reported specifications");
    expect(nubia).toContain("not an independently verifiable product category");
  });

  it("uses every supplied, fully described hero image with the requested credit", () => {
    const expected = {
      "anthropic-kenya-ai-influence-operation-2027-election": ["Anthropic_Claude_Opiyo_Wandai.jpg", "Facebook / Opiyo Wandayi"],
      "absa-bank-kenya-yusuf-omari-ceo-appointment": ["Absa_Bank_Kenya_New_CEO_Yusuf_Omari.jpg", "Nation Media Group"],
      "kenya-fortinet-ai-cybersecurity-talks": ["Kenya_ICT_Ministry_Cybersecurity_Talks_With_Fortinet.jpg", "iStock Editorial"],
      "kenya-digital-learning-junior-schools-status": ["Kenya_Smartboard_Rollout_ICT.jpg", ""],
      "google-gemini-desktop-app-windows-10-11": ["Google_Gemini_Now_Available_Windows.jpg", "WinCentral"],
      "nubia-navix-ultra-doubao-ai-agent-phone": ["Nubia_NaviX_Ultra_ByteDance_Doubao_AI_Assistant.jpg", "Nubia"],
      "beyondmimic-humanoid-robot-sprint-spin-kick": ["UC_Berkeley_Stanford_Humanoid_BeyondMimic.jpg", "Hybrid Robotics / YouTube"],
      "hierascaffold-4d-lidar-autonomous-vehicles": ["Singapore_University_AI_Framework_Training_Self_Driving_Cars.jpg", "David Paul Morris/Bloomberg/Getty Images"],
      "android-password-manager-interoperability-transfer": ["Android_Switching_Password_Managers.jpg", "Google"]
    } as const;
    for (const article of imported) {
      const [filename, credit] = expected[article!.slug as keyof typeof expected];
      expect(article?.image.src).toBe(`/articles/september13/${filename}`);
      expect(article?.image.credit).toBe(credit);
      expect(article?.image.alt).toBeTruthy();
      expect(article?.image.caption).toBeTruthy();
      expect(article?.image.width).toBe(1040);
      expect(article?.image.height).toBe(520);
      expect(existsSync(resolve(process.cwd(), "public", article!.image.src.slice(1)))).toBe(true);
    }
    expect(imported[0]?.image.caption).toContain("no evidence that he commissioned");
    expect(imported[3]?.image.creditOmitted).toBe(true);
    expect(imported[1]?.image.alt).toBe("Yusuf Omari, CEO - Absa Bank Kenya");
  });

  it("places Google's transfer walkthrough below the requested Android section", () => {
    const android = imported[8]!;
    expect(android.mediaSlots).toHaveLength(1);
    expect(android.mediaSlots?.[0]).toMatchObject({
      id: "september13-android-transfer-process",
      src: "/articles/september13/Android_Switching_Password_Managers_Process_By_Google.jpg",
      caption: "Import your passwords to Google Password Manager with just a few clicks. Exporting your data is just as easy.",
      credit: "Google",
      status: "ready"
    });
    const headingIndex = android.body.indexOf("## How the transfer actually works");
    expect(android.body[headingIndex + 1]).toBe("[[media:september13-android-transfer-process]]");
  });

  it("applies the relevant internal link and adds all nine records to RSS and Google News", () => {
    expect(imported[1]?.body.join("\n")).toContain("[Equity and Absa's H1 2026 results](/business/equity-absa-h1-2026-results-digital-banking-kenya)");
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const slug of slugs) {
      expect(rss).toContain(slug);
      expect(news).toContain(slug);
    }
  });
});
