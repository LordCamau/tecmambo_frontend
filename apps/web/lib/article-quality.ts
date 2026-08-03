import type { Article } from "@/lib/types";

export const substantialArticleWordCount = 300;

export function articleWordCount(article: Article) {
  return [
    article.title,
    article.subhead,
    article.excerpt,
    article.whyItMatters,
    ...article.body.filter((block) => !/^\[\[media:[a-z0-9-]+\]\]$/.test(block)),
    article.closingLine ?? "",
    ...(article.faq?.flatMap((item) => [item.question, item.answer]) ?? [])
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function isSubstantialArticle(article: Article) {
  return articleWordCount(article) >= substantialArticleWordCount;
}
