import clsx from "clsx";
import { formats } from "@/lib/formats";
import type { Article, Format } from "@/lib/types";
import styles from "./FormatBadge.module.css";

export function FormatBadge({ format, reviewMethod }: { format: Format; reviewMethod?: Article["reviewMethod"] }) {
  const entry = formats[format];
  const label = format === "review" && reviewMethod !== "hands_on" ? "Research-based analysis" : entry.label;
  return (
    <span className={clsx(styles.badge, styles[entry.badge])}>
      {label}
    </span>
  );
}
