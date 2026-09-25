import clsx from "clsx";
import type { Article } from "@/lib/types";
import styles from "./ArticleCardMeta.module.css";
import { articleDateTime } from "@/lib/article-dates";

function fallbackReadTime(article: Article) {
  const words = [article.subhead, article.excerpt, ...(article.body ?? [])]
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function ArticleCardMeta({ article, className, showPublicationDate = false }: { article: Article; className?: string; showPublicationDate?: boolean }) {
  const authorName = article.author?.name?.trim() || "tecMAMBO";
  const readTime = article.readTime?.trim() || fallbackReadTime(article);

  return (
    <div className={clsx(styles.meta, className)} aria-label="Article details">
      <span>{authorName}</span>
      {showPublicationDate ? <time dateTime={article.publishedAt}>{articleDateTime(article.publishedAt)}</time> : null}
      <span>{readTime}</span>
    </div>
  );
}
