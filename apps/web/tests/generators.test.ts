import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { buildGoogleNewsSitemap, buildJsonFeed, buildRssFeed } from "../content/feeds";
import { buildLlmsTxt } from "../content/llms";
import { articleToMarkdown, glossaryToMarkdown } from "../content/markdown";
import { articles, brands, glossaryTerms } from "../lib/sample-data";
import { assertAdvertisePageIsPublishable, assertArticlesArePublishable, assertLegalPagesArePublishable, assertNoEditorialTodos } from "../lib/content-guard";
import { legalPageToMarkdown } from "../content/legal-markdown";
import { cookiePage, editorialStandardsPage, legalPages, privacyPage, termsPage } from "../lib/legal-pages";
import { consentCategories, consentModeDenied } from "../lib/cookie-consent";
import { advertiseSettings, populatedAudienceStats } from "../lib/advertise";
import { africaLeadRegionSlugs, africanRegions, getAfricaArticles } from "../lib/regions";
import { africaHubToMarkdown, countryHubToMarkdown } from "../content/region-markdown";
import { articleJsonLd, articleSocialImage } from "../lib/seo";
import { megaNavItems, moreLinks } from "../lib/nav";

describe("content generators", () => {
  it("keeps Africa and Compare Phones as first-level navigation items", () => {
    expect(megaNavItems.map((item) => item.label)).toEqual([
      "Latest",
      "News",
      "Reviews",
      "Wallet Watch",
      "Africa",
      "Business",
      "Compare Phones",
      "Glossary",
      "More"
    ]);
    expect(moreLinks.map((link) => link.label)).not.toEqual(expect.arrayContaining(["Africa", "Compare Phones"]));
  });

  it("builds RSS with canonical article links", () => {
    const rss = buildRssFeed(articles);
    expect(rss).toContain("<rss version=\"2.0\">");
    expect(rss).toContain(
      "https://tecmambo.com/explainers/why-your-phone-gets-hot-when-you-charge-and-use-it-at-the-same-time"
    );
  });

  it("builds JSON Feed items", () => {
    const feed = buildJsonFeed(articles);
    expect(feed.version).toBe("https://jsonfeed.org/version/1.1");
    expect(feed.items[0]?.title).toBe(articles[0]?.title);
  });

  it("builds Google News sitemap XML", () => {
    const sitemap = buildGoogleNewsSitemap([
      {
        ...articles[0]!,
        publishedAt: new Date().toISOString()
      }
    ]);
    expect(sitemap).toContain("xmlns:news");
    expect(sitemap).toContain("<news:publication>");
  });

  it("builds a lean llms.txt map", () => {
    const llms = buildLlmsTxt(articles, glossaryTerms);
    expect(llms).toContain("# tecMAMBO");
    expect(llms).toContain("Markdown mirrors");
  });

  it("mirrors articles and glossary terms as markdown", () => {
    expect(articleToMarkdown(articles[0]!)).toContain("## Why it matters");
    expect(glossaryToMarkdown(glossaryTerms[0]!)).toContain(`# ${glossaryTerms[0]!.term}`);
    expect(glossaryToMarkdown(glossaryTerms[0]!)).toContain("## Go deeper");
  });

  it("blocks editorial TODO notes from rendered article fields", () => {
    expect(() => assertNoEditorialTodos(articles)).not.toThrow();
    expect(() => assertArticlesArePublishable(articles)).not.toThrow();
  });

  it("publishes the WhatsApp usernames story across news, apps, brands, markdown, RSS, and llms.txt", () => {
    const story = articles.find((article) => article.slug === "whatsapp-usernames-reserve-now");
    expect(story).toBeTruthy();
    expect(story?.author.slug).toBe("tim-humphreys");
    expect(story?.format).toBe("news");
    expect(story?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["apps", "whatsapp", "meta"]));
    expect(story?.faq).toHaveLength(5);
    expect(story?.sources?.[0]?.url).toBe("https://blog.whatsapp.com/its-time-to-reserve-your-whatsapp-username");
    expect(story?.image.src).toBe("/articles/whatsapp-usernames-reserve-now.jpg");
    expect(story?.image.alt).toBe("Two people holding a large WhatsApp logo.");
    expect(articleSocialImage(story!)).toEqual({
      url: "https://tecmambo.com/articles/whatsapp-usernames-reserve-now.jpg",
      alt: "Two people holding a large WhatsApp logo.",
      width: 2000,
      height: 1201,
      type: "image/jpeg"
    });

    const markdown = articleToMarkdown(story!);
    expect(markdown).toContain("## Sources");
    expect(markdown).toContain("[WhatsApp Blog: It's time to reserve your WhatsApp username]");

    expect(buildRssFeed(articles.filter((article) => article.format === "news"), "tecMAMBO News", "/news/feed.xml")).toContain(
      "whatsapp-usernames-reserve-now"
    );
  });

  it("uses each article image as its absolute social preview image", () => {
    for (const article of articles) {
      const socialImage = articleSocialImage(article);
      expect(socialImage.alt).toBe(article.image.alt);
      expect(socialImage.url).toMatch(/^https:\/\//);
      expect(socialImage.url).toContain(article.image.src.startsWith("/") ? `tecmambo.com${article.image.src}` : article.image.src);
    }
  });

  it("publishes the 29 country-tagged African tech news stories across feeds and markdown", () => {
    const africaNewsSlugs = [
      "south-africa-digital-economy-pillars-strategy",
      "south-africa-debut-4-ai-creative-fund",
      "volkswagen-south-africa-new-energy-vehicle-crossroads",
      "sars-ai-auto-assessments-2026",
      "rwanda-egypt-ai-partnership",
      "rwanda-digital-public-infrastructure-strategy",
      "smart-africa-ai-council-data-governance",
      "nigeria-airtime-credit-restored-fccpc",
      "nigeria-nimc-act-2026-digital-identity",
      "nigeria-local-smartphone-manufacturing-drive",
      "africa-technology-expo-2026-lagos",
      "nsia-npi-4-startup-prize",
      "openai-academy-nairobi-ruto-altman",
      "cbk-microfinance-capital-squeeze",
      "kenya-national-ai-policy",
      "samsung-galaxy-a27-5g-kenya",
      "tecno-ellaclaw-ai-agent-beta",
      "kenya-space-expo-global-data-festival",
      "aions-ventures-seed-fund-south-africa",
      "holocene-southern-africa-climate-tech-fund",
      "microsoft-south-africa-cloud-ai-investment",
      "livestock-wealth-liquidation",
      "spiro-electric-mobility-funding-round",
      "shuttlers-google-maps-nigeria",
      "nigeria-startup-market-maturing-2026",
      "ai-driven-layoffs-african-tech-nigeria",
      "ayute-rwanda-agritech-challenge-2026",
      "kigali-innovation-city-progress-2026",
      "rwanda-brd-early-stage-tech-debt-fund"
    ];
    const africaNews = africaNewsSlugs.map((slug) => articles.find((article) => article.slug === slug));
    const countrySlugs = new Set(africaNews.flatMap((article) => article?.regions?.map((region) => region.slug) ?? []));
    const uniqueImages = new Set(africaNews.map((article) => article?.image.src));

    expect(africaNews.every(Boolean)).toBe(true);
    expect(africaNews).toHaveLength(29);
    expect(africaNews.every((article) => article?.author.slug === "tim-humphreys")).toBe(true);
    expect(africaNews.every((article) => article?.seo?.title && article.seo.description)).toBe(true);
    expect(africaNews.every((article) => article?.sources?.length)).toBe(true);
    expect(africaNews.every((article) => article?.regions?.length)).toBe(true);
    expect(uniqueImages.size).toBe(29);
    expect(countrySlugs).toEqual(new Set(["kenya", "nigeria", "rwanda", "south-africa"]));
    expect(africaNews.find((article) => article?.slug === "volkswagen-south-africa-new-energy-vehicle-crossroads")?.tags).toEqual(
      expect.arrayContaining([expect.objectContaining({ slug: "volkswagen" })])
    );
    expect(africaNews.find((article) => article?.slug === "nigeria-airtime-credit-restored-fccpc")?.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ slug: "optasia" }),
        expect.objectContaining({ slug: "mtn" }),
        expect.objectContaining({ slug: "airtel" })
      ])
    );
    expect(africaNews.find((article) => article?.slug === "rwanda-digital-public-infrastructure-strategy")?.faq?.length).toBe(2);
    expect(articleJsonLd(africaNews.find((article) => article?.slug === "nigeria-nimc-act-2026-digital-identity")!)["@type"]).toBe(
      "NewsArticle"
    );

    const expectedAfricanImageUpdates = [
      ["south-africa-digital-economy-pillars-strategy", "/articles/south-africa-digital-economy-pillars.jpg", "GovernmentZA / x.com"],
      ["south-africa-debut-4-ai-creative-fund", "/articles/south-africa-debut-4-ai-creative-fund.jpg", "BASA"],
      ["volkswagen-south-africa-new-energy-vehicle-crossroads", "/articles/volkswagen-south-africa-kariega.jpg", "Volkswagen SA"],
      ["sars-ai-auto-assessments-2026", "/articles/sars-ai-auto-assessments-2026.jpg", "Golegal"],
      ["rwanda-egypt-ai-partnership", "/articles/rwanda-egypt-ai-partnership.jpg", "RwandaICT / x.com"],
      ["rwanda-digital-public-infrastructure-strategy", "/articles/rwanda-digital-public-infrastructure.jpg", "AFRwanda / x.com"],
      ["smart-africa-ai-council-data-governance", "/articles/smart-africa-ai-data-governance.jpg", "Smart Africa"],
      ["nigeria-airtime-credit-restored-fccpc", "/articles/nigeria-airtime-credit-restored.jpg", "Webphatic"],
      ["nigeria-nimc-act-2026-digital-identity", "/articles/nigeria-nimc-act-2026.jpg", "NIMC"],
      ["nigeria-local-smartphone-manufacturing-drive", "/articles/nigeria-local-smartphone-manufacturing.jpg", "Billy Ogada | Nation Media Group"],
      ["africa-technology-expo-2026-lagos", "/articles/nigeria-africa-technology-expo-2026.jpg", "CloudsaAfrica / x.com"],
      ["nsia-npi-4-startup-prize", "/articles/nigeria-nsia-npi-4-startup-prize.jpg", "NSIA"],
      ["microsoft-south-africa-cloud-ai-investment", "/articles/microsoft-south-africa-data-centre.jpg", "Microsoft South Africa"]
    ];
    for (const [slug, src, credit] of expectedAfricanImageUpdates) {
      expect(africaNews.find((article) => article?.slug === slug)?.image).toMatchObject({
        src,
        credit,
        width: 1040,
        height: 520,
        type: "image/jpeg"
      });
    }

    const firstStory = africaNews.find((article) => article?.slug === "openai-academy-nairobi-ruto-altman")!;
    const markdown = articleToMarkdown(firstStory);
    expect(markdown).toContain("## Sources");
    expect(africaNews.find((article) => article?.slug === "shuttlers-google-maps-nigeria")?.image).toMatchObject({
      src: "/articles/shuttlers-google-maps-nigeria.jpg",
      credit: "tecMAMBO Media",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(africaNews.find((article) => article?.slug === "kenya-space-expo-global-data-festival")?.image).toMatchObject({
      src: "/articles/kenya-space-expo-conference-2026.jpg",
      credit: "expo.ksa.go.ke",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(africaNews.find((article) => article?.slug === "aions-ventures-seed-fund-south-africa")?.image).toMatchObject({
      src: "/articles/south-africa-r100m-startup-fund.jpg",
      credit: "HERE Technologies",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(africaNews.find((article) => article?.slug === "holocene-southern-africa-climate-tech-fund")?.image).toMatchObject({
      src: "/articles/holocene-southern-africa-climate-tech-fund.jpg",
      credit: "holocene.africa / Instagram",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(africaNews.find((article) => article?.slug === "spiro-electric-mobility-funding-round")?.image).toMatchObject({
      src: "/articles/spiro-electric-mobility.jpg",
      credit: "Spiro",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(buildRssFeed(getAfricaArticles(articles), "tecMAMBO African tech", "/africa/feed.xml")).toContain(
      "openai-academy-nairobi-ruto-altman"
    );
    expect(buildLlmsTxt(articles, glossaryTerms)).toContain("South Africa sets six pillars for its digital economy");
  });

  it("publishes the four SEO-ready Kenya tech news stories across regional and answer surfaces", () => {
    const kenyaNewsSlugs = [
      "vodacom-safaricom-majority-control",
      "kenya-mobile-data-800-million-gb-4g-5g",
      "kenya-ai-policy-connecting-codes-conference",
      "microsoft-elevate-ai-skilling-kenya-counties"
    ];
    const kenyaNews = kenyaNewsSlugs.map((slug) => articles.find((article) => article.slug === slug));
    const firstStory = kenyaNews[0]!;
    const firstStorySchema = articleJsonLd(firstStory) as unknown as Record<string, unknown>;
    const uniqueImages = new Set(kenyaNews.map((article) => article?.image.src));

    expect(kenyaNews.every(Boolean)).toBe(true);
    expect(kenyaNews).toHaveLength(4);
    expect(kenyaNews.every((article) => article?.author.slug === "tim-humphreys")).toBe(true);
    expect(kenyaNews.every((article) => article?.regions?.some((region) => region.slug === "kenya"))).toBe(true);
    expect(kenyaNews.every((article) => article?.seo?.title && article.seo.description)).toBe(true);
    expect(kenyaNews.every((article) => article?.faq?.length === 3)).toBe(true);
    expect(kenyaNews.every((article) => article?.sources?.length)).toBe(true);
    expect(uniqueImages.size).toBe(4);
    expect(firstStory.format).toBe("business");
    expect(firstStory.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["business", "fintech", "safaricom", "vodacom"]));
    expect(kenyaNews[3]?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["ai", "microsoft"]));

    expect(firstStorySchema["@type"]).toBe("NewsArticle");
    expect(firstStorySchema.inLanguage).toBe("en");
    expect(firstStorySchema.isAccessibleForFree).toBe(true);
    expect(firstStorySchema.keywords).toContain("Kenya");
    expect(firstStorySchema.abstract).toBe(firstStory.whyItMatters);
    expect(firstStorySchema.citation).toEqual(
      expect.arrayContaining(["https://www.vodacom.com/news-article.php?articleID=16911"])
    );
    expect(firstStorySchema.contentLocation).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Kenya" })])
    );

    const markdown = articleToMarkdown(firstStory);
    expect(markdown).toContain("## FAQ");
    expect(markdown).toContain("## Sources");
    expect(buildRssFeed(articles.filter((article) => article.format === "news"), "tecMAMBO News", "/news/feed.xml")).toContain(
      "kenya-mobile-data-800-million-gb-4g-5g"
    );
    expect(buildRssFeed(getAfricaArticles(articles), "tecMAMBO African tech", "/africa/feed.xml")).toContain(
      "microsoft-elevate-ai-skilling-kenya-counties"
    );
    expect(buildLlmsTxt(articles, glossaryTerms)).toContain("Vodacom takes majority control of Safaricom");
  });

  it("publishes the AI package with the requested authors, tags, and rich fields", () => {
    const aiPackage = articles.filter((article) => article.id.startsWith("ai-"));
    const uniqueImages = new Set(aiPackage.map((article) => article.image.src));
    const fableFollowUp = aiPackage.find((article) => article.slug === "anthropic-redeploys-fable-5");
    const fableSchema = articleJsonLd(fableFollowUp!) as unknown as Record<string, unknown>;
    const earlierStory = aiPackage.find((article) => article.slug === "anthropic-mythos-models-export-control");

    expect(aiPackage).toHaveLength(13);
    expect(aiPackage.filter((article) => article.author.slug === "tim-humphreys")).toHaveLength(5);
    expect(aiPackage.filter((article) => article.author.slug === "lulu-kiritu")).toHaveLength(8);
    expect(aiPackage.every((article) => article.tags.some((tag) => tag.slug === "ai"))).toBe(true);
    expect(uniqueImages.size).toBe(aiPackage.length);
    expect(brands.find((brand) => brand.slug === "amazon")).toBeTruthy();
    expect(fableFollowUp?.author.slug).toBe("tim-humphreys");
    expect(fableFollowUp?.format).toBe("news");
    expect(fableFollowUp?.faq).toHaveLength(5);
    expect(fableFollowUp?.image.alt).toBe("Claude shown on a phone in front of Anthropic signage. Credit: Claude Security.");
    expect(fableFollowUp?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["ai", "anthropic", "amazon", "microsoft", "google"]));
    expect(fableFollowUp?.sources?.[0]?.url).toBe("https://www.anthropic.com/news/redeploying-fable-5");
    expect(earlierStory?.body.join(" ")).toContain("/news/anthropic-redeploys-fable-5");
    expect(fableFollowUp?.body.join(" ")).toContain("/news/anthropic-mythos-models-export-control");
    expect(fableSchema["@type"]).toBe("NewsArticle");
    expect(fableSchema.keywords).toContain("Anthropic");
    expect(fableSchema.citation).toEqual(expect.arrayContaining(["https://www.anthropic.com/news/redeploying-fable-5"]));
    expect(buildRssFeed(articles.filter((article) => article.format === "news"), "tecMAMBO News", "/news/feed.xml")).toContain(
      "anthropic-redeploys-fable-5"
    );
    expect(buildLlmsTxt(articles, glossaryTerms)).toContain("Claude's most powerful model is back");
    expect(aiPackage.find((article) => article.slug === "what-is-an-ai-agent-really")?.faq).toHaveLength(3);
    expect(aiPackage.find((article) => article.slug === "why-ai-hallucinates-and-how-to-catch-it")?.faq).toHaveLength(3);
    expect(aiPackage.find((article) => article.slug === "gemini-spark-review")?.verdict?.score).toBe("3.5/5");
    expect(aiPackage.find((article) => article.slug === "best-ai-subscription-value-2026")?.itemList).toHaveLength(3);
  });

  it("ships a launch-sized glossary without placeholder text", () => {
    expect(glossaryTerms.length).toBeGreaterThanOrEqual(80);
    expect(glossaryTerms.every((term) => term.oneLiner && term.topics.length && term.difficulty)).toBe(true);
    expect(JSON.stringify(glossaryTerms)).not.toMatch(/\[(verify|todo|draft|tk|confirm)\b/i);
  });

  it("guards legal pages against em dashes and incorrect brand casing", () => {
    expect(() => assertLegalPagesArePublishable(legalPages)).not.toThrow();
  });

  it("guards the Advertise page and keeps unverified audience stats hidden", () => {
    expect(() => assertAdvertisePageIsPublishable(advertiseSettings)).not.toThrow();
    expect(populatedAudienceStats).toHaveLength(0);
    expect(advertiseSettings.form.budgetRanges.length).toBeGreaterThan(0);
    expect(advertiseSettings.faq).toHaveLength(6);
  });

  it("ships the downloadable media-kit PDF asset", () => {
    expect(existsSync(join(process.cwd(), "public", "media", "tecMAMBO-Media-Kit-2026.pdf"))).toBe(true);
  });

  it("mirrors the Terms of Use page as markdown", () => {
    const markdown = legalPageToMarkdown(termsPage);
    expect(markdown).toContain("# Terms of Use");
    expect(markdown).toContain("## 26. How to contact us");
    expect(markdown).toContain("[Privacy Policy](/privacy)");
    expect(markdown).toContain("[Cookie Policy](/cookies)");
  });

  it("mirrors the Privacy Policy page as markdown", () => {
    const markdown = legalPageToMarkdown(privacyPage);
    expect(markdown).toContain("# Privacy Policy");
    expect(markdown).toContain("## 18. How to complain");
    expect(markdown).toContain("[Cookie Policy](/cookies)");
    expect(markdown).toContain("[Terms of Use](/terms)");
    expect(markdown).toContain("[consent tool](/cookies#manage-cookie-preferences)");
  });

  it("mirrors the Cookie Policy page as markdown", () => {
    const markdown = legalPageToMarkdown(cookiePage);
    expect(markdown).toContain("# Cookie Policy");
    expect(markdown).toContain("## 10. More information and how to contact us");
    expect(markdown).toContain("[Privacy Policy](/privacy)");
    expect(markdown).toContain("[Terms of Use](/terms)");
  });

  it("mirrors the Editorial standards page as markdown", () => {
    const markdown = legalPageToMarkdown(editorialStandardsPage);
    expect(markdown).toContain("# Editorial standards");
    expect(markdown).toContain("## 20. Contact us");
    expect(markdown).toContain("[Terms of Use](/terms)");
    expect(markdown).toContain("[About page](/about)");
    expect(markdown).toContain("[editorial contact email]");
  });

  it("keeps Consent Mode defaults privacy-first", () => {
    expect(consentModeDenied).toEqual({
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted"
    });
  });

  it("seeds African regions and tags regional stories without siloing formats", () => {
    expect(africaLeadRegionSlugs).toEqual(["kenya", "nigeria", "south-africa", "rwanda"]);
    expect(africanRegions.length).toBeGreaterThanOrEqual(9);
    const regionalStories = getAfricaArticles(articles);
    expect(regionalStories.length).toBeGreaterThanOrEqual(8);
    expect(new Set(regionalStories.map((article) => article.format)).size).toBeGreaterThan(1);
  });

  it("builds regional hub markdown and region-aware feeds", () => {
    const regionalStories = getAfricaArticles(articles);
    const kenya = africanRegions.find((region) => region.slug === "kenya")!;
    const kenyaStories = regionalStories.filter((article) => article.regions?.some((region) => region.slug === "kenya"));
    const africaMarkdown = africaHubToMarkdown(regionalStories);
    const kenyaMarkdown = countryHubToMarkdown(kenya, kenyaStories);
    const africaFeed = buildRssFeed(regionalStories, "tecMAMBO African tech", "/africa/feed.xml");

    expect(africaMarkdown).toContain("# Tech across Africa");
    expect(kenyaMarkdown).toContain("# Kenya tech news");
    expect(africaFeed).toContain("<category>Kenya</category>");
  });

  it("surfaces regional hubs in llms.txt", () => {
    const llms = buildLlmsTxt(articles, glossaryTerms);
    expect(llms).toContain("## Regional technology hubs");
    expect(llms).toContain("https://tecmambo.com/africa");
    expect(llms).toContain("https://tecmambo.com/africa/kenya/feed.xml");
  });

  it("keeps cookie consent category copy aligned with the Cookie Policy", () => {
    expect(consentCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Strictly necessary",
          description: "Needed for tecMAMBO to work, stay secure, and remember your choices. These are always on.",
          locked: true
        }),
        expect.objectContaining({
          title: "Performance and analytics",
          description: "Help us see what is read so we can make tecMAMBO clearer and better."
        }),
        expect.objectContaining({
          title: "Functionality and preferences",
          description: "Remember settings like light or dark mode for a smoother visit."
        }),
        expect.objectContaining({
          title: "Advertising",
          description: "Used by us and our partners to show and measure ads, including more relevant ones where you allow it."
        }),
        expect.objectContaining({
          title: "Social media",
          description: "Allow embedded posts and share buttons from social platforms."
        })
      ])
    );
  });
});
