import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";
import { siteUrl } from "@/lib/formats";
import { editorialPolicyPage } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "Editorial policy | tecMAMBO",
  description: "How tecMAMBO handles reporting, sources, verification, product coverage, opinion, AI assistance, and commercial relationships.",
  alternates: { canonical: "/editorial-policy" }
};

export default function EditorialPolicyPage() {
  return (
    <>
      <LegalPageTemplate page={editorialPolicyPage} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: editorialPolicyPage.title, url: `${siteUrl}/editorial-policy`, dateModified: editorialPolicyPage.lastUpdated }} />
    </>
  );
}
