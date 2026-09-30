import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildGoogleNewsSitemap, buildRssFeed } from "@/content/feeds";
import { articlePublicText, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import { editorialSeptember30ImportReport } from "@/lib/editorial-bundle-september-30-2026";
import { articles, editorialSeptember30Articles } from "@/lib/sample-data";

const requestedImages = {
  "sony-japan-ps5-pro-activity-verified-lottery": "/articles/september30/PS5_Japan_Activity_Verified_Lottery.png",
  "copia-kenya-liquidation-high-court-ecommerce": "/articles/september30/Copia_Kenya_Liquidation_After_Two_Years_of_Administration.png",
  "nuran-infratel-starlink-rural-backhaul-nigeria": "/articles/september30/NuRan_Infratel_Starlink_Nigeria.png",
  "njoroge-proposal-mpesa-airtel-money-interest-wallet-balances": "/articles/september30/Patrick_Njoroge_M_PESA_Wallet_Gain_Interest.png",
  "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones": "/articles/september30/Qualcomm_Snapdragon_Sound_Elite.png",
  "cbk-licenses-29-digital-credit-providers-total-281": "/articles/september30/CBK_Digital_Credit_Lenders.png",
  "openai-dots-personal-ai-agents-gpt-6-1-sol": "/articles/september30/OpenAI_Dots_Personal_AI_Agents.png",
  "south-africa-enterprises-ai-workloads-private-infrastructure": "/articles/september30/South_African_Enterprises_Shift_AI_Workloads_From_Public_Cloud.png",
  "uk-tribunal-antitrust-suit-apple-amazon-revived": "/articles/september30/Apple_Amazon_UK_Antitrust_Lawsuit.png",
  "gsma-5g-ghana-nigeria-south-africa-ntn-satellite": "/articles/september30/5G_Rollout_Speeds_Up_Across_Ghana_Nigeria_and_South_Africa.png",
  "mortgagemarket-ai-agent-south-africa-home-loans": "/articles/september30/MortgageMarket_Launches_AI_Agent_to_Automate_South_African_Home_Loan_Applications.png"
} as const;

describe("September 30 editorial bundle import", () => {
  it("imports the 11 supplied articles in their prepared publishing order", () => {
    expect(editorialSeptember30Articles).toHaveLength(11);
    expect(editorialSeptember30ImportReport).toHaveLength(11);
    expect(editorialSeptember30ImportReport.map((entry) => entry.article)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(new Set(editorialSeptember30Articles.map((article) => article.slug)).size).toBe(11);
  });

  it("uses every requested thumbnail with complete accessible metadata", () => {
    for (const [slug, src] of Object.entries(requestedImages)) {
      const article = editorialSeptember30Articles.find((entry) => entry.slug === slug)!;
      expect(article.image).toMatchObject({ src, width: 1774, height: 887, type: "image/png" });
      expect(article.image.alt).toBeTruthy();
      expect(article.image.caption).toBeTruthy();
      expect(article.image.credit).toBeTruthy();
      expect(existsSync(resolve(process.cwd(), "public", src.slice(1)))).toBe(true);
    }
  });

  it("keeps each article to the requested lead thumbnail only", () => {
    for (const article of editorialSeptember30Articles) {
      expect(article.mediaSlots ?? []).toHaveLength(0);
      expect(article.body.join("\n")).not.toMatch(/\[\[media:/);
    }
  });

  it("assigns AI stories to Lulu Camau and non-AI stories to Tim Humphreys", () => {
    const aiSlugs = new Set([
      "qualcomm-snapdragon-sound-elite-gen-2-smart-headphones",
      "openai-dots-personal-ai-agents-gpt-6-1-sol",
      "south-africa-enterprises-ai-workloads-private-infrastructure",
      "mortgagemarket-ai-agent-south-africa-home-loans"
    ]);
    for (const article of editorialSeptember30Articles) {
      expect(article.author.slug).toBe(aiSlugs.has(article.slug) ? "lulu-camau" : "tim-humphreys");
      expect(article.sources?.length).toBeGreaterThan(0);
      expect(article.sources?.every((source) => /^https:\/\//.test(source.url))).toBe(true);
      expect(article.sourceChecked).toBe(true);
      expect(article.humanEditorApproved).toBe(true);
      expect(article.publicationStatus).toBe("publish");
      expect(article.editorialStatus).toBe("published");
      expect(article.indexingStatus).toBe("index");
    }
    expect(editorialSeptember30Articles.filter((article) => article.author.slug === "lulu-camau")).toHaveLength(4);
    expect(editorialSeptember30Articles.filter((article) => article.author.slug === "tim-humphreys")).toHaveLength(7);
  });

  it("preserves the visible FAQ and closing tecMAMBO take", () => {
    for (const article of editorialSeptember30Articles) {
      expect(article.faq?.length).toBeGreaterThanOrEqual(4);
      expect(article.body.at(-2)).toBe("## The tecMAMBO take");
      expect(article.body.at(-1)).toBeTruthy();
      expect(article.body.join("\n")).not.toContain("## Frequently asked questions");
    }
  });

  it("publishes every article to discovery, RSS and the Google News sitemap", () => {
    const eligible = articles.filter(isContentPubliclyEligible);
    const rss = buildRssFeed(eligible);
    const news = buildGoogleNewsSitemap(eligible);
    for (const article of editorialSeptember30Articles) {
      expect(isContentPubliclyEligible(article)).toBe(true);
      expect(isArticleIndexable(article)).toBe(true);
      expect(rss).toContain(article.slug);
      expect(news).toContain(article.slug);
    }
  });

  it("contains no Unicode em dash or en dash in source or imported records", () => {
    const source = readFileSync(resolve(process.cwd(), "../../content/articles/tecmambo-september-30-2026-articles-pack.md"), "utf8");
    expect(source).not.toMatch(/[\u2014\u2013]/);
    for (const article of editorialSeptember30Articles) {
      expect(articlePublicText(article)).not.toMatch(/[\u2014\u2013]/);
      expect(JSON.stringify(article)).not.toMatch(/[\u2014\u2013]/);
    }
  });
});
