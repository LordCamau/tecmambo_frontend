import { formatImageCaption } from "@/lib/image-caption";
import styles from "./ImageCaption.module.css";

type ImageCaptionProps = {
  caption?: string | null;
  credit?: string | null;
};

// Permanent presentation contract: see ./CAPTIONS.md before changing this component.
export function ImageCaption({ caption, credit }: ImageCaptionProps) {
  const text = formatImageCaption(caption, credit);
  return text ? <figcaption className={styles.caption}>{text}</figcaption> : null;
}
