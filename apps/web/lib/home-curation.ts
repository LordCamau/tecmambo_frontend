import type { Article, Format, GlossaryTerm } from "@/lib/types";
import { filterArticlesByCanonicalTopic } from "@/lib/site-structure";
import { uniqueImagesWithinLane } from "@/lib/content-guard";
import { getAfricaArticles } from "@/lib/regions";

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

function hasAnyTag(article: Article, tagSlugs: string[]) {
  const allowed = new Set(tagSlugs);
  return article.tags.some((tag) => allowed.has(tag.slug));
}

function isSmartphoneOrHardwareReview(article: Article) {
  const hardwareTags = ["smartphones", "wearables", "audio", "computing", "gaming", "smart-homes", "headphones", "smart-watches", "vr-ar"];
  return !isMobilityArticle(article) && article.format !== "business" && (hasTag(article, "smartphones") || (article.format === "review" && hasAnyTag(article, hardwareTags)));
}

function isMobilityArticle(article: Article) {
  return hasTag(article, "evs-mobility");
}

function isBusinessStartupOrFintechArticle(article: Article) {
  return !isMobilityArticle(article) && !isSmartphoneOrHardwareReview(article) && (article.format === "business" || hasAnyTag(article, ["business", "startups", "fintech"]));
}

function pickHeroStory(candidates: Article[], selected: Article[]) {
  const selectedIds = new Set(selected.map((article) => article.id));
  const selectedImages = new Set(selected.map((article) => article.image.src));
  return candidates.find((article) => !selectedIds.has(article.id) && !selectedImages.has(article.image.src));
}

function pickHeroStories(articles: Article[]) {
  const uniqueArticles = uniqueByImage(articles);
  const selected: Article[] = [];
  const buckets = [
    uniqueArticles.filter(isSmartphoneOrHardwareReview),
    uniqueArticles.filter(isMobilityArticle),
    uniqueArticles.filter(isBusinessStartupOrFintechArticle)
  ];

  for (const candidates of buckets) {
    const article = pickHeroStory(candidates, selected);
    if (article) selected.push(article);
  }

  const fallback = uniqueArticles.filter((article) => !selected.some((selectedArticle) => selectedArticle.id === article.id));
  while (selected.length < 3 && fallback.length) {
    selected.push(fallback.shift()!);
  }

  return selected.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3);
}

function lane(
  key: string,
  eyebrow: string,
  title: string,
  href: string,
  articles: Article[],
  usedArticleIds: Set<string>,
  linkLabel?: string,
  layout: HomeLane["layout"] = "grid",
  limit = layout === "feature" ? 4 : 3
) {
  const capped = uniqueByImage(articles.filter((article) => !usedArticleIds.has(article.id))).slice(0, limit);
  capped.forEach((article) => usedArticleIds.add(article.id));
  uniqueImagesWithinLane(key, capped);
  return { key, eyebrow, title, href, linkLabel, layout, articles: capped };
}

export function curateHomeContent(articles: Article[], glossaryTerms: GlossaryTerm[]) {
  const usedArticleIds = new Set<string>();
  const heroStories = pickHeroStories(articles);
  heroStories.forEach((article) => usedArticleIds.add(article.id));
  const hero = heroStories[0] ?? articles[0]!;
  const supportingStories = heroStories.slice(1, 3);
  const latestRail = uniqueByImage(articles.filter((article) => !usedArticleIds.has(article.id))).slice(0, 5);
  latestRail.forEach((article) => usedArticleIds.add(article.id));
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

  return {
    hero,
    supportingStories,
    latestRail,
    lanes: [
      lane("news", "Should you care?", "News that changes what you do next", "/news", news, usedArticleIds),
      lane("smartphones", "Smartphones", "Phones in plain English", "/topics/smartphones", smartphones, usedArticleIds, "See smartphone stories", "feature"),
      lane("reviews", "Reviews", "Verdicts first, specs second", "/reviews", reviewArticles, usedArticleIds),
      lane("mobility", "EVs & Mobility", "How transport tech moves in real life", "/topics/evs-mobility", mobility, usedArticleIds, "See mobility stories", "feature"),
      lane("explains", "MAMBO Explains + Glossary", "Start with the words, then the idea", "/explainers", explainers, usedArticleIds),
      lane("africa", "Region layer", "Tech across Africa", "/africa", africa, usedArticleIds, "See all African tech", "feature"),
      lane("wallet", "Wallet Watch", "Useful deals and budget picks", "/wallet-watch", wallet, usedArticleIds),
      lane("business", "Business", "Startups and the industry behind the screen", "/business", business, usedArticleIds, "See business stories", "feature"),
      lane("real-life", "MAMBO vs Real Life", "Field tests after the promise", "/real-life", realLife, usedArticleIds),
      lane("ai", "AI", "Useful AI, without the stage smoke", "/topics/ai", ai, usedArticleIds, "See AI stories", "feature"),
      lane("evergreen", "In case you missed it", "More from tecMAMBO", "/latest", evergreen, usedArticleIds)
    ] satisfies HomeLane[],
    glossarySpotlight: glossaryTerms.slice(0, 3),
    bestBuyingGuides: filterArticlesByCanonicalTopic(wallet, "smartphones").slice(0, 2),
    glossaryTerms
  };
}

export async function getHomeCuration() {
  const { getArticles, getGlossaryTerms } = await import("@/lib/content");
  const [articles, glossaryTerms] = await Promise.all([getArticles(), getGlossaryTerms()]);
  return curateHomeContent(articles, glossaryTerms);
}

export type HomeCuration = Awaited<ReturnType<typeof getHomeCuration>>;
export type HomeGlossaryTerm = GlossaryTerm;
