import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { articlePath, formats } from "@/lib/formats";
import { getHomeCuration, type HomeLane } from "@/lib/home-curation";
import { siteDescription, sitePreviewImage, siteTitle } from "@/lib/site-metadata";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { SponsoredBadge } from "@/components/signature/SponsoredBadge";
import { StoryCard } from "@/components/cards/StoryCard";
import { ArticleCardMeta } from "@/components/cards/ArticleCardMeta";
import { FeatureHeroCard, FeatureSecondaryCard } from "@/components/cards/FeatureStoryCards";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { PartnerCard } from "@/components/cards/PartnerCard";
import { RegionPreferencePanel } from "@/components/regions/RegionPreferencePanel";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "tecMAMBO",
    type: "website",
    images: [sitePreviewImage]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [sitePreviewImage.url]
  }
};

function Lane({ lane }: { lane: HomeLane }) {
  if (!lane.articles.length) return null;
  if (lane.layout === "feature") return <FeatureLane lane={lane} />;
  return (
    <section className={`container ${styles.lane}`}>
      <div className={styles.laneHead}>
        <div>
          <p>{lane.eyebrow}</p>
          <h2>{lane.title}</h2>
        </div>
        <Link href={lane.href}>{lane.linkLabel ?? "See all"} →</Link>
      </div>
      {lane.key === "africa" ? <RegionPreferencePanel /> : null}
      <div className={styles.cardGrid}>
        {lane.articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}

function FeatureLane({ lane }: { lane: HomeLane }) {
  const [lead, ...secondaryArticles] = lane.articles;
  if (!lead) return null;
  return (
    <section className={`container ${styles.lane} ${styles.featureLane}`}>
      <div className={styles.laneHead}>
        <div>
          <p>{lane.eyebrow}</p>
          <h2>{lane.title}</h2>
        </div>
        <Link href={lane.href}>{lane.linkLabel ?? "See all"} →</Link>
      </div>
      {lane.key === "africa" ? <RegionPreferencePanel /> : null}
      <div className={styles.featureGrid}>
        <FeatureHeroCard article={lead} />
        <div className={styles.featureRail}>
          {secondaryArticles.map((article) => (
            <FeatureSecondaryCard article={article} key={article.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroArticle({ article }: { article: HomeLane["articles"][number] }) {
  const href = articlePath(article.format, article.slug);

  return (
    <article aria-label="Featured story" className={styles.heroCard}>
      <Link aria-label={article.title} className={styles.heroImage} href={href}>
        <Image
          alt={article.image.alt}
          fill
          priority
          sizes="(min-width: 1180px) 610px, (min-width: 780px) 54vw, calc(100vw - 32px)"
          src={article.image.src}
        />
      </Link>
      <div className={styles.heroBody}>
        <div className={styles.badgeRow}>
          <FormatBadge format={article.format} reviewMethod={article.reviewMethod} />
          {article.sponsored ? <SponsoredBadge /> : null}
        </div>
        <h1>
          <Link href={href}>{article.title}</Link>
        </h1>
        <p className={styles.subhead}>{article.subhead}</p>
        <ArticleCardMeta article={article} className={styles.heroMeta} />
      </div>
    </article>
  );
}

export default async function HomePage() {
  const curation = await getHomeCuration();
  const supportingStories = curation.supportingStories;
  const topStories = curation.latestRail;
  const laneByKey = new Map(curation.lanes.map((lane) => [lane.key, lane]));
  const renderLane = (key: string) => {
    const lane = laneByKey.get(key);
    return lane ? <Lane lane={lane} key={lane.key} /> : null;
  };

  return (
    <div className={styles.page}>
      <section className={styles.heroStage}>
        <div className={`container ${styles.hero}`}>
          <div className={styles.storyStack}>
            <HeroArticle article={curation.hero} />

            <div className={styles.supportGrid}>
              {supportingStories.map((article) => (
                <article className={styles.supportCard} key={article.id}>
                  <Link className={styles.supportImage} href={articlePath(article.format, article.slug)}>
                    <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 1180px) 360px, (min-width: 780px) 42vw, 100vw" />
                  </Link>
                  <div className={styles.supportBody}>
                    <div className={styles.badgeRow}>
                      <FormatBadge format={article.format} reviewMethod={article.reviewMethod} />
                      {article.sponsored ? <SponsoredBadge /> : null}
                    </div>
                    <h2>
                      <Link href={articlePath(article.format, article.slug)}>{article.title}</Link>
                    </h2>
                    <ArticleCardMeta article={article} className={styles.heroMeta} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className={styles.latestRail} aria-labelledby="latest-rail-title">
            <div className={styles.railHead}>
              <p id="latest-rail-title">Top stories</p>
              <Link href="/latest">Latest →</Link>
            </div>
            {topStories.map((article, index) => (
              <Link className={styles.railItem} href={articlePath(article.format, article.slug)} key={article.id}>
                <span className={styles.railNumber}>{index + 1}</span>
                <span className={styles.railCopy}>
                  <small>{article.sponsored ? `Sponsored ${formats[article.format].shortLabel}` : formats[article.format].shortLabel}</small>
                  <strong>{article.title}</strong>
                </span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section className={`container ${styles.siteIntro}`} aria-label="About tecMAMBO">
        <p>
          tecMAMBO is a technology publication in Nairobi, Kenya covering tech news, analysis, and plain-English
          explainers for Kenya, Africa, and readers everywhere.
        </p>
      </section>

      <section className={`container ${styles.threeWays}`}>
        <div className={styles.laneHead}>
          <div>
            <p>Three ways in</p>
            <h2>Choose the kind of clarity you need today</h2>
          </div>
        </div>
        <div className={styles.formatGrid}>
          {(["explainer", "real-life", "wallet-watch"] as const).map((formatKey) => {
            const format = formats[formatKey];
            return (
              <Link href={format.path} key={format.path}>
                <FormatBadge format={formatKey} />
                <strong>{format.label}</strong>
                <span>{format.description}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Suspense>
        {renderLane("smartphones")}
        {renderLane("news")}
        {renderLane("mobility")}
      </Suspense>

      <section className={`container ${styles.teachingLane}`}>
        <div className={styles.laneHead}>
          <div>
            <p>MAMBO Explains + Glossary</p>
            <h2>Start with the words, then the idea</h2>
          </div>
          <div className={styles.doubleLink}>
            <Link href="/explainers">Explainers →</Link>
            <Link href="/glossary">Glossary →</Link>
          </div>
        </div>
        <div className={styles.teachingGrid}>
          {curation.lanes
            .find((lane) => lane.key === "explains")
            ?.articles.map((article) => <StoryCard article={article} key={article.id} />)}
          <div className={styles.glossarySpotlight}>
            {curation.glossarySpotlight.map((term) => (
              <Link href={`/glossary/${term.slug}`} key={term.slug}>
                <strong>{term.term}</strong>
                <span>{term.oneLiner}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Suspense>
        {renderLane("africa")}
        {renderLane("wallet")}
        {renderLane("business")}
      </Suspense>

      <section className={`container ${styles.promoRow}`}>
        <NewsletterCard />
        <PartnerCard />
      </section>

      <Suspense>
        {renderLane("real-life")}
        {renderLane("ai")}
        {renderLane("evergreen")}
      </Suspense>
    </div>
  );
}
