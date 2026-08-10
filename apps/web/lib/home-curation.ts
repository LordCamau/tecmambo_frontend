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

function uniqueByImage(articles: Article[]) {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.image.src)) return false;
    seen.add(article.image.src);
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
  limit = layout === "feature" ? 4 : 3
) {
  const availableArticles = uniqueByImage(hottestFirst(articles));
  const capped = computingCappedLaneKeys.has(key)
    ? takeWithTagCap(availableArticles, "computing", 1, limit)
    : availableArticles.slice(0, limit);
  uniqueImagesWithinLane(key, capped);
  return { key, eyebrow, title, href, linkLabel, layout, articles: capped };
}

export function curateHomeContent(articles: Article[], glossaryTerms: GlossaryTerm[]) {
  articles = hottestFirst(articles.filter(isContentPubliclyEligible));
  const usedAboveFoldArticleIds = new Set<string>();
  const hero = uniqueByImage(articles)[0] ?? articles[0]!;
  usedAboveFoldArticleIds.add(hero.id);
  const supportingStories = takeWithTagCap(uniqueByImage(articles.filter((article) => !usedAboveFoldArticleIds.has(article.id))), "computing", 1, 2);
  supportingStories.forEach((article) => usedAboveFoldArticleIds.add(article.id));
  const latestRail = takeWithTagCap(uniqueByImage(articles.filter((article) => !usedAboveFoldArticleIds.has(article.id))), "computing", 1, 5);
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

  return {
    hero,
    supportingStories,
    latestRail,
    lanes: [
      lane("smartphones", "Smartphones", "Phones in plain English", "/topics/smartphones", smartphones, "See smartphone stories", "feature"),
      lane("news", "Should you care?", "News that changes what you do next", "/news", news),
      lane("reviews", "Reviews", "Verdicts first, specs second", "/reviews", reviewArticles),
      lane("mobility", "EVs & Mobility", "How transport tech moves in real life", "/topics/evs-mobility", mobility, "See mobility stories", "feature"),
      lane("explains", "MAMBO Explains + Glossary", "Start with the words, then the idea", "/explainers", explainers),
      lane("africa", "Region layer", "Tech across Africa", "/africa", africa, "See all African tech", "feature"),
      lane("wallet", "Wallet Watch", "Useful deals and budget picks", "/wallet-watch", wallet),
      lane("business", "Business", "Startups and the industry behind the screen", "/business", business, "See business stories", "feature"),
      lane("real-life", "MAMBO vs Real Life", "Field tests after the promise", "/real-life", realLife),
      lane("ai", "AI", "Useful AI, without the stage smoke", "/topics/ai", ai, "See AI stories", "feature"),
      lane("evergreen", "In case you missed it", "More from tecMAMBO", "/latest", evergreen)
    ] satisfies HomeLane[],
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
