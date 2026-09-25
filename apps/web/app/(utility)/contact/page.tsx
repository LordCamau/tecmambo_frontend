import type { Metadata } from "next";
import { UtilityPage } from "../utility";

export const metadata: Metadata = {
  title: "Contact tecMAMBO",
  description: "Contact tecMAMBO with reader questions, corrections, tips, review requests, press information, advertising enquiries, and partnership proposals.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <UtilityPage
      eyebrow="Contact"
      title="Ask MAMBO"
      body="Readers, sources, companies, PR teams, and advertisers can send questions, corrections, tips, review requests, press information, advertising enquiries, and partnership proposals to hello@tecmambo.com."
    />
  );
}
