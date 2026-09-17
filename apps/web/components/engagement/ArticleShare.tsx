"use client";

import { Check, Copy, OctagonAlert } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { articleShareLinks } from "@/lib/share-links";
import { FacebookMark, LinkedInMark, WhatsAppMark, XMark } from "./BrandIcons";
import styles from "./ArticleShare.module.css";

type CopyState = "idle" | "copied" | "failed";

function track(eventName: string, method: string) {
  window.gtag?.("event", eventName, {
    event_category: "reader_engagement",
    method,
    page_location: window.location.href
  });
}

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, value.length);
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy command was not accepted");
}

export function ArticleShare({ canonicalUrl, title }: { canonicalUrl: string; title: string }) {
  const links = useMemo(() => articleShareLinks(canonicalUrl, title), [canonicalUrl, title]);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyLink = async () => {
    window.clearTimeout(resetTimer.current);
    try {
      let copiedWithClipboard = false;
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(canonicalUrl);
          copiedWithClipboard = true;
        } catch {
          copiedWithClipboard = false;
        }
      }
      if (!copiedWithClipboard) {
        fallbackCopy(canonicalUrl);
      }
      setCopyState("copied");
      track("article_copy_link", "copy_link");
    } catch {
      setCopyState("failed");
    }
    resetTimer.current = window.setTimeout(() => setCopyState("idle"), 2400);
  };

  return (
    <section className={styles.share} aria-labelledby="share-story-title">
      <header>
        <h2 id="share-story-title">Share this story</h2>
        <p>Enjoyed this? Share it with someone who&apos;d appreciate it.</p>
      </header>
      <div className={styles.actions}>
        <a
          aria-label="Share this article on Facebook"
          className={`${styles.action} ${styles.facebook}`}
          href={links.facebook}
          rel="nofollow noopener noreferrer"
          target="_blank"
          onClick={() => track("article_share", "facebook")}
        >
          <FacebookMark className={styles.brandIcon} />
          <span>Facebook</span>
        </a>
        <a
          aria-label="Share this article on LinkedIn"
          className={`${styles.action} ${styles.linkedin}`}
          href={links.linkedin}
          rel="nofollow noopener noreferrer"
          target="_blank"
          onClick={() => track("article_share", "linkedin")}
        >
          <LinkedInMark className={styles.brandIcon} />
          <span>LinkedIn</span>
        </a>
        <a
          aria-label="Share this article on X"
          className={`${styles.action} ${styles.x}`}
          href={links.x}
          rel="nofollow noopener noreferrer"
          target="_blank"
          onClick={() => track("article_share", "x")}
        >
          <XMark className={styles.brandIcon} />
          <span>X</span>
        </a>
        <a
          aria-label="Share this article on WhatsApp"
          className={`${styles.action} ${styles.whatsapp}`}
          href={links.whatsapp}
          rel="nofollow noopener noreferrer"
          target="_blank"
          onClick={() => track("article_share", "whatsapp")}
        >
          <WhatsAppMark className={styles.brandIcon} />
          <span>WhatsApp</span>
        </a>
        <button
          aria-label={copyState === "copied" ? "Article link copied" : copyState === "failed" ? "Copy failed, try copying the article URL again" : "Copy article link"}
          className={`${styles.action} ${styles.copy}`}
          type="button"
          onClick={copyLink}
        >
          {copyState === "copied" ? <Check aria-hidden="true" /> : copyState === "failed" ? <OctagonAlert aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span>{copyState === "copied" ? "Link Copied" : copyState === "failed" ? "Try Again" : "Copy Link"}</span>
        </button>
      </div>
      <span className="visually-hidden" role="status" aria-live="polite">
        {copyState === "copied" ? "Article link copied to clipboard." : copyState === "failed" ? "The article link could not be copied. Please try again." : ""}
      </span>
    </section>
  );
}
