import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";
import { siteUrl } from "@/lib/formats";
import { correctionsPage } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "Corrections policy | tecMAMBO",
  description: "How to report an error to tecMAMBO and how we review, correct, and disclose material changes to published articles.",
  alternates: { canonical: "/corrections" }
};

export default function CorrectionsPage() {
  return (
    <>
      <LegalPageTemplate page={correctionsPage} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: correctionsPage.title, url: `${siteUrl}/corrections`, dateModified: correctionsPage.lastUpdated }} />
    </>
  );
}
