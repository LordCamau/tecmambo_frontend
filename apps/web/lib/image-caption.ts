function withClosingPeriod(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return `${trimmed.replace(/[.!?]+$/, "")}.`;
}

function normalizedCredit(value: string) {
  return value
    .trim()
    .replace(/^(?:image\s+)?credit:\s*/i, "")
    .replace(/[.!?]+$/, "")
    .trim();
}

export function formatImageCaption(caption?: string | null, credit?: string | null) {
  const captionText = caption ? withClosingPeriod(caption) : "";
  const creditName = credit ? normalizedCredit(credit) : "";
  const creditText = creditName ? `Credit: ${creditName}.` : "";
  return [captionText, creditText].filter(Boolean).join(" ");
}
