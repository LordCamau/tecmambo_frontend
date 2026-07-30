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

function isComputingArticle(article: Article) {
  return hasTag(article, "computing");
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

function isSmartphoneOrHardwareReview(article: Article) {
  const hardwareTags = ["smartphones", "wearables", "audio", "computing", "gaming", "smart-homes", "headphones", "smart-watches", "vr-ar"];
  return !isMobilityArticle(article) && article.format !== "business" && (hasTag(article, "smartphones") || (article.format === "review" && hasAnyTag(article, hardwareTags)));
}

function isMobilityArticle(article: Article) {
  return hasTag(article, "evs-mobility");
}

function isBusinessStartupOrFintechArticle(article: Article) {
  return !isComputingArticle(article) && !isMobilityArticle(article) && !isSmartphoneOrHardwareReview(article) && (article.format === "business" || hasAnyTag(article, ["business", "startups", "fintech"]));
}

function pickHeroStory(candidates: Article[], selected: Article[]) {
  const selectedIds = new Set(selected.map((article) => article.id));
  const selectedImages = new Set(selected.map((article) => article.image.src));
  return candidates.find((article) => !selectedIds.has(article.id) && !selectedImages.has(article.image.src));
}

const computingCappedLaneKeys = new Set(["news", "business", "ai", "explains", "evergreen"]);

function newestFirst(articles: Article[]) {
  return [...articles].sort((first, second) => new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime());
}

function pickHeroStories(articles: Article[]) {
  const uniqueArticles = uniqueByImage(newestFirst(articles));
  const selected: Article[] = [];

  const buckets = [
    uniqueArticles.filter(isBusinessStartupOrFintechArticle),
    uniqueArticles.filter(isSmartphoneOrHardwareReview),
    uniqueArticles.filter(isMobilityArticle)
  ];

  for (const candidates of buckets) {
    const article = pickHeroStory(candidates, selected);
    if (article) selected.push(article);
  }

  for (const article of uniqueArticles) {
    if (selected.length >= 3) break;
    if (pickHeroStory([article], selected)) selected.push(article);
  }

  return selected.slice(0, 3);
}

// Editorially pinned hero slider order. These run first, in this exact sequence;
// any that are missing fall back to the automatic category picks below.
const pinnedHeroSlugs = [
  "africa-laptop-llm-challenge-offline-ai-8gb-ram",
  "samsung-galaxy-unpacked-july-2026-everything-announced",
  "basigo-electric-bus-expansion-grid-question"
];

function orderHeroStories(articles: Article[]) {
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const ordered: Article[] = [];
  const usedIds = new Set<string>();
  const usedImages = new Set<string>();

  const add = (article: Article | undefined) => {
    if (!article || usedIds.has(article.id) || usedImages.has(article.image.src)) return;
    ordered.push(article);
    usedIds.add(article.id);
    usedImages.add(article.image.src);
  };

  for (const slug of pinnedHeroSlugs) add(bySlug.get(slug));
  for (const article of pickHeroStories(articles)) {
    if (ordered.length >= 3) break;
    add(article);
  }

  return ordered.slice(0, 3);
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
  const availableArticles = uniqueByImage(articles.filter((article) => !usedArticleIds.has(article.id)));
  const capped = computingCappedLaneKeys.has(key)
    ? takeWithTagCap(availableArticles, "computing", 1, limit)
    : availableArticles.slice(0, limit);
  capped.forEach((article) => usedArticleIds.add(article.id));
  uniqueImagesWithinLane(key, capped);
  return { key, eyebrow, title, href, linkLabel, layout, articles: capped };
}

// Curate a lane's order: force pinnedSlugs to the front (in the given order), drop excludedSlugs
// entirely, then keep the remaining articles in their existing order.
function curateLaneOrder(list: Article[], pinnedSlugs: string[], excludedSlugs: string[] = []) {
  const excluded = new Set(excludedSlugs);
  const bySlug = new Map(list.map((article) => [article.slug, article]));
  const pinned = pinnedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((article): article is Article => Boolean(article))
    .filter((article) => !excluded.has(article.slug));
  const pinnedIds = new Set(pinned.map((article) => article.id));
  const rest = list.filter((article) => !pinnedIds.has(article.id) && !excluded.has(article.slug));
  return [...pinned, ...rest];
}

export function curateHomeContent(articles: Article[], glossaryTerms: GlossaryTerm[]) {
  const usedArticleIds = new Set<string>();
  const heroStories = orderHeroStories(articles);
  heroStories.forEach((article) => usedArticleIds.add(article.id));
  const hero = heroStories[0] ?? articles[0]!;
  const supportingStories = takeWithTagCap(uniqueByImage(articles.filter((article) => !usedArticleIds.has(article.id))), "computing", 1, 2);
  supportingStories.forEach((article) => usedArticleIds.add(article.id));
  const latestRail = takeWithTagCap(uniqueByImage(articles.filter((article) => !usedArticleIds.has(article.id))), "computing", 1, 5);
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
  const mobility = curateLaneOrder(
    filterArticlesByCanonicalTopic(articles, "evs-mobility"),
    ["why-electric-motorbikes-matter-more-than-flashy-ev-launches", "ev-model-explosion-suv-bias"],
    ["kenya-annual-vehicle-emissions-testing-bill-gig-workers"]
  );

  return {
    heroStories,
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
  const { isSubstantialArticle } = await import("@/lib/article-quality");
  const [articles, glossaryTerms] = await Promise.all([getArticles(), getGlossaryTerms()]);
  return curateHomeContent(articles.filter(isSubstantialArticle), glossaryTerms);
}

export type HomeCuration = Awaited<ReturnType<typeof getHomeCuration>>;
export type HomeGlossaryTerm = GlossaryTerm;
