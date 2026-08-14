import { articleWordCount } from "@/lib/article-quality";
import { articleQualityIssues, isArticleIndexable, isContentPubliclyEligible } from "@/lib/content-quality";
import type { Article } from "@/lib/types";

export const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

export function isArticleMonetizationEligible(article: Article, preview = false) {
  if (!adsenseEnabled || preview || article.sponsored || article.googleAdsEligible === false) return false;
  if (!isContentPubliclyEligible(article) || !isArticleIndexable(article)) return false;
  if (articleWordCount(article) < 600) return false;
  return articleQualityIssues(article).length === 0;
}

export const neverMonetizedRoutePrefixes = [
  "/about",
  "/advertise",
  "/contact",
  "/cookies",
  "/editorial-standards",
  "/glossary",
  "/newsletter",
  "/preview",
  "/privacy",
  "/search",
  "/terms"
] as const;

export function isNeverMonetizedPath(pathname: string) {
  return neverMonetizedRoutePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
