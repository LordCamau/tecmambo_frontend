import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByTag, getTags } from "@/lib/content";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "../../(sections)/[section]/page.module.css";
import { isArchiveIndexable } from "@/lib/content-quality";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const brands = await getTags("brand");
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const brand = (await getTags("brand")).find((item) => item.slug === slug);
  if (!brand) return {};
  const articles = await getArticlesByTag(slug);
  const description = `Independent coverage, buying context, and practical explainers involving ${brand.name}.`;
  return { title: brand.name, description, alternates: { canonical: `/brands/${slug}` }, robots: isArchiveIndexable(articles.length, description) ? undefined : { index: false, follow: true } };
}

export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brands = await getTags("brand");
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) notFound();
  const articles = await getArticlesByTag(slug);
  const description = `Independent coverage, buying context, and practical explainers involving ${brand.name}.`;
  return (
    <>
    <section className={`container ${styles.archive}`}>
      <header className={styles.header}>
        <p>Brand hub</p>
        <h1>{brand.name}</h1>
        <span>
          {description}
        </span>
      </header>
      <div className={styles.grid}>
        {articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
    </section>
    {isArchiveIndexable(articles.length, description) ? <JsonLd data={collectionPageJsonLd({ name: brand.name, description, path: `/brands/${slug}`, articles })} /> : null}
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: brand.name, path: `/brands/${slug}` }])} />
    </>
  );
}
