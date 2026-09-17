"use client";

import { useEffect, useState } from "react";
import { GoogleMark } from "./BrandIcons";
import styles from "./GoogleSourcePrompt.module.css";

type PreferredSourceClient = {
  init: (options: { theme: "light" | "dark"; lang: string }) => void;
  addPreferredSource: () => void;
};

type PreferredSourceCallback = (client: PreferredSourceClient) => void;

declare global {
  interface Window {
    PREFERRED_SOURCE?: PreferredSourceCallback[];
    __tecmamboPreferredSourceClient?: PreferredSourceClient;
    __tecmamboPreferredSourceInitialized?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

function track(eventName: string) {
  window.gtag?.("event", eventName, {
    event_category: "reader_engagement",
    page_location: window.location.href
  });
}

function onCanonicalPublisherDomain() {
  return window.location.hostname === "tecmambo.com" || window.location.hostname === "www.tecmambo.com";
}

export function GoogleSourcePrompt({
  preferredSourceEnabled,
  discoverUrl
}: {
  preferredSourceEnabled: boolean;
  discoverUrl?: string;
}) {
  const [preferredSourceReady, setPreferredSourceReady] = useState(false);

  useEffect(() => {
    if (!preferredSourceEnabled || !onCanonicalPublisherDomain()) return;

    let active = true;
    const connect = (client: PreferredSourceClient) => {
      window.__tecmamboPreferredSourceClient = client;
      if (!window.__tecmamboPreferredSourceInitialized) {
        client.init({
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          lang: "en"
        });
        window.__tecmamboPreferredSourceInitialized = true;
      }
      if (active) setPreferredSourceReady(true);
    };

    if (window.__tecmamboPreferredSourceClient) {
      connect(window.__tecmamboPreferredSourceClient);
    } else {
      window.PREFERRED_SOURCE = window.PREFERRED_SOURCE ?? [];
      window.PREFERRED_SOURCE.push(connect);
    }

    return () => {
      active = false;
    };
  }, [preferredSourceEnabled]);

  if (!preferredSourceEnabled && !discoverUrl) return null;

  const openPreferredSource = () => {
    if (!preferredSourceReady) return;
    track("google_preferred_source_click");
    try {
      window.__tecmamboPreferredSourceClient?.addPreferredSource();
    } catch {
      setPreferredSourceReady(false);
    }
  };

  return (
    <aside className={styles.prompt} aria-labelledby="google-source-title">
      <h2 id="google-source-title">Add tecMAMBO on Google:</h2>
      <div className={styles.actions}>
        {preferredSourceEnabled ? (
          <button
            aria-label="Add tecMAMBO as a Preferred Source on Google"
            className={styles.action}
            disabled={!preferredSourceReady}
            title={preferredSourceReady ? undefined : "Available on tecmambo.com when Google's service is ready"}
            type="button"
            onClick={openPreferredSource}
          >
            <GoogleMark className={styles.googleMark} />
            <span>Preferred Source</span>
          </button>
        ) : null}
        {discoverUrl ? (
          <a
            aria-label="Follow tecMAMBO through its Google Search and Discover profile"
            className={styles.action}
            href={discoverUrl}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => track("google_discover_click")}
          >
            <GoogleMark className={styles.googleMark} />
            <span>Google Discover</span>
          </a>
        ) : null}
      </div>
    </aside>
  );
}
