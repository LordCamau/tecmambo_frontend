import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { articlePath } from "@/lib/formats";
import type { Article } from "@/lib/types";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { RegionList } from "@/components/signature/RegionChip";
import { SponsoredBadge } from "@/components/signature/SponsoredBadge";
import { ArticleCardMeta } from "./ArticleCardMeta";
import styles from "./FeatureStoryCards.module.css";

function cardHeadline(article: Article) {
  return article.cardHeadline?.trim() || article.title;
}

function CardLabels({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <div className={styles.labels}>
      <FormatBadge format={article.format} reviewMethod={article.reviewMethod} size={large ? "large" : "default"} />
      {article.sponsored ? <SponsoredBadge /> : null}
    </div>
  );
}

export function FeatureHeroCard({ article }: { article: Article }) {
  const href = articlePath(article.format, article.slug);

  return (
    <article className={styles.hero}>
      <Link className={styles.heroImage} href={href} aria-label={article.title}>
        <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 1180px) 760px, (min-width: 981px) 64vw, 100vw" />
      </Link>
      <div className={styles.heroCopy}>
        <CardLabels article={article} large />
        <RegionList regions={article.regions?.slice(0, 2)} />
        <h3>
          <Link href={href}>{cardHeadline(article)}</Link>
        </h3>
        <p>{article.excerpt}</p>
        <ArticleCardMeta article={article} />
      </div>
    </article>
  );
}

export function FeatureSecondaryCard({ article }: { article: Article }) {
  const href = articlePath(article.format, article.slug);
  const hasCardHeadline = Boolean(article.cardHeadline?.trim());

  return (
    <article className={styles.secondary}>
      <Link className={styles.secondaryImage} href={href} aria-label={article.title}>
        <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 981px) 132px, (min-width: 641px) 160px, 104px" />
      </Link>
      <div className={styles.secondaryCopy}>
        <CardLabels article={article} />
        <div className={styles.secondaryText}>
          <RegionList regions={article.regions?.slice(0, 2)} />
          <h3 className={clsx(!hasCardHeadline && styles.fallbackHeadline)}>
            <Link href={href} title={hasCardHeadline ? undefined : article.title}>{cardHeadline(article)}</Link>
          </h3>
        </div>
        <ArticleCardMeta article={article} />
      </div>
    </article>
  );
}
