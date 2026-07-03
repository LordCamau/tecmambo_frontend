import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import type { SpecRow } from "@/lib/types";
import styles from "./GoDeeper.module.css";

export function GoDeeper({ intro, specs, renderText }: { intro: string; specs: SpecRow[]; renderText?: (text: string, keyPrefix: string) => ReactNode[] }) {
  const text = (value: string, keyPrefix: string) => renderText?.(value, keyPrefix) ?? value;

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <span>Go deeper</span>
        <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
      </summary>
      <div className={styles.content}>
        <p>{text(intro, "go-deeper-intro")}</p>
        {specs.length > 0 ? (
          <dl className={styles.specs}>
            {specs.map((spec) => (
              <div className={styles.row} key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{text(spec.value, `go-deeper-${spec.label}`)}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </details>
  );
}
