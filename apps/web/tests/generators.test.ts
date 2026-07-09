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
import { curateHomeContent } from "../lib/home-curation";

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

  it("curates the homepage in the requested order without repeating highlighted articles", () => {
    const curation = curateHomeContent(articles, glossaryTerms);
    const heroStories = [curation.hero, ...curation.supportingStories];
    const tagSlugs = (article: (typeof articles)[number]) => article.tags.map((tag) => tag.slug);
    const hasTag = (article: (typeof articles)[number], slug: string) => tagSlugs(article).includes(slug);
    const hasAnyTag = (article: (typeof articles)[number], slugs: string[]) => tagSlugs(article).some((slug) => slugs.includes(slug));
    const isMobility = (article: (typeof articles)[number]) => hasTag(article, "evs-mobility");
    const isSmartphoneOrHardwareReview = (article: (typeof articles)[number]) =>
      !isMobility(article) &&
      article.format !== "business" &&
      (hasTag(article, "smartphones") ||
        (article.format === "review" && hasAnyTag(article, ["smartphones", "wearables", "audio", "computing", "gaming", "smart-homes", "headphones", "smart-watches", "vr-ar"])));
    const isBusinessStartupOrFintech = (article: (typeof articles)[number]) =>
      !isMobility(article) && (article.format === "business" || hasAnyTag(article, ["business", "startups", "fintech"]));
    const homepageArticleIds = [
      curation.hero.id,
      ...curation.supportingStories.map((article) => article.id),
      ...curation.latestRail.map((article) => article.id),
      ...curation.lanes.flatMap((lane) => lane.articles.map((article) => article.id))
    ];

    expect(heroStories).toHaveLength(3);
    expect(heroStories.filter(isSmartphoneOrHardwareReview)).toHaveLength(1);
    expect(heroStories.filter(isMobility)).toHaveLength(1);
    expect(heroStories.filter(isBusinessStartupOrFintech)).toHaveLength(1);
    expect(curation.supportingStories).toHaveLength(2);
    expect(curation.latestRail).toHaveLength(5);
    expect(curation.lanes.map((lane) => lane.key)).toEqual([
      "news",
      "smartphones",
      "reviews",
      "mobility",
      "explains",
      "africa",
      "wallet",
      "business",
      "real-life",
      "ai",
      "evergreen"
    ]);
    expect(curation.lanes.map((lane) => `${lane.eyebrow}: ${lane.title}`)).toEqual([
      "Should you care?: News that changes what you do next",
      "Smartphones: Phones in plain English",
      "Reviews: Verdicts first, specs second",
      "EVs & Mobility: How transport tech moves in real life",
      "MAMBO Explains + Glossary: Start with the words, then the idea",
      "Region layer: Tech across Africa",
      "Wallet Watch: Useful deals and budget picks",
      "Business: Startups and the industry behind the screen",
      "MAMBO vs Real Life: Field tests after the promise",
      "AI: Useful AI, without the stage smoke",
      "In case you missed it: More from tecMAMBO"
    ]);
    expect(new Set(homepageArticleIds).size).toBe(homepageArticleIds.length);
  });

  it("builds RSS with canonical article links", () => {
    const rss = buildRssFeed(articles);
    expect(rss).toContain("<rss version=\"2.0\">");
    expect(rss).toContain(
      "https://tecmambo.com/explainers/why-your-phone-gets-hot-when-you-charge-and-use-it-at-the-same-time"
    );
  });

  it("uses the Google Glow image for the phone overheating explainer", () => {
    const story = articles.find((article) => article.slug === "why-your-phone-gets-hot-when-you-charge-and-use-it-at-the-same-time");
    expect(story?.image).toMatchObject({
      src: "/articles/phone-overheating-while-charging.jpg",
      credit: "Google Glow",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(articleSocialImage(story!)).toEqual({
      url: "https://tecmambo.com/articles/phone-overheating-while-charging.jpg",
      alt: "A person looking concerned while using a charging phone. Credit: Google Glow.",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
  });

  it("publishes the conclusive iPhone Air review with verdict, FAQs, specs, and inline images", () => {
    const story = articles.find((article) => article.slug === "iphone-air-review-the-iphone-that-asks-what-you-re-willing-to-give-up");
    const schema = articleJsonLd(story!) as unknown as Record<string, unknown>;
    const markdown = articleToMarkdown(story!);

    expect(story).toBeTruthy();
    expect(story?.title).toBe("iPhone Air review: the iPhone that asks what you're willing to give up");
    expect(story?.author.name).toBe("Tim Humphreys");
    expect(story?.format).toBe("review");
    expect(story?.seo?.description).toBe(
      "The iPhone Air is Apple's thinnest, most beautiful iPhone. After the hype, our verdict on the camera, battery, and whether it is worth the price."
    );
    expect(story?.whyItMatters).toBe(
      "The iPhone Air is the most beautiful iPhone Apple has made, but beauty this thin is paid for in cameras, battery, and sound. Knowing exactly what you give up is the whole decision."
    );
    expect(story?.verdict).toMatchObject({ score: "3.5/5" });
    expect(story?.verdict?.pros).toHaveLength(5);
    expect(story?.verdict?.cons).toHaveLength(5);
    expect(story?.faq).toHaveLength(5);
    expect(story?.image).toMatchObject({
      src: "/articles/iphone-air-review.jpg",
      alt: "Apple iPhone Air product image. Credit: MyAppleStore.",
      credit: "MyAppleStore",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(story?.inlineImages).toHaveLength(3);
    expect(story?.inlineImages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/articles/iphone-air-display-and-thinness.jpg",
          credit: "Sam Rutherford",
          width: 720,
          height: 480
        }),
        expect.objectContaining({
          src: "/articles/iphone-air-camera.jpg",
          credit: "Sam Rutherford",
          width: 720,
          height: 480
        }),
        expect.objectContaining({
          src: "/articles/iphone-air-charging.jpg",
          credit: "Sam Rutherford",
          width: 720,
          height: 480
        })
      ])
    );
    expect(story?.goDeeper?.specs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Thickness", value: "5.6mm" }),
        expect.objectContaining({ label: "Starting price", value: expect.stringContaining("999 US dollars") })
      ])
    );
    expect(story?.body).toEqual(expect.arrayContaining(["## Design and thinness", "## Camera", "## Battery life", "## The verdict"]));
    expect(story?.body.join(" ")).not.toMatch(/must be treated as a draft|first thing to test|second question|third question/i);
    expect(markdown).toContain("![An iPhone Air standing upright to show its display and thin profile. Credit: Sam Rutherford.]");
    expect(markdown).toContain("Image credit: Sam Rutherford");
    expect(markdown).not.toContain("[[image:");
    expect(articleSocialImage(story!)).toEqual({
      url: "https://tecmambo.com/articles/iphone-air-review.jpg",
      alt: "Apple iPhone Air product image. Credit: MyAppleStore.",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(schema["@type"]).toBe("Review");
    expect(schema.reviewRating).toMatchObject({
      "@type": "Rating",
      ratingValue: "3.5",
      bestRating: "5"
    });
    expect(schema.itemReviewed).toMatchObject({ "@type": "Product", name: "Apple iPhone Air" });
  });

  it("publishes the Samsung Galaxy A37 5G review with the requested thumbnail and review schema", () => {
    const story = articles.find((article) => article.slug === "samsung-galaxy-a37-5g-review");
    const schema = articleJsonLd(story!) as unknown as Record<string, unknown>;
    const markdown = articleToMarkdown(story!);

    expect(story).toBeTruthy();
    expect(story?.title).toBe("Samsung Galaxy A37 5G review: a dependable mid-ranger that plays it safe");
    expect(story?.author.name).toBe("Tim Humphreys");
    expect(story?.format).toBe("review");
    expect(story?.tags.map((tag) => tag.slug)).toEqual(expect.arrayContaining(["smartphones", "samsung", "android", "power-batteries"]));
    expect(story?.seo).toEqual({
      title: "Samsung Galaxy A37 5G review: solid, safe, and best on a deal",
      description:
        "The Galaxy A37 5G nails the basics, a great screen, all-day battery, and six years of updates, but plays it safe and cost too much at launch. Our verdict."
    });
    expect(story?.image).toMatchObject({
      src: "/articles/samsung-galaxy-a37-5g-review.jpg",
      alt: "Samsung Galaxy A37 5G product image. Credit: Samsung.",
      credit: "Samsung",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(story?.verdict).toMatchObject({ score: "3.5/5" });
    expect(story?.verdict?.pros).toHaveLength(6);
    expect(story?.verdict?.cons).toHaveLength(5);
    expect(story?.faq).toHaveLength(5);
    expect(story?.inlineImages).toHaveLength(4);
    expect(story?.inlineImages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "galaxy-a37-design",
          src: "/articles/galaxy-a37-5g-options.jpg",
          alt: "Samsung Galaxy A37 5G colour options laid out on a table. Credit: Daniel Schmidt.",
          credit: "Daniel Schmidt",
          width: 720,
          height: 480
        }),
        expect.objectContaining({
          id: "galaxy-a37-display",
          src: "/articles/galaxy-a37-5g-display.jpg",
          alt: "Samsung Galaxy A37 5G display viewed from the front. Credit: Daniel Schmidt.",
          credit: "Daniel Schmidt",
          width: 720,
          height: 480
        }),
        expect.objectContaining({
          id: "galaxy-a37-camera",
          src: "/articles/galaxy-a37-5g-camera.jpg",
          alt: "Samsung Galaxy A37 5G rear camera in close-up. Credit: Daniel Schmidt.",
          credit: "Daniel Schmidt",
          width: 720,
          height: 480
        }),
        expect.objectContaining({
          id: "galaxy-a37-battery",
          src: "/articles/galaxy-a37-5g-charging.jpg",
          alt: "Samsung Galaxy A37 5G USB-C charging ports stacked together. Credit: Daniel Schmidt.",
          credit: "Daniel Schmidt",
          width: 720,
          height: 480
        })
      ])
    );
    expect(story?.body).toEqual(
      expect.arrayContaining([
        "## Design and thinness",
        "## Display",
        "## Performance",
        "## Camera",
        "## Battery life",
        "## Software and updates",
        "## Price and value",
        "## The verdict"
      ])
    );
    expect(story?.goDeeper?.specs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Display", value: expect.stringContaining("6.7-inch Super AMOLED") }),
        expect.objectContaining({ label: "Updates", value: "Six OS upgrades and six years of security updates" }),
        expect.objectContaining({ label: "Price", value: expect.stringContaining("KSh39,999") })
      ])
    );
    expect(markdown).toContain("![Samsung Galaxy A37 5G colour options laid out on a table. Credit: Daniel Schmidt.]");
    expect(markdown).toContain("![Samsung Galaxy A37 5G display viewed from the front. Credit: Daniel Schmidt.]");
    expect(markdown).toContain("Image credit: Daniel Schmidt");
    expect(markdown).toContain("KSh39,999");
    expect(markdown).toContain("## FAQ");
    expect(markdown).toContain("## Sources");
    expect(articleSocialImage(story!)).toEqual({
      url: "https://tecmambo.com/articles/samsung-galaxy-a37-5g-review.jpg",
      alt: "Samsung Galaxy A37 5G product image. Credit: Samsung.",
      width: 1040,
      height: 520,
      type: "image/jpeg"
    });
    expect(schema["@type"]).toBe("Review");
    expect(schema.reviewRating).toMatchObject({
      "@type": "Rating",
      ratingValue: "3.5",
      bestRating: "5"
    });
    expect(schema.itemReviewed).toMatchObject({ "@type": "Product", name: "Samsung Galaxy A37 5G" });
    expect(schema.citation).toEqual(expect.arrayContaining(["https://www.gsmarena.com/samsung_galaxy_a37-14378.php"]));
  });

  it("keeps review pricing useful for Kenyan readers", () => {
    const reviewArticles = articles.filter((article) => article.format === "review");

    expect(reviewArticles.length).toBeGreaterThanOrEqual(3);
    reviewArticles.forEach((article) => {
      const reviewText = [article.body.join(" "), article.goDeeper?.specs.map((spec) => spec.value).join(" ") ?? ""].join(" ");

      expect(reviewText).toMatch(/\bUS dollars\b|\bdollars\b/i);
      expect(reviewText).toMatch(/\bKSh[\d,]+/);
    });
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

  it("publishes the July 9 Kenya news bundle with complete regional metadata", () => {
    const slugs = [
      "starlink-kenya-signup-freeze-seven-counties",
      "safaricom-agm-vodafone-kenya-control",
      "kenya-internet-metering-bill-explained",
      "finance-act-2026-software-cloud-costs-kenya",
      "koko-networks-collapse-assets-sale-carbon-credits",
      "kenya-betting-rules-family-exclusion-grak"
    ];
    const stories = slugs.map((slug) => articles.find((article) => article.slug === slug));

    expect(stories.every(Boolean)).toBe(true);
    expect(stories.map((story) => story?.author.slug)).toEqual(Array(6).fill("tim-humphreys"));
    expect(stories.map((story) => story?.format)).toEqual(["news", "business", "news", "business", "business", "news"]);
    expect(stories.every((story) => story?.regions?.some((region) => region.slug === "kenya"))).toBe(true);
    expect(new Set(stories.map((story) => story?.image.src)).size).toBe(6);
    expect(stories.every((story) => story?.faq?.length === 3)).toBe(true);
    expect(stories.every((story) => JSON.stringify(articleJsonLd(story!)).includes('"contentLocation"'))).toBe(true);
    expect(
      getAfricaArticles(articles)
        .filter((article) => article.regions?.some((region) => region.slug === "kenya"))
        .map((article) => article.slug)
    ).toEqual(expect.arrayContaining(slugs));
    expect(articleToMarkdown(stories[0]!)).toContain("Regions: Kenya");
    expect(buildRssFeed(stories as (typeof articles)[number][])).toContain(slugs[0]);
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
