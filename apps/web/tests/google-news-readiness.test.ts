import { describe, expect, it } from "vitest";
import { articleHeadlineWarning } from "@/lib/content-quality";
import { correctionsPage, editorialPolicyPage, legalPages } from "@/lib/legal-pages";
import { authors, articles } from "@/lib/sample-data";
import { articleJsonLd, organizationJsonLd, personJsonLd } from "@/lib/seo";

describe("Google News readiness", () => {
  it("publishes named author identity pages with the supplied social profiles", () => {
    const tim = authors.find((author) => author.slug === "tim-humphreys")!;
    const lulu = authors.find((author) => author.slug === "lulu-camau")!;

    expect(tim.role).toBe("Lead Editor and Founder, tecMAMBO");
    expect(tim.sameAs).toEqual([
      "https://x.com/LordCamau",
      "https://linkedin.com/in/lordcamau",
      "https://instagram.com/lordcamau"
    ]);
    expect(lulu.role).toBe("Senior AI Writer / Contributor");
    expect(lulu.sameAs).toEqual(["https://x.com/LuluKiritu", "https://linkedin.com/in/lulu-kiritu"]);
    expect(personJsonLd(tim)).toMatchObject({
      "@type": "Person",
      url: "https://tecmambo.com/authors/tim-humphreys",
      sameAs: tim.sameAs
    });
  });

  it("identifies the real author and publisher in article structured data", () => {
    const article = articles.find((item) => item.author.slug === "tim-humphreys")!;
    const schema = articleJsonLd(article) as unknown as Record<string, unknown>;
    const author = schema.author as Record<string, unknown>;
    const publisher = schema.publisher as Record<string, unknown>;

    expect(["Article", "NewsArticle", "OpinionNewsArticle", "Review"]).toContain(schema["@type"]);
    expect(author).toMatchObject({
      "@type": "Person",
      name: article.author.name,
      url: `https://tecmambo.com/authors/${article.author.slug}`
    });
    expect(author).not.toHaveProperty("@context");
    expect(publisher).toMatchObject({ "@type": "NewsMediaOrganization", name: "tecMAMBO" });
    expect(schema.datePublished).toBe(article.publishedAt);
    expect(schema.dateModified).toBe(article.updatedAt);
  });

  it("uses the verified publisher name and direct policy URLs", () => {
    expect(organizationJsonLd()).toMatchObject({
      legalName: "Brainerd Media Company",
      publishingPrinciples: "https://tecmambo.com/editorial-policy",
      correctionsPolicy: "https://tecmambo.com/corrections"
    });
  });

  it("includes dedicated editorial and corrections policies", () => {
    expect(legalPages).toContain(editorialPolicyPage);
    expect(legalPages).toContain(correctionsPage);
    expect(editorialPolicyPage.sections.map((section) => section.id)).toContain("ai-assistance");
    expect(correctionsPage.sections.map((section) => section.id)).toContain("dates");
  });

  it("warns about long headlines without changing them", () => {
    const title = "A".repeat(111);
    expect(articleHeadlineWarning({ title })).toContain("111 characters");
    expect(title).toHaveLength(111);
    expect(articleHeadlineWarning({ title: "A concise headline" })).toBeNull();
  });
});
