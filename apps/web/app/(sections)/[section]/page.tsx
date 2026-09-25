import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formats } from "@/lib/formats";
import { getArticlesByFormat } from "@/lib/content";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import type { Format } from "@/lib/types";
import { sectionFormatMap, topicArchives } from "@/lib/site-structure";
import { StoryCard } from "@/components/cards/StoryCard";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "./page.module.css";
import { isArchiveIndexable } from "@/lib/content-quality";
import { ArchivePagination } from "@/components/navigation/ArchivePagination";

type Params = Promise<{ section: string }>;
type SearchParams = Promise<{ page?: string }>;
const pageSize = 24;

function formatFromSection(section: string): Format | null {
  return sectionFormatMap[section] ?? null;
}

export function generateStaticParams() {
  return Object.values(formats).map((format) => ({ section: format.path.slice(1) }));
}

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const formatKey = formatFromSection((await params).section);
  if (!formatKey) return {};
  const format = formats[formatKey];
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const articles = await getArticlesByFormat(formatKey);
  const description = `${format.description} Browse this tecMAMBO archive from Nairobi, Kenya for clear context, useful reviews, and related explainers.`;
  return {
    title: page === 1 ? `${format.section} | tecMAMBO` : `${format.section}, page ${page} | tecMAMBO`,
    description,
    alternates: { canonical: page === 1 ? format.path : `${format.path}?page=${page}` },
    robots: isArchiveIndexable(articles.length, description) ? undefined : { index: false, follow: true }
  };
}

export default async function SectionPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { section } = await params;
  const formatKey = formatFromSection(section);
  if (!formatKey) notFound();
  const format = formats[formatKey];
  const articles = await getArticlesByFormat(formatKey);
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  if (page > totalPages) notFound();
  const pageArticles = articles.slice((page - 1) * pageSize, page * pageSize);
  const archiveIndexable = isArchiveIndexable(articles.length, format.description);
  return (
    <>
      <section className={`container ${styles.archive}`}>
        <header className={styles.header}>
          <p>{format.label}</p>
          <h1>{format.section}</h1>
          <span>{format.description}</span>
        </header>
        {topicArchives[section]?.length ? (
          <nav className={styles.topicTabs} aria-label={`${format.section} topics`}>
            {topicArchives[section]?.map((topic) => (
              <a href={`${format.path}/${topic.slug}`} key={topic.slug}>
                {topic.label}
              </a>
            ))}
          </nav>
        ) : null}
        <div className={styles.grid}>
          {pageArticles.map((article, index) => (
            <StoryCard article={article} key={article.id} priority={index === 0} />
          ))}
        </div>
        <ArchivePagination path={format.path} page={page} totalPages={totalPages} />
      </section>
      {archiveIndexable ? <JsonLd data={collectionPageJsonLd({ name: format.section, description: format.description, path: page === 1 ? format.path : `${format.path}?page=${page}`, articles: pageArticles })} /> : null}
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: format.section, path: format.path }])} />
    </>
  );
}
