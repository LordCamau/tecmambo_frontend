import type { ArticleMediaSlot } from "@/lib/types";
import { ImageCaption } from "@/components/media/ImageCaption";
import styles from "./ArticleMediaPlaceholder.module.css";

export function ArticleMediaPlaceholder({ slot }: { slot: ArticleMediaSlot }) {
  const label = slot.type === "infographic" ? "Infographic provision" : "Image provision";
  const description = slot.alt ?? slot.caption;

  return (
    <figure className={styles.figure} data-media-slot={slot.id} data-media-status="placeholder">
      <div className={styles.placeholder} role="img" aria-label={description}>
        <span>{label}</span>
        <p>{description}</p>
      </div>
      <ImageCaption caption={slot.caption} />
    </figure>
  );
}
