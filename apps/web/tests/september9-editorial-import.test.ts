import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { editorialSeptember9ImportReport } from "@/lib/editorial-bundle-september-9-2026";
import { isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articles } from "@/lib/sample-data";
import { isWithinGoogleNewsWindow } from "@/lib/newsworthiness";

const slugs = editorialSeptember9ImportReport.map((entry) => entry.slug);
const imported = slugs.map((slug) => articles.find((article) => article.slug === slug));

describe("September 9 editorial bundle import", () => {
  it("publishes ten unique, fully gated articles into discovery", () => {
    expect(imported).toHaveLength(10);
    expect(new Set(slugs).size).toBe(10);
    for (const article of imported) {
      expect(article).toBeDefined();
      expect(article?.publicationStatus).toBe("publish");
      expect(article?.editorialStatus).toBe("published");
      expect(article?.indexingStatus).toBe("index");
      expect(article?.excludeFromDiscovery).toBe(false);
      expect(article?.sourceChecked).toBe(true);
      expect(article?.humanEditorApproved).toBe(true);
      expect(article?.googleAdsEligible).toBe(true);
      expect(article?.editor).toBe("Dev Camau");
      expect(article?.reviewedAt).toBeTruthy();
      expect(article?.sources?.length).toBeGreaterThan(0);
      expect(isContentPubliclyEligible(article!)).toBe(true);
      expect(isArticleIndexable(article!)).toBe(true);
    }
  });

  it("uses every supplied 2:1 image with explicit alt, caption, and credit decisions", () => {
    const expected = {
      "apple-surprise-and-shine-event-2026-preview": ["Upcoming-iPhone-Fold-by-Apple.jpg", "A depiction of the upcoming Apple iPhone Fold", ""],
      "digital-realty-nbo2-nairobi-data-centre-icolo": ["Digital_Realty_NBO2_Facility_Launch_Nairobi.jpg", "John Tanui (centre)", "Justin Ondieki"],
      "ca-kenya-standalone-data-centre-licence-consultation": ["iXAfrica-Data-Centre-Nairobi.jpg", "iXAfrica Data Centre in Nairobi, Kenya", "iXAfrica"],
      "bolt-kenya-10-years-ksh19-billion-investment": ["Bolt-Kenya-A-Decade-Later.jpg", "Bolt boda-boda e-bike riders in Nairobi, Kenya", ""],
      "paratus-g2m-fibre-route-east-africa-2026": ["Laying-Down-Of-Fibre-Optic-Cable-Mombasa.jpg", "Workers haul part of a fibre optic cable", "AFP via Getty Images"],
      "nomba-3-million-debt-facility-africa-asia-payments": ["Nigerias-Nomba-Raises-USD-3-Million.jpg", "Yinka Adewale, CEO and co-founder of Nomba", ""],
      "safaricom-ethiopia-15-million-subscribers-mpesa": ["Safaricom-Ethiopia-15-Million-Subscribers.jpg", "Ethiopian personnel from the Prime Minister's office", "Reuters"],
      "lagos-blockchain-week-nigeria-fintech-week-september-2026": ["Lagos-Nigeria-Africas-Busiest-Tech-City.jpg", "Meta CEO, Mark Zuckerberg", "Pulse Nigeria"],
      "snapdragon-8-elite-gen-5-dimensity-9500-agentic-ai": ["Android_Phones_2026.jpg", "Assortment of Android flagship offerings", "Tom's Guide"],
      "apple-eu-dma-october-2026-developer-terms": ["Apple_App_Store_EU_Ruling.jpg", "Apple logo beside a calendar", ""]
    } as const;

    for (const article of imported) {
      expect(article).toBeDefined();
      const [filename, captionFragment, credit] = expected[article!.slug as keyof typeof expected];
      expect(article!.image.src).toContain(filename);
      expect(article!.image.width).toBe(1040);
      expect(article!.image.height).toBe(520);
      expect(article!.image.alt).toBeTruthy();
      expect(article!.image.caption ?? article!.image.alt).toContain(captionFragment);
      expect(article!.image.credit).toBe(credit);
      if (!credit) expect(article!.image.creditOmitted).toBe(true);
      expect(existsSync(resolve(process.cwd(), "public", article!.image.src.replace(/^\//, "")))).toBe(true);
    }
  });

  it("preserves the source article wording while adding only the required cross-link markup", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/editorial-bundles/tecmambo-editorial-bundle-2026-09-09.md"), "utf8");
    const chunks = source.split(/^# ARTICLE \d+\s*$/m).slice(1);
    expect(chunks).toHaveLength(10);

    chunks.forEach((chunk, index) => {
      const body = chunk.match(/^\s*## Publishing specification\s*\n\n[\s\S]*?\n\n# [^\n]+\n\n([\s\S]*?)\n\n## Sources/m)?.[1]?.trim();
      expect(body).toBeTruthy();
      const importedText = imported[index]!.body
        .join("\n\n")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      expect(importedText).toBe(body);
      expect(importedText).not.toMatch(/[—–�]/);
    });
  });

  it("keeps the finalized byline split and reports every publication gate as cleared", () => {
    expect(imported.filter((article) => article?.author.slug === "tim-humphreys")).toHaveLength(9);
    expect(imported.filter((article) => article?.author.slug === "lulu-camau")).toHaveLength(1);
    expect(imported[8]?.author.slug).toBe("lulu-camau");
    for (const entry of editorialSeptember9ImportReport) {
      expect(entry.imageGateSatisfied).toBe(true);
      expect(entry.outstandingGates).toEqual([]);
      expect(entry.publicationStatus).toBe("published");
    }
  });

  it("includes every article in RSS, with explicitly newsworthy stories in Google News", () => {
    const published = imported.map((article) => article!);
    const rss = buildRssFeed(published);
    const news = buildGoogleNewsSitemap(published);
    for (const article of published) {
      expect(rss).toContain(article.slug);
      if ((article.format === "news" || article.format === "business" || article.isNewsworthy) && isWithinGoogleNewsWindow(article)) expect(news).toContain(article.slug);
      else expect(news).not.toContain(article.slug);
    }
  });
});
