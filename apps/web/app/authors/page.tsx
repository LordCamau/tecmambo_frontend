import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAuthors, getSubstantialArticles } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Authors and contributors | tecMAMBO",
  description: "Meet the writers and contributors responsible for tecMAMBO's technology reporting, analysis, and explainers.",
  alternates: { canonical: "/authors" }
};

export default async function AuthorsPage() {
  const [authors, articles] = await Promise.all([getAuthors(), getSubstantialArticles()]);
  const people = authors.filter((author) => author.slug !== "tecmambo-team");

  return (
    <main className={`container ${styles.page}`}>
      <header>
        <p>Authors</p>
        <h1>The people behind tecMAMBO</h1>
        <span>Meet the named writers and contributors responsible for our reporting and explanations.</span>
      </header>
      <div className={styles.grid}>
        {people.map((author) => {
          const count = articles.filter((article) => article.author.slug === author.slug).length;
          return (
            <article key={author.id ?? author.slug}>
              <Image src={author.avatar} alt={author.name} width={104} height={104} />
              <div>
                <h2><Link href={`/authors/${author.slug}`}>{author.name}</Link></h2>
                <p>{author.role}</p>
                <span>{author.bio}</span>
                <Link href={`/authors/${author.slug}`}>View profile and {count} articles</Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
