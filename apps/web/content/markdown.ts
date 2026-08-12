import type { Article, GlossaryTerm } from "@/lib/types";
import { articlePath } from "@/lib/formats";

function articleBodyBlockToMarkdown(article: Article, block: string) {
  const mediaSlotId = block.match(/^\[\[media:([a-z0-9-]+)\]\]$/)?.[1];
  const mediaSlot = mediaSlotId ? article.mediaSlots?.find((slot) => slot.id === mediaSlotId) : undefined;
  if (mediaSlotId) {
    if (!mediaSlot || mediaSlot.status !== "ready" || !mediaSlot.src || !mediaSlot.alt) return "";
    return [`![${mediaSlot.alt}](${mediaSlot.src})`, "", mediaSlot.caption, mediaSlot.credit ? `Image credit: ${mediaSlot.credit}` : ""]
      .filter(Boolean)
      .join("\n");
  }
  const comparisonTableId = block.match(/^\[\[table:([a-z0-9-]+)\]\]$/)?.[1];
  const comparisonTable = comparisonTableId ? article.comparisonTables?.find((table) => table.id === comparisonTableId) : undefined;
  if (comparisonTable) {
    const header = ["Feature", ...comparisonTable.columns];
    return [
      `_${comparisonTable.caption}_`,
      "",
      `| ${header.join(" | ")} |`,
      `| ${header.map(() => "---").join(" | ")} |`,
      ...comparisonTable.rows.map((row) => `| ${[row.label, ...row.values].join(" | ")} |`)
    ].join("\n");
  }
  const inlineImageId = block.match(/^\[\[image:([a-z0-9-]+)\]\]$/)?.[1];
  const inlineImage = inlineImageId ? article.inlineImages?.find((image) => image.id === inlineImageId) : undefined;
  if (!inlineImage) return block;
  return [`![${inlineImage.alt}](${inlineImage.src})`, "", `Image credit: ${inlineImage.credit}`].join("\n");
}

export function articleToMarkdown(article: Article) {
  return [
    `# ${article.title}`,
    "",
    `> ${article.subhead}`,
    "",
    `Author: ${article.author.name}`,
    article.regions?.length ? `Regions: ${article.regions.map((region) => region.name).join(", ")}` : "",
    article.sponsored ? "Disclosure: Sponsored article" : "",
    `Published: ${article.publishedAt}`,
    `Updated: ${article.updatedAt}`,
    `Canonical: ${articlePath(article.format, article.slug)}`,
    "",
    "## Why it matters",
    "",
    article.whyItMatters,
    "",
    "## Story",
    "",
    ...article.body.flatMap((paragraph) => [articleBodyBlockToMarkdown(article, paragraph), ""]),
    article.goDeeper
      ? ["## Go deeper", "", article.goDeeper.intro, "", ...article.goDeeper.specs.map((spec) => `- ${spec.label}: ${spec.value}`)].join("\n")
      : "",
    article.faq?.length ? ["## FAQ", "", ...article.faq.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""])].join("\n") : "",
    article.sources?.length
      ? ["## Sources", "", ...article.sources.map((source) => `- [${source.label}](${source.url})`)].join("\n")
      : "",
    article.itemList?.length ? ["## Picks", "", ...article.itemList.map((item) => `- ${item}`)].join("\n") : "",
    article.closingLine ? ["", article.closingLine].join("\n") : ""
  ].join("\n");
}

export function glossaryToMarkdown(term: GlossaryTerm) {
  return [
    `# ${term.term}`,
    "",
    `> ${term.oneLiner}`,
    "",
    `Topics: ${term.topics.join(", ")}`,
    `Difficulty: ${term.difficulty}`,
    term.aliases.length ? `Aliases: ${term.aliases.join(", ")}` : "",
    `Updated: ${term.updatedAt}`,
    "",
    term.analogy ? ["## In one analogy", "", term.analogy, ""].join("\n") : "",
    term.whyItMatters ? ["## Why it matters", "", term.whyItMatters, ""].join("\n") : "",
    "## Go deeper",
    "",
    term.fullExplanation,
    "",
    term.faqs?.length
      ? ["## FAQ", "", ...term.faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""])].join("\n")
      : "",
    term.sources?.length
      ? ["## Sources", "", ...term.sources.map((source) => `- [${source.label}](${source.url})`)].join("\n")
      : ""
  ]
    .filter(Boolean)
    .join("\n");
}
