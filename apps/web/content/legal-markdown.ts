import type { LegalPage, LegalSegment } from "@/lib/legal-pages";
import { segmentsToText } from "@/lib/legal-pages";

function segmentToMarkdown(segment: LegalSegment) {
  return typeof segment === "string" ? segment : `[${segment.text}](${segment.href})`;
}

function paragraphToMarkdown(segments: LegalSegment[]) {
  return segments.map(segmentToMarkdown).join("");
}

export function legalPageToMarkdown(page: LegalPage) {
  const placeholderSection = page.placeholders.length
    ? [
        `## ${page.placeholderTitle ?? "Publishing notes"}`,
        "",
        page.placeholderIntro ?? "These notes are for editorial and legal review.",
        "",
        ...page.placeholders.map((placeholder) => `- ${placeholder}`),
        ""
      ]
    : [];

  return [
    `# ${page.title}`,
    "",
    `Last updated: ${page.lastUpdated}`,
    "",
    `**${page.summaryLabel}** ${segmentsToText(page.summary)}`,
    "",
    ...placeholderSection,
    ...page.sections.flatMap((section) => [`## ${section.title}`, "", ...section.paragraphs.flatMap((paragraph) => [paragraphToMarkdown(paragraph), ""])])
  ].join("\n");
}
