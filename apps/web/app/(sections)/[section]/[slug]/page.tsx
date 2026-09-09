import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Article, GlossaryTerm } from "@/lib/types";
import { formats, articlePath } from "@/lib/formats";
import { getArticleBySlug, getArticles, getGlossaryTerms, getRelatedArticles } from "@/lib/content";
import { getCmsArticleBySlug } from "@/lib/cms/source";
import {
  articleJsonLd,
  articleSocialImage,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  dealProductJsonLd,
  faqJsonLd,
  itemListJsonLd
} from "@/lib/seo";
import { findPlaceholderIssues, isArticleIndexable, isArchiveIndexable, isContentPubliclyEligible, reviewCanShowScore } from "@/lib/content-quality";
import { renderGlossaryText, type GlossaryLinkState } from "@/lib/glossary-linking";
import { filterArticlesByCanonicalTopic, getTopicArchive, sectionFormatMap } from "@/lib/site-structure";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { GoDeeper } from "@/components/signature/GoDeeper";
import { RegionList } from "@/components/signature/RegionChip";
import { SponsoredBadge } from "@/components/signature/SponsoredBadge";
import { TagList } from "@/components/signature/TagChip";
import { WhyItMatters } from "@/components/signature/WhyItMatters";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { YouTubeEmbed } from "@/components/media/YouTubeEmbed";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "./page.module.css";
import { isArticleMonetizationEligible } from "@/lib/monetization";
import { parseArticleInlineMarkup } from "@/lib/inline-article-markup";

type Params = Promise<{ section: string; slug: string }>;

export const dynamicParams = true;
export const revalidate = 300;

const pricePattern =
  /(?:\b(?:KSh|KES|USD)\s?\d[\d,]*(?:\.\d+)?\b|\b\d[\d,.]*(?:\s+to\s+\d[\d,.]*)?\s+(?:US\s+dollars?|dollars?)\b)/g;

function highlightPriceText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pricePattern)) {
    const value = match[0];
    const start = match.index ?? 0;
    const end = start + value.length;

    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <span className={styles.priceHighlight} key={`${keyPrefix}-price-${start}`}>
        {value}
      </span>
    );
    cursor = end;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : [text];
}

function highlightPriceNodes(nodes: ReactNode[], enabled: boolean, keyPrefix: string): ReactNode[] {
  if (!enabled) return nodes;
  return nodes.flatMap((node, index) => (typeof node === "string" ? highlightPriceText(node, `${keyPrefix}-${index}`) : [node]));
}

function renderArticleText(text: string, terms: GlossaryTerm[], state: GlossaryLinkState, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  for (const token of parseArticleInlineMarkup(text)) {
    if (token.type === "link") {
      nodes.push(<Link href={token.href} key={`${keyPrefix}-link-${token.start}`}>{token.value}</Link>);
      continue;
    }
    if (token.type === "strong") {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${token.start}`}>
          {renderGlossaryText(token.value, terms, state)}
        </strong>
      );
      continue;
    }
    if (token.type === "emphasis") {
      nodes.push(
        <em key={`${keyPrefix}-emphasis-${token.start}`}>
          {renderGlossaryText(token.value, terms, state)}
        </em>
      );
      continue;
    }
    nodes.push(...renderGlossaryText(token.value, terms, state));
  }
  return nodes;
}

function isPhoneReview(article: Article) {
  return article.format === "review" && article.tags.some((tag) => tag.kind === "topic" && ["phones", "smartphones"].includes(tag.slug));
}

function ArticleBodyBlock({
  paragraph,
  inlineImages,
  mediaSlots,
  comparisonTables,
  glossaryTerms,
  glossaryState,
  highlightPrices,
  blockKey
}: {
  paragraph: string;
  inlineImages?: Article["inlineImages"];
  mediaSlots?: Article["mediaSlots"];
  comparisonTables?: Article["comparisonTables"];
  glossaryTerms: GlossaryTerm[];
  glossaryState: GlossaryLinkState;
  highlightPrices: boolean;
  blockKey: string;
}) {
  const mediaSlotId = paragraph.match(/^\[\[media:([a-z0-9-]+)\]\]$/)?.[1];
  const mediaSlot = mediaSlotId ? mediaSlots?.find((slot) => slot.id === mediaSlotId) : undefined;
  if (mediaSlotId) {
    if (!mediaSlot || mediaSlot.status !== "ready") return null;
    if (mediaSlot.type === "youtube" && mediaSlot.url && mediaSlot.title) {
      return <YouTubeEmbed caption={mediaSlot.caption} title={mediaSlot.title} url={mediaSlot.url} />;
    }
    if ((mediaSlot.type === "image" || mediaSlot.type === "infographic") && mediaSlot.src && mediaSlot.alt) {
      return (
        <figure className={styles.inlineImage}>
          <Image
            src={mediaSlot.src}
            alt={mediaSlot.alt}
            width={mediaSlot.width ?? 1200}
            height={mediaSlot.height ?? 675}
            sizes="(min-width: 920px) 720px, calc(100vw - 32px)"
          />
          <figcaption>
            {mediaSlot.caption}{mediaSlot.credit ? ` Credit: ${mediaSlot.credit}.` : ""}
          </figcaption>
        </figure>
      );
    }
    return null;
  }
  const comparisonTableId = paragraph.match(/^\[\[table:([a-z0-9-]+)\]\]$/)?.[1];
  const comparisonTable = comparisonTableId
    ? comparisonTables?.find((table) => table.id === comparisonTableId)
    : undefined;
  if (comparisonTableId) {
    if (!comparisonTable) return null;
    return (
      <div className={styles.comparisonTable} role="region" aria-label={comparisonTable.caption} tabIndex={0}>
        <table>
          <caption>{comparisonTable.caption}</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {comparisonTable.columns.map((column) => <th scope="col" key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {comparisonTable.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => <td key={`${row.label}-${comparisonTable.columns[index]}`}>{value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const inlineImageId = paragraph.match(/^\[\[image:([a-z0-9-]+)\]\]$/)?.[1];
  const inlineImage = inlineImageId ? inlineImages?.find((image) => image.id === inlineImageId) : undefined;
  if (inlineImage) {
    return (
      <figure className={styles.inlineImage}>
        <Image
          src={inlineImage.src}
          alt={inlineImage.alt}
          width={inlineImage.width ?? 1200}
          height={inlineImage.height ?? 675}
          sizes="(min-width: 920px) 720px, calc(100vw - 32px)"
        />
        <figcaption>{inlineImage.credit}</figcaption>
      </figure>
    );
  }
  if (paragraph.startsWith("## ")) {
    return <h2>{renderArticleText(paragraph.slice(3), glossaryTerms, glossaryState, `${blockKey}-heading`)}</h2>;
  }
  if (paragraph.startsWith("### ")) {
    return <h3>{renderArticleText(paragraph.slice(4), glossaryTerms, glossaryState, `${blockKey}-heading`)}</h3>;
  }
  return <p>{highlightPriceNodes(renderArticleText(paragraph, glossaryTerms, glossaryState, blockKey), highlightPrices, blockKey)}</p>;
}

function listItem(paragraph: string) {
  const unordered = paragraph.match(/^-\s+(.+)$/);
  if (unordered) return { type: "ul" as const, text: unordered[1] };
  const ordered = paragraph.match(/^\d+\.\s+(.+)$/);
  if (ordered) return { type: "ol" as const, text: ordered[1] };
  return null;
}

function ArticleBodyBlocks({
  body,
  inlineImages,
  mediaSlots,
  comparisonTables,
  glossaryTerms,
  glossaryState,
  highlightPrices
}: {
  body: string[];
  inlineImages?: Article["inlineImages"];
  mediaSlots?: Article["mediaSlots"];
  comparisonTables?: Article["comparisonTables"];
  glossaryTerms: GlossaryTerm[];
  glossaryState: GlossaryLinkState;
  highlightPrices: boolean;
}) {
  const blocks: ReactNode[] = [];

  for (let index = 0; index < body.length; index += 1) {
    const item = listItem(body[index]);
    if (!item) {
      blocks.push(
        <ArticleBodyBlock
          paragraph={body[index]}
          inlineImages={inlineImages}
          mediaSlots={mediaSlots}
          comparisonTables={comparisonTables}
          glossaryTerms={glossaryTerms}
          glossaryState={glossaryState}
          highlightPrices={highlightPrices}
          blockKey={`body-${index}`}
          key={`body-${index}`}
        />
      );
      continue;
    }

    const items = [item.text];
    let nextIndex = index + 1;
    while (nextIndex < body.length) {
      const next = listItem(body[nextIndex]);
      if (!next || next.type !== item.type) break;
      items.push(next.text);
      nextIndex += 1;
    }
    const ListTag = item.type;
    blocks.push(
      <ListTag key={`body-list-${index}`}>
        {items.map((text, itemIndex) => (
          <li key={`${text}-${itemIndex}`}>
            {highlightPriceNodes(renderArticleText(text, glossaryTerms, glossaryState, `body-list-${index}-${itemIndex}`), highlightPrices, `body-list-${index}-${itemIndex}`)}
          </li>
        ))}
      </ListTag>
    );
    index = nextIndex - 1;
  }

  return blocks;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ section: formats[article.format].path.slice(1), slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, slug } = await params;
  const topic = getTopicArchive(section, slug);
  if (topic) {
    const formatKey = sectionFormatMap[section];
    const topicArticles = formatKey
      ? filterArticlesByCanonicalTopic((await getArticles()).filter((article) => article.format === formatKey), topic.canonicalTopic)
      : [];
    return {
      title: `${topic.label} ${sectionFormatMap[section] ? formats[sectionFormatMap[section]].section : ""}`,
      description: topic.description,
      alternates: { canonical: `/${section}/${slug}` },
      robots: isArchiveIndexable(topicArticles.length, topic.description) ? undefined : { index: false, follow: true }
    };
  }
  const { isEnabled: previewEnabled } = await draftMode();
  const article = previewEnabled ? await getCmsArticleBySlug(slug, true) : await getArticleBySlug(slug);
  if (!article || formats[article.format].path.slice(1) !== section) return {};
  const path = articlePath(article.format, article.slug);
  const title = article.seo?.title ?? article.title;
  const description = article.seo?.description ?? article.subhead;
  const previewImage = articleSocialImage(article);
  const indexable = isArticleIndexable(article);
  return {
    title,
    description,
    robots: previewEnabled ? { index: false, follow: false } : indexable ? undefined : { index: false, follow: true },
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "article",
      url: path,
      images: [previewImage],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      section: formats[article.format].section,
      tags: article.tags.map((tag) => tag.name)
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [previewImage.url]
    }
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { section, slug } = await params;
  const topic = getTopicArchive(section, slug);
  if (topic) {
    const formatKey = sectionFormatMap[section];
    if (!formatKey) notFound();
    const format = formats[formatKey];
    const articles = filterArticlesByCanonicalTopic(
      (await getArticles()).filter((article) => article.format === formatKey),
      topic.canonicalTopic
    );
    const archiveIndexable = isArchiveIndexable(articles.length, topic.description);
    return (
      <>
        <section className={`container ${styles.topicArchive}`}>
          <header className={styles.topicHeader}>
            <p>{format.section}</p>
            <h1>{topic.label}</h1>
            <span>{topic.description}</span>
          </header>
          {section === "reviews" && slug === "wearables" ? (
            <nav className={styles.wearableTabs} aria-label="Wearables review filters">
              <Link aria-current="page" href="/reviews/wearables">
                All
              </Link>
              <Link href="/reviews/wearables/headphones">Headphones</Link>
              <Link href="/reviews/wearables/smart-watches">Smart Watches</Link>
              <Link href="/reviews/wearables/vr-ar">VR & AR</Link>
            </nav>
          ) : null}
          <div className={styles.relatedGrid}>
            {articles.length ? articles.map((item) => <StoryCard article={item} key={item.id} />) : <p>No stories in this lane yet.</p>}
          </div>
        </section>
        {archiveIndexable ? <JsonLd data={collectionPageJsonLd({ name: topic.label, description: topic.description, path: `/${section}/${slug}`, articles })} /> : null}
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: format.section, path: format.path },
            { name: topic.label, path: `/${section}/${slug}` }
          ])}
        />
      </>
    );
  }
  const { isEnabled: previewEnabled } = await draftMode();
  const article = previewEnabled ? await getCmsArticleBySlug(slug, true) : await getArticleBySlug(slug);
  if (!article || formats[article.format].path.slice(1) !== section) notFound();
  const [relatedCandidates, glossaryTerms] = await Promise.all([getRelatedArticles(article, 6), getGlossaryTerms()]);
  const related = relatedCandidates.filter(isContentPubliclyEligible).slice(0, 3);
  const format = formats[article.format];
  const glossaryState: GlossaryLinkState = { seen: new Set(), count: 0, max: 12 };
  const highlightReviewPrices = isPhoneReview(article);
  const eligible = isContentPubliclyEligible(article);
  const monetizable = isArticleMonetizationEligible(article, previewEnabled);
  const showScore = reviewCanShowScore(article);
  const safeSubhead = findPlaceholderIssues(article.subhead).length ? "" : article.subhead;
  const safeWhyItMatters = findPlaceholderIssues(article.whyItMatters).length ? "" : article.whyItMatters;
  const safeBody = article.body.filter((block) => findPlaceholderIssues(block).length === 0);

  return (
    <article className={styles.article}>
      <header className={`readable ${styles.header}`}>
        <div className={styles.kickerRow}>
          <FormatBadge format={article.format} reviewMethod={article.reviewMethod} />
          <Link href={format.path}>{format.section}</Link>
          {article.sponsored ? <SponsoredBadge /> : null}
        </div>
        <RegionList regions={article.regions} />
        <TagList tags={article.tags} />
        <h1>{article.title}</h1>
        {safeSubhead ? <p className={styles.subhead}>{safeSubhead}</p> : null}
        <div className={styles.byline}>
          <Link href={`/authors/${article.author.slug}`}>{article.author.name}</Link>
          <span>Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(article.updatedAt))}</span>
          <span>{article.readTime}</span>
          <Link href="/editorial-standards">How we work</Link>
        </div>
        {safeWhyItMatters ? <WhyItMatters>{safeWhyItMatters}</WhyItMatters> : null}
      </header>

      <figure className={styles.leadImage}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          width={article.image.width ?? 1040}
          height={article.image.height ?? 520}
          priority
          sizes="(min-width: 1080px) 1040px, calc(100vw - 32px)"
        />
        {article.image.caption || article.image.credit ? (
          <figcaption>
            {article.image.caption ?? article.image.credit}
            {article.image.caption && article.image.credit ? ` Image Credit: ${article.image.credit}` : null}
          </figcaption>
        ) : null}
      </figure>

      <div className={`readable ${styles.body}`}>
        {previewEnabled ? <p className={styles.disclosure}>Editorial preview. This page is not available for indexing.</p> : null}
        {!eligible ? <p className={styles.disclosure}>This article is retained for editorial revision and is excluded from site discovery.</p> : null}
        {article.format === "review" && article.reviewMethod !== "hands_on" ? (
          <p className={styles.disclosure}>Research-based analysis. This assessment uses cited product information and independent reporting. tecMAMBO did not conduct an original hands-on test.</p>
        ) : null}
        {article.format === "review" && article.reviewMethod === "hands_on" ? (
          <section className={styles.disclosure} aria-labelledby="testing-title">
            <h2 id="testing-title">How we tested</h2>
            <p>{article.testingMethodology}</p>
            <p>Testing period: {article.testingPeriod}. Product source: {article.productSource}.</p>
            {article.sourceDisclosure ? <p>{article.sourceDisclosure}</p> : null}
          </section>
        ) : null}
        {article.sponsored ? <p className={styles.disclosure}>Sponsored article. tecMAMBO labels paid partner content plainly.</p> : null}
        {article.format === "wallet-watch" ? (
          <p className={styles.affiliateDisclosure}>
            Wallet Watch may include affiliate links. Prices are manually checked by editors and can change before checkout.
          </p>
        ) : null}
        {article.deal ? (
          <section className={styles.dealBox} aria-labelledby="deal-title">
            <div>
              <p id="deal-title">Editor-verified deal</p>
              <h2>{article.deal.productName}</h2>
              <span>
                {article.deal.currency} {article.deal.priceCurrent.toLocaleString("en-KE")}
              </span>
              {article.deal.priceWas ? (
                <del>
                  {article.deal.currency} {article.deal.priceWas.toLocaleString("en-KE")}
                </del>
              ) : null}
              {article.deal.expiry ? <small>{article.deal.expiry}</small> : null}
            </div>
            <a href={article.deal.affiliateUrl} rel="sponsored nofollow" target="_blank">
              Check retailer
            </a>
          </section>
        ) : null}
        {article.verdict ? (
          <section className={styles.verdict} aria-labelledby="verdict-title">
            {showScore ? <p className={styles.score}>{article.verdict.score}</p> : null}
            <div>
              <h2 id="verdict-title">{showScore ? "Simple verdict" : "Research-based assessment"}</h2>
              <p>{article.verdict.summary}</p>
              <div className={styles.proCon}>
                <ul>
                  {article.verdict.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul>
                  {article.verdict.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}
        <ArticleBodyBlocks
          body={safeBody}
          inlineImages={article.inlineImages}
          mediaSlots={article.mediaSlots}
          comparisonTables={article.comparisonTables}
          glossaryTerms={glossaryTerms}
          glossaryState={glossaryState}
          highlightPrices={highlightReviewPrices}
        />
        {article.goDeeper && findPlaceholderIssues(article.goDeeper.intro).length === 0 ? (
          <GoDeeper
            intro={article.goDeeper.intro}
            specs={article.goDeeper.specs}
            renderText={highlightReviewPrices ? highlightPriceText : undefined}
          />
        ) : null}
        {article.faq?.length ? (
          <section className={styles.faq} aria-labelledby="article-faq-title">
            <h2 id="article-faq-title">FAQ</h2>
            {article.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </section>
        ) : null}
        {article.sources?.length ? (
          <section className={styles.sources} aria-labelledby="article-sources-title">
            <h2 id="article-sources-title">Sources</h2>
            <ul>
              {article.sources.map((source) => (
                <li key={`${source.label}-${source.url}`}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {article.closingLine ? <p className={styles.closingLine}>{article.closingLine}</p> : null}
        <TagList tags={article.tags} />
        <section className={styles.ask}>
          <h2>Ask MAMBO</h2>
          <p>Have a plain-English question about this topic? Send it in and we may answer it in a future guide.</p>
          <Link href="/contact">Ask a question</Link>
        </section>
        {monetizable ? <AdSlot /> : null}
      </div>

      <section className={`container ${styles.related}`} aria-labelledby="related-title">
        <h2 id="related-title">Related reading</h2>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <StoryCard article={item} key={item.id} />
          ))}
        </div>
      </section>

      <div className={`container ${styles.newsletter}`}>
        <NewsletterCard />
      </div>

      {monetizable ? <AdSenseScript /> : null}
      {eligible ? <JsonLd data={articleJsonLd(article)} /> : null}
      {eligible && dealProductJsonLd(article) ? <JsonLd data={dealProductJsonLd(article)!} /> : null}
      {eligible && article.faq?.length ? <JsonLd data={faqJsonLd(article.faq)} /> : null}
      {eligible && itemListJsonLd(article) ? <JsonLd data={itemListJsonLd(article)!} /> : null}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: format.section, path: format.path },
          { name: article.title, path: articlePath(article.format, article.slug) }
        ])}
      />
    </article>
  );
}
