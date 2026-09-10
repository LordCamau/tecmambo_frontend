import type { Article } from "@/lib/types";

export function isNewsworthyArticle(article: Article) {
  return article.isNewsworthy === true || article.format === "news" || article.format === "business";
}

export function isWithinGoogleNewsWindow(article: Article, now = Date.now()) {
  const publishedAt = new Date(article.publishedAt).getTime();
  const age = now - publishedAt;
  return Number.isFinite(publishedAt) && age >= 0 && age < 48 * 60 * 60 * 1000;
}
