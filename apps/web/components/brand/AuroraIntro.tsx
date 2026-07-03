"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./AuroraIntro.module.css";

const INTRO_STORAGE_KEY = "tecmambo_intro_seen";
const INTRO_SEQUENCE_MS = 2260;
const INTRO_REDUCED_MS = 420;
const INTRO_MAX_MS = 2500;
const INTRO_EXIT_MS = 260;

export function AuroraIntro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    if (!root.classList.contains("js-intro")) {
      setMounted(false);
      return;
    }

    let dismissed = false;
    let ready = document.readyState === "complete";
    const startedAt = Number(root.dataset.introStartedAt) || performance.now();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = prefersReducedMotion ? INTRO_REDUCED_MS : INTRO_SEQUENCE_MS;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;

      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        // Session storage can be unavailable in strict privacy modes.
      }

      root.classList.add("js-intro-lifting");
      window.setTimeout(() => {
        root.classList.remove("js-intro", "js-intro-lifting");
        delete root.dataset.introStartedAt;
        setMounted(false);
      }, INTRO_EXIT_MS);
    };

    const dismissWhenReady = () => {
      if (!ready) return;
      const elapsed = performance.now() - startedAt;
      window.setTimeout(dismiss, Math.max(0, minimumDuration - elapsed));
    };

    const revealWhenReady = () => {
      ready = true;
      dismissWhenReady();
    };

    const hardCap = window.setTimeout(dismiss, Math.max(0, INTRO_MAX_MS - (performance.now() - startedAt)));
    const sequenceDone = window.setTimeout(dismissWhenReady, Math.max(0, minimumDuration - (performance.now() - startedAt)));

    if (ready) {
      dismissWhenReady();
    } else {
      window.addEventListener("load", revealWhenReady, { once: true });
    }

    return () => {
      window.clearTimeout(hardCap);
      window.clearTimeout(sequenceDone);
      window.removeEventListener("load", revealWhenReady);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className={styles.intro}>
      <div className={styles.stage}>
        <div className={styles.mark}>
          <Image src="/brand/tecMAMBO-wp.svg" alt="" width={1146} height={293} priority sizes="min(68vw, 380px)" />
          <span className={styles.auroraResolve} />
        </div>
        <p className={styles.tagline}>
          <span>Made to be</span>
          <span className={styles.wordViewport}>
            <span className={styles.wordStack}>
              <span>clear</span>
              <span>known</span>
              <span>useful</span>
              <span className={styles.finalWord}>understood.</span>
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
