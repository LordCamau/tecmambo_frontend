export type ArticleInlineToken =
  | { type: "text"; value: string; start: number }
  | { type: "link"; value: string; href: string; start: number }
  | { type: "strong"; value: string; start: number }
  | { type: "emphasis"; value: string; start: number };

const inlinePattern = /\[([^\]]+)\]\((\/[a-z0-9_/?#=&.-]+)\)|\*\*([^*\n]+)\*\*|(?<!\*)\*([^*\n]+)\*(?!\*)/gi;

function stripEmphasisMarkers(value: string) {
  return value
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}

export function parseArticleInlineMarkup(text: string): ArticleInlineToken[] {
  const tokens: ArticleInlineToken[] = [];
  let cursor = 0;

  for (const match of text.matchAll(inlinePattern)) {
    const start = match.index ?? 0;
    if (start > cursor) tokens.push({ type: "text", value: text.slice(cursor, start), start: cursor });

    if (match[1] && match[2]) {
      tokens.push({
        type: "link",
        value: stripEmphasisMarkers(match[1]),
        href: match[2],
        start
      });
    } else if (match[3]) {
      tokens.push({ type: "strong", value: match[3], start });
    } else {
      tokens.push({ type: "emphasis", value: match[4], start });
    }
    cursor = start + match[0].length;
  }

  if (cursor < text.length) tokens.push({ type: "text", value: text.slice(cursor), start: cursor });
  return tokens.length ? tokens : [{ type: "text", value: text, start: 0 }];
}
