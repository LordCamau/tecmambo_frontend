import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubstantialArticles, getAuthor, getAuthors } from "@/lib/content";
import { StoryCard } from "@/components/cards/StoryCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPageJsonLd, personJsonLd } from "@/lib/seo";
import styles from "./page.module.css";
import { isAuthorIndexable } from "@/lib/content-quality";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const author = await getAuthor((await params).slug);
  if (!author) return {};
  const articleCount = (await getSubstantialArticles()).filter((article) => article.author.slug === author.slug).length;
  const title = `${author.name} | tecMAMBO`;
  return {
    title,
    description: author.bio,
    alternates: { canonical: `/authors/${author.slug}` },
    robots: isAuthorIndexable(author, articleCount) ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description: author.bio,
      type: "profile",
      images: [{ url: author.avatar, alt: author.name }]
    },
    twitter: {
      card: "summary",
      title,
      description: author.bio,
      images: [author.avatar]
    }
  };
}

export default async function AuthorPage({ params }: { params: Params }) {
  const author = await getAuthor((await params).slug);
  if (!author) notFound();
  const articles = (await getSubstantialArticles()).filter((article) => article.author.slug === author.slug);
  return (
    <>
      <section className={`container ${styles.page}`}>
        <header className={styles.header}>
          <Image src={author.avatar} alt="" width={132} height={132} />
          <div>
            <p>{author.role}</p>
            <h1>{author.name}</h1>
            <span>{author.bio}</span>
            <Link className={styles.standardsLink} href="/editorial-standards">
              How tecMAMBO works
            </Link>
          </div>
        </header>
        <div className={styles.expertise}>
          {author.expertise.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className={styles.grid}>
          {articles.map((article) => (
            <StoryCard article={article} key={article.id} />
          ))}
        </div>
      </section>
      <JsonLd data={personJsonLd(author)} />
      <JsonLd data={collectionPageJsonLd({ name: author.name, description: author.bio, path: `/authors/${author.slug}`, articles })} />
    </>
  );
}
