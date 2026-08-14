import type { Article, GlossaryTerm } from "@/lib/types";

export function aboutToMarkdown(articles: Article[], terms: GlossaryTerm[]) {
  const explainerAnalysisCount = articles.filter((article) => article.format === "explainer" || article.format === "opinion").length;
  return [
    "# About tecMAMBO",
    "",
    "> Tech, made to be understood.",
    "",
    "tecMAMBO is a technology publication in Nairobi, Kenya, founded in 2016 by Tim Humphreys to make consumer technology, startups, AI, fintech, smartphones, and African tech easier to understand.",
    "",
    "The team writes for everyone the other tech sites forgot to write for, without boring the people who already love this stuff.",
    "",
    "From Tim Humphreys and Lulu Kiritu to every contributor who joins the newsroom, tecMAMBO works as a translation layer: plain English first, with deeper technical detail when readers need it.",
    "",
    "## Why tecMAMBO?",
    "",
    "Mambo is Swahili for things, matters, what's going on. tecMAMBO is what's up in tech, explained the way a good friend would explain it.",
    "",
    "## What we stand for",
    "",
    "- Plain English first.",
    "- Clear, not dumbed down.",
    "- Independent and honest.",
    "- Show the workings.",
    "- Warmth over jargon.",
    "- Rooted here, useful everywhere.",
    "",
    "## In brief",
    "",
    "- Founded 2016",
    "- Based in Nairobi, Kenya",
    `- ${explainerAnalysisCount} explainers and analyses`,
    `- ${terms.length} plain-English glossary terms`,
    "- Free to read",
    "",
    "## Founder",
    "",
    "Tim Humphreys founded tecMAMBO in 2016 on a stubborn belief that clarity is a feature, not a compromise.",
    "",
    "Canonical: https://tecmambo.com/about"
  ].join("\n");
}
