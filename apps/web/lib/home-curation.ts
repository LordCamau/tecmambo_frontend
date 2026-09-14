import type { Article, Format, GlossaryTerm } from "@/lib/types";
import { filterArticlesByCanonicalTopic } from "@/lib/site-structure";
import { uniqueImagesWithinLane } from "@/lib/content-guard";
import { getAfricaArticles } from "@/lib/regions";
import { isContentPubliclyEligible } from "@/lib/content-quality";

export type HomeLane = {
  key: string;
  eyebrow: string;
  title: string;
  href: string;
  linkLabel?: string;
  layout?: "grid" | "feature";
  articles: Article[];
};

function byFormat(articles: Article[], format: Format) {
  return articles.filter((article) => article.format === format);
}

function uniqueByArticleAndImage(articles: Article[]) {
  const seenImages = new Set<string>();
  const seenSlugs = new Set<string>();
  return articles.filter((article) => {
    if (seenSlugs.has(article.slug) || seenImages.has(article.image.src)) return false;
    seenSlugs.add(article.slug);
    seenImages.add(article.image.src);
    return true;
  });
}

function hasTag(article: Article, tagSlug: string) {
  return article.tags.some((tag) => tag.slug === tagSlug);
}

function takeWithTagCap(articles: Article[], tagSlug: string, maxTagged: number, limit: number) {
  const selected: Article[] = [];
  let taggedCount = 0;

  for (const article of articles) {
    const matchesTag = hasTag(article, tagSlug);
    if (matchesTag && taggedCount >= maxTagged) continue;

    selected.push(article);
    if (matchesTag) taggedCount += 1;
    if (selected.length >= limit) break;
  }

  return selected;
}

const computingCappedLaneKeys = new Set(["news", "business", "ai", "explains", "evergreen"]);

const homepageFormatPriority: Record<Format, number> = {
  news: 7,
  business: 6,
  opinion: 5,
  "real-life": 4,
  explainer: 3,
  review: 2,
  "wallet-watch": 1
};

// Freshness is the primary signal. Editorial format and update time break ties
// when several stories publish together, which keeps high-impact news visible
// without relying on a stale list of manually pinned article slugs.
function hottestFirst(articles: Article[]) {
  return [...articles].sort((first, second) => {
    const publishedDifference = new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime();
    if (publishedDifference) return publishedDifference;

    const formatDifference = homepageFormatPriority[second.format] - homepageFormatPriority[first.format];
    if (formatDifference) return formatDifference;

    return new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime();
  });
}

function hottestGlossaryTerms(glossaryTerms: GlossaryTerm[]) {
  return [...glossaryTerms].sort((first, second) => {
    const trendDifference = (second.trendingScore ?? 0) - (first.trendingScore ?? 0);
    if (trendDifference) return trendDifference;
    return new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime();
  });
}

function lane(
  key: string,
  eyebrow: string,
  title: string,
  href: string,
  articles: Article[],
  linkLabel?: string,
  layout: HomeLane["layout"] = "grid",
  limit = layout === "feature" ? 5 : 3
) {
  const availableArticles = uniqueByArticleAndImage(hottestFirst(articles));
  const capped = computingCappedLaneKeys.has(key)
    ? takeWithTagCap(availableArticles, "computing", 1, limit)
    : availableArticles.slice(0, limit);
  uniqueImagesWithinLane(key, capped);
  return { key, eyebrow, title, href, linkLabel, layout, articles: capped };
}

export function preferredHomeLaneKey(article: Article) {
  // Regional relevance wins when a story belongs to an African market. This
  // keeps a Kenya story in Tech across Africa instead of repeating it in every
  // broader topical or format lane it also qualifies for.
  if (getAfricaArticles([article]).length) return "africa";
  if (filterArticlesByCanonicalTopic([article], "smartphones").length) return "smartphones";
  if (filterArticlesByCanonicalTopic([article], "evs-mobility").length) return "mobility";
  if (filterArticlesByCanonicalTopic([article], "ai").length) return "ai";

  const formatLane: Partial<Record<Format, string>> = {
    news: "news",
    review: "reviews",
    "wallet-watch": "wallet",
    business: "business",
    "real-life": "real-life",
    explainer: "explains",
    opinion: "evergreen"
  };
  return formatLane[article.format] ?? "evergreen";
}

export function curateHomeContent(articles: Article[], glossaryTerms: GlossaryTerm[]) {
  articles = hottestFirst(articles.filter(isContentPubliclyEligible));
  const usedAboveFoldSlugs = new Set<string>();
  const hero = uniqueByArticleAndImage(articles)[0] ?? articles[0]!;
  usedAboveFoldSlugs.add(hero.slug);
  const supportingStories = takeWithTagCap(uniqueByArticleAndImage(articles.filter((article) => !usedAboveFoldSlugs.has(article.slug))), "computing", 1, 2);
  supportingStories.forEach((article) => usedAboveFoldSlugs.add(article.slug));
  const latestRail = takeWithTagCap(uniqueByArticleAndImage(articles.filter((article) => !usedAboveFoldSlugs.has(article.slug))), "computing", 1, 5);
  latestRail.forEach((article) => usedAboveFoldSlugs.add(article.slug));
  const reviewArticles = byFormat(articles, "review");
  const explainers = byFormat(articles, "explainer");
  const realLife = byFormat(articles, "real-life");
  const wallet = byFormat(articles, "wallet-watch");
  const news = byFormat(articles, "news");
  const business = byFormat(articles, "business");
  const evergreen = articles.filter((article) => ["explainer", "opinion"].includes(article.format));
  const africa = getAfricaArticles(articles);
  const ai = filterArticlesByCanonicalTopic(articles, "ai");
  const smartphones = filterArticlesByCanonicalTopic(articles, "smartphones");
  const mobility = filterArticlesByCanonicalTopic(articles, "evs-mobility");
  const rankedGlossaryTerms = hottestGlossaryTerms(glossaryTerms);

  const laneDefinitions: Array<Omit<HomeLane, "articles"> & { articles: Article[] }> = [
    { key: "smartphones", eyebrow: "Smartphones", title: "Phones in plain English", href: "/topics/smartphones", articles: smartphones, linkLabel: "See smartphone stories", layout: "feature" as const },
    { key: "news", eyebrow: "Should you care?", title: "News that changes what you do next", href: "/news", articles: news },
    { key: "reviews", eyebrow: "Reviews", title: "Verdicts first, specs second", href: "/reviews", articles: reviewArticles },
    { key: "mobility", eyebrow: "EVs & Mobility", title: "How transport tech moves in real life", href: "/topics/evs-mobility", articles: mobility, linkLabel: "See mobility stories", layout: "feature" as const },
    { key: "explains", eyebrow: "MAMBO Explains + Glossary", title: "Start with the words, then the idea", href: "/explainers", articles: explainers },
    { key: "africa", eyebrow: "Region layer", title: "Tech across Africa", href: "/africa", articles: africa, linkLabel: "See all African tech", layout: "feature" as const },
    { key: "wallet", eyebrow: "Wallet Watch", title: "Useful deals and budget picks", href: "/wallet-watch", articles: wallet },
    { key: "business", eyebrow: "Business", title: "Startups and the industry behind the screen", href: "/business", articles: business, linkLabel: "See business stories", layout: "feature" as const },
    { key: "real-life", eyebrow: "MAMBO vs Real Life", title: "Field tests after the promise", href: "/real-life", articles: realLife },
    { key: "ai", eyebrow: "AI", title: "Useful AI, without the stage smoke", href: "/topics/ai", articles: ai, linkLabel: "See AI stories", layout: "feature" as const },
    { key: "evergreen", eyebrow: "In case you missed it", title: "More from tecMAMBO", href: "/latest", articles: evergreen }
  ];

  // Homepage placement contract: a non-hero story can be claimed once. The
  // hero can be claimed one additional time, and only by its preferred lane.
  const placementCounts = new Map<string, number>();
  for (const article of [hero, ...supportingStories, ...latestRail]) {
    placementCounts.set(article.slug, (placementCounts.get(article.slug) ?? 0) + 1);
  }
  const heroLaneKey = preferredHomeLaneKey(hero);
  const preferredLanePriority = ["africa", "smartphones", "mobility", "ai", "news", "reviews", "wallet", "business", "real-life", "explains", "evergreen"];
  const lanePriority = [
    ...preferredLanePriority,
    ...laneDefinitions.map((definition) => definition.key).filter((key) => !preferredLanePriority.includes(key))
  ];
  const curatedLanes = new Map<string, HomeLane>();

  for (const key of lanePriority) {
    const definition = laneDefinitions.find((item) => item.key === key);
    if (!definition) continue;
    const candidates = definition.articles.filter((article) => {
      const count = placementCounts.get(article.slug) ?? 0;
      if (article.slug === hero.slug) return key === heroLaneKey && count < 2;
      return count === 0;
    });
    const curated = lane(
      definition.key,
      definition.eyebrow,
      definition.title,
      definition.href,
      candidates,
      definition.linkLabel,
      definition.layout
    );
    curated.articles.forEach((article) => {
      placementCounts.set(article.slug, (placementCounts.get(article.slug) ?? 0) + 1);
    });
    curatedLanes.set(key, curated);
  }

  return {
    hero,
    supportingStories,
    latestRail,
    lanes: laneDefinitions.map((definition) => curatedLanes.get(definition.key)!).filter(Boolean),
    glossarySpotlight: rankedGlossaryTerms.slice(0, 3),
    bestBuyingGuides: filterArticlesByCanonicalTopic(wallet, "smartphones").slice(0, 2),
    glossaryTerms: rankedGlossaryTerms
  };
}

export async function getHomeCuration() {
  const { getArticles, getGlossaryTerms } = await import("@/lib/content");
  const { isSubstantialArticle } = await import("@/lib/article-quality");
  const [articles, glossaryTerms] = await Promise.all([getArticles(), getGlossaryTerms()]);
  return curateHomeContent(articles.filter(isSubstantialArticle), glossaryTerms);
}

export type HomeCuration = Awaited<ReturnType<typeof getHomeCuration>>;
export type HomeGlossaryTerm = GlossaryTerm;
