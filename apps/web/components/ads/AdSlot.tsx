import styles from "./AdSlot.module.css";

export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  if (process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "true") return null;
  return (
    <aside className={styles.slot} aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}
