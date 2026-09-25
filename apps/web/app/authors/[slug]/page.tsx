import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubstantialArticles, getAuthor, getAuthors } from "@/lib/content";
import { StoryCard } from "@/components/cards/StoryCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd, personJsonLd } from "@/lib/seo";
import styles from "./page.module.css";
import { isAuthorIndexable } from "@/lib/content-quality";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ page?: string }>;
const pageSize = 24;

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const author = await getAuthor((await params).slug);
  if (!author) return {};
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const articleCount = (await getSubstantialArticles()).filter((article) => article.author.slug === author.slug).length;
  const title = `${author.name} | tecMAMBO`;
  return {
    title,
    description: author.bio,
    alternates: { canonical: page === 1 ? `/authors/${author.slug}` : `/authors/${author.slug}?page=${page}` },
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

export default async function AuthorPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const author = await getAuthor((await params).slug);
  if (!author) notFound();
  const articles = (await getSubstantialArticles()).filter((article) => article.author.slug === author.slug);
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  if (page > totalPages) notFound();
  const pageArticles = articles.slice((page - 1) * pageSize, page * pageSize);
  const socialLinks = [
    author.social?.x ? { label: "X", href: author.social.x } : null,
    author.social?.linkedIn ? { label: "LinkedIn", href: author.social.linkedIn } : null,
    author.social?.instagram ? { label: "Instagram", href: author.social.instagram } : null,
    author.social?.website ? { label: "Website", href: author.social.website } : null
  ].filter((item): item is { label: string; href: string } => Boolean(item));
  return (
    <>
      <section className={`container ${styles.page}`}>
        <header className={styles.header}>
          <Image src={author.avatar} alt="" width={132} height={132} />
          <div>
            <p>{author.role}</p>
            <h1>{author.name}</h1>
            <span>{author.bio}</span>
            <strong className={styles.articleCount}>{articles.length} published articles</strong>
            {socialLinks.length ? (
              <nav className={styles.socials} aria-label={`${author.name} social profiles`}>
                {socialLinks.map((item) => (
                  <a href={item.href} key={item.label} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                ))}
              </nav>
            ) : null}
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
        {author.editorialResponsibilities?.length ? (
          <section className={styles.responsibilities} aria-labelledby="editorial-responsibilities">
            <h2 id="editorial-responsibilities">Editorial responsibilities</h2>
            <p>{author.editorialResponsibilities.join(", ")}</p>
          </section>
        ) : null}
        <h2 className={styles.workHeading}>Articles by {author.name}</h2>
        <div className={styles.grid}>
          {pageArticles.map((article, index) => (
            <StoryCard article={article} key={article.id} priority={index === 0} showPublicationDate />
          ))}
        </div>
        {totalPages > 1 ? (
          <nav className={styles.pagination} aria-label="Author article pages">
            {page > 1 ? <Link href={page === 2 ? `/authors/${author.slug}` : `/authors/${author.slug}?page=${page - 1}`}>Previous</Link> : <span />}
            <span>Page {page} of {totalPages}</span>
            {page < totalPages ? <Link href={`/authors/${author.slug}?page=${page + 1}`}>Next</Link> : <span />}
          </nav>
        ) : null}
      </section>
      <JsonLd data={personJsonLd(author)} />
      <JsonLd data={collectionPageJsonLd({ name: author.name, description: author.bio, path: `/authors/${author.slug}`, articles: pageArticles })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: author.name, path: `/authors/${author.slug}` }])} />
    </>
  );
}
