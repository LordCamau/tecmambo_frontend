"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import styles from "./AuroraIntro.module.css";

const LOADER_STORAGE_KEY = "tm_loader_seen";
const LOADER_SRC = "/tecmambo-loader.gif";
const LOADER_PLAY_MS = 4_000;
const LOADER_EXIT_MS = 500;

function waitForImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("tecMAMBO loader GIF failed to load."));
  }).then(() => (image.decode ? image.decode().catch(() => undefined) : undefined));
}

export function AuroraIntro() {
  const [mounted, setMounted] = useState(true);
  const [gifReady, setGifReady] = useState(false);
  const frameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const exitRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let hasSeenLoader = false;

    try {
      hasSeenLoader = sessionStorage.getItem(LOADER_STORAGE_KEY) === "1";
    } catch {
      hasSeenLoader = false;
    }

    if (!root.classList.contains("js-intro") || prefersReducedMotion || hasSeenLoader) {
      root.classList.remove("js-intro", "js-intro-lifting");
      setMounted(false);
      return;
    }

    let cancelled = false;
    const image = new window.Image();
    image.src = LOADER_SRC;

    const dismiss = () => {
      if (cancelled) return;

      try {
        sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
      } catch {
        // Session storage can be unavailable in strict privacy modes.
      }

      root.classList.add("js-intro-lifting");
      exitRef.current = window.setTimeout(() => {
        root.classList.remove("js-intro", "js-intro-lifting");
        setMounted(false);
      }, LOADER_EXIT_MS);
    };

    waitForImage(image)
      .then(() => {
        if (cancelled) return;
        setGifReady(true);
        frameRef.current = window.requestAnimationFrame(() => {
          timerRef.current = window.setTimeout(dismiss, LOADER_PLAY_MS);
        });
      })
      .catch(() => {
        if (cancelled) return;
        timerRef.current = window.setTimeout(dismiss, LOADER_EXIT_MS);
      });

    return () => {
      cancelled = true;
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (exitRef.current) window.clearTimeout(exitRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" role="presentation" className={styles.intro} data-aurora-intro>
      {gifReady ? <img className={styles.loaderGif} src={LOADER_SRC} alt="" width="450" height="150" draggable={false} /> : null}
    </div>
  );
}
