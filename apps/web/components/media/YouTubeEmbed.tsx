"use client";

import { useEffect, useState } from "react";
import { consentStorageKey } from "@/lib/cookie-consent";
import styles from "./YouTubeEmbed.module.css";

type StoredConsent = {
  choices?: {
    social?: boolean;
  };
};

export function extractYouTubeVideoId(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const id = host === "youtu.be"
      ? url.pathname.split("/").filter(Boolean)[0]
      : ["youtube.com", "m.youtube.com"].includes(host)
        ? url.pathname === "/watch"
          ? url.searchParams.get("v")
          : url.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})$/)?.[1]
        : null;
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function socialConsentGranted() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(consentStorageKey) ?? "null") as StoredConsent | null;
    return stored?.choices?.social === true;
  } catch {
    return false;
  }
}

export function YouTubeEmbed({ url, title, caption }: { url: string; title: string; caption: string }) {
  const videoId = extractYouTubeVideoId(url);
  const [socialConsent, setSocialConsent] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      const granted = socialConsentGranted();
      setSocialConsent(granted);
      if (!granted) setActive(false);
    };
    updateConsent();
    window.addEventListener("tecmambo:consent-change", updateConsent);
    return () => window.removeEventListener("tecmambo:consent-change", updateConsent);
  }, []);

  if (!videoId) return null;

  return (
    <figure className={styles.video}>
      <div className={styles.frame}>
        {active && socialConsent ? (
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
          />
        ) : (
          <div className={styles.facade}>
            <strong>{title}</strong>
            {socialConsent ? (
              <button type="button" onClick={() => setActive(true)}>
                Play embedded video
              </button>
            ) : (
              <p>Embedded playback is available when social media cookies are enabled.</p>
            )}
          </div>
        )}
      </div>
      <figcaption>
        {caption} <a href={url} rel="noreferrer" target="_blank">Watch on YouTube</a>
      </figcaption>
    </figure>
  );
}
