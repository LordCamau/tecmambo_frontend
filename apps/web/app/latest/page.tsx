import type { Metadata } from "next";
import Link from "next/link";
import { getSubstantialArticles } from "@/lib/content";
import { formats } from "@/lib/formats";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "./latest.module.css";
import { isArchiveIndexable } from "@/lib/content-quality";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import { ArchivePagination } from "@/components/navigation/ArchivePagination";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ page?: string }>;
const pageSize = 30;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  return {
    title: page === 1 ? "Latest" : `Latest, page ${page}`,
    description: "The newest tecMAMBO stories, with filters for every editorial format.",
    alternates: { canonical: page === 1 ? "/latest" : `/latest?page=${page}` }
  };
}

export default async function LatestPage({ searchParams }: { searchParams: SearchParams }) {
  const articles = await getSubstantialArticles();
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  if (page > totalPages) notFound();
  const pageArticles = articles.slice((page - 1) * pageSize, page * pageSize);
  const description = "The newest tecMAMBO stories, with filters for every editorial format.";
  return (
    <>
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p>Latest</p>
        <h1>Fresh stories, calmly sorted</h1>
        <span>Start with everything, then narrow by the kind of clarity you need.</span>
      </header>
      <nav className={styles.filters} aria-label="Format filters">
        {Object.entries(formats).filter(([key, format]) =>
          isArchiveIndexable(articles.filter((article) => article.format === key).length, format.description)
        ).map(([, format]) => (
          <Link href={format.path} key={format.path}>
            {format.shortLabel}
          </Link>
        ))}
      </nav>
      <div className={styles.grid}>
        {pageArticles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
      <ArchivePagination path="/latest" page={page} totalPages={totalPages} />
    </section>
    <JsonLd data={collectionPageJsonLd({ name: "Latest", description, path: page === 1 ? "/latest" : `/latest?page=${page}`, articles: pageArticles })} />
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Latest", path: "/latest" }])} />
    </>
  );
}
