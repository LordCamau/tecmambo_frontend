import { getGlossaryTerms, getSubstantialArticles } from "@/lib/content";
import { SearchClient } from "./SearchClient";
import styles from "./search.module.css";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Search",
  description: "Search tecMAMBO articles and plain-English technology definitions.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true }
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const [articles, terms] = await Promise.all([getSubstantialArticles(), getGlossaryTerms()]);
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p>Search</p>
        <h1>Find the plain-English version</h1>
      </header>
      <SearchClient articles={articles} terms={terms} initialQuery={q} />
    </section>
  );
}
import type { Metadata } from "next";
