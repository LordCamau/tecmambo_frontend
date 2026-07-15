import type {
  WithContext,
  AboutPage,
  Article as SchemaArticle,
  BreadcrumbList,
  DefinedTerm,
  DefinedTermSet,
  FAQPage,
  ItemList,
  NewsMediaOrganization,
  Person,
  Product,
  Review,
  WebSite
} from "schema-dts";
import { articlePath, formats, siteUrl } from "@/lib/formats";
import { siteSettings } from "@/lib/nav";
import type { Article, GlossaryTerm } from "@/lib/types";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function articleSocialImage(article: Article) {
  return {
    url: absoluteUrl(article.image.src),
    alt: article.image.alt,
    ...(article.image.width ? { width: article.image.width } : {}),
    ...(article.image.height ? { height: article.image.height } : {}),
    ...(article.image.type ? { type: article.image.type } : {})
  };
}

export function organizationJsonLd(): WithContext<NewsMediaOrganization> {
  const editorialStandardsUrl = absoluteUrl("/editorial-standards");
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "tecMAMBO",
    legalName: "tecMAMBO",
    url: siteUrl,
    slogan: "Made to be understood.",
    foundingDate: "2016",
    founder: {
      "@type": "Person",
      name: "Tim Humphreys",
      url: absoluteUrl("/authors/tim-humphreys")
    },
    areaServed: ["Kenya", "Africa", "Worldwide"],
    sameAs: Object.values(siteSettings.social),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE"
    },
    logo: absoluteUrl("/brand/tecMAMBO-favicon.jpg"),
    ethicsPolicy: editorialStandardsUrl,
    correctionsPolicy: `${editorialStandardsUrl}#corrections-updates`,
    verificationFactCheckingPolicy: `${editorialStandardsUrl}#accuracy-verification-fact-checking`,
    unnamedSourcesPolicy: `${editorialStandardsUrl}#sourcing-attribution-originality`,
    actionableFeedbackPolicy: `${editorialStandardsUrl}#feedback-complaints-right-of-reply`,
    ownershipFundingInfo: `${editorialStandardsUrl}#funding-separation`,
    missionCoveragePrioritiesPolicy: `${editorialStandardsUrl}#our-editorial-promise`
  } as WithContext<NewsMediaOrganization>;
}

export function personJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tim Humphreys",
    jobTitle: "Founder & Editor",
    url: absoluteUrl("/authors/tim-humphreys"),
    worksFor: {
      "@type": "Organization",
      name: "tecMAMBO",
      url: siteUrl
    }
  };
}

export function aboutPageJsonLd(): WithContext<AboutPage> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About tecMAMBO",
    description:
      "tecMAMBO is a plain-English technology publication founded in 2016 by Tim Humphreys in Nairobi.",
    url: absoluteUrl("/about"),
    mainEntity: organizationJsonLd()
  };
}

export function websiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "tecMAMBO",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    } as WebSite["potentialAction"]
  };
}

function firstNumeric(value: string) {
  return value.match(/\d+(?:\.\d+)?/)?.[0] ?? "0";
}

function ratingScale(value: string) {
  return /\/\s*5\b|out of 5/i.test(value) ? "5" : "10";
}

function regionalArticleSchema(article: Article) {
  if (!article.regions?.length) return {};
  const places = article.regions.map((region) => ({
    "@type": "Place",
    name: region.name,
    address: {
      "@type": "PostalAddress",
      addressCountry: region.flag ?? region.name
    }
  }));
  return {
    contentLocation: places,
    spatialCoverage: places,
    about: [
      ...article.tags.map((tag) => ({ "@type": "Thing", name: tag.name })),
      ...places
    ]
  };
}

export function articleJsonLd(article: Article): WithContext<SchemaArticle | Review> {
  const url = absoluteUrl(articlePath(article.format, article.slug));
  const description = article.seo?.description ?? article.subhead;
  const regionSchema = regionalArticleSchema(article);
  const image = articleSocialImage(article);
  const articleImage = {
    "@type": "ImageObject",
    url: image.url,
    caption: article.image.credit,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {})
  };
  const wordCount = [
    article.title,
    article.subhead,
    article.excerpt,
    article.whyItMatters,
    ...article.body,
    article.closingLine ?? ""
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const sharedArticleFields = {
    mainEntityOfPage: url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "en",
    isAccessibleForFree: true,
    articleSection: formats[article.format].section,
    keywords: [...article.tags.map((tag) => tag.name), ...(article.regions?.map((region) => region.name) ?? [])].join(", "),
    abstract: article.whyItMatters,
    image: articleImage,
    thumbnailUrl: image.url,
    wordCount,
    author: {
      "@type": "Person",
      name: article.author.name,
      url: absoluteUrl(`/authors/${article.author.slug}`)
    },
    publisher: organizationJsonLd(),
    citation: article.sources?.map((source) => source.url),
    ...regionSchema
  };
  if (article.format === "review" && article.verdict) {
    return {
      "@context": "https://schema.org",
      "@type": "Review",
      headline: article.title,
      name: article.title,
      description,
      url,
      ...sharedArticleFields,
      itemReviewed: { "@type": "Product", name: article.itemReviewed ?? article.title.replace(/\sreview:.+$/i, "") },
      reviewRating: {
        "@type": "Rating",
        ratingValue: firstNumeric(article.verdict.score),
        bestRating: ratingScale(article.verdict.score)
      },
      positiveNotes: {
        "@type": "ItemList",
        itemListElement: article.verdict.pros.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item }))
      },
      negativeNotes: {
        "@type": "ItemList",
        itemListElement: article.verdict.cons.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item }))
      }
    } as WithContext<Review>;
  }
  return {
    "@context": "https://schema.org",
    "@type": article.format === "news" || article.format === "business" ? "NewsArticle" : article.format === "opinion" ? "OpinionNewsArticle" : "Article",
    name: article.seo?.title ?? article.title,
    headline: article.title,
    description,
    url,
    ...sharedArticleFields
  } as WithContext<SchemaArticle>;
}

export function itemListJsonLd(article: Article): WithContext<ItemList> | null {
  if (!article.itemList?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: article.title,
    url: absoluteUrl(articlePath(article.format, article.slug)),
    itemListElement: article.itemList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item
    }))
  };
}

export function dealProductJsonLd(article: Article): WithContext<Product> | null {
  if (!article.deal?.verified) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: article.deal.productName,
    image: articleSocialImage(article).url,
    offers: {
      "@type": "Offer",
      price: article.deal.priceCurrent,
      priceCurrency: article.deal.currency === "KSh" ? "KES" : article.deal.currency,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(articlePath(article.format, article.slug))
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  articles
}: {
  name: string;
  description: string;
  path: string;
  articles: Article[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: websiteJsonLd(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.slice(0, 20).map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(articlePath(article.format, article.slug)),
        name: article.title
      }))
    }
  };
}

export function definedTermJsonLd(term: GlossaryTerm): WithContext<DefinedTerm> {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.oneLiner,
    url: absoluteUrl(`/glossary/${term.slug}`),
    inDefinedTermSet: absoluteUrl("/glossary"),
    alternateName: term.aliases
  };
}

export function definedTermSetJsonLd(terms: GlossaryTerm[]): WithContext<DefinedTermSet> {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "tecMAMBO Glossary",
    description: "Plain-English technology definitions from tecMAMBO.",
    url: absoluteUrl("/glossary"),
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.term,
      description: term.oneLiner,
      url: absoluteUrl(`/glossary/${term.slug}`)
    }))
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
