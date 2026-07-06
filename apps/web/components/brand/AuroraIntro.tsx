"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./AuroraIntro.module.css";

const INTRO_STORAGE_KEY = "tecmambo_intro_seen";
const INTRO_FINAL_WORD_MS = 3180;
const INTRO_WORD_TRANSITION_MS = 360;
const INTRO_FINAL_HOLD_MS = 1800;
const INTRO_SEQUENCE_MS = INTRO_FINAL_WORD_MS + INTRO_WORD_TRANSITION_MS + INTRO_FINAL_HOLD_MS;
const INTRO_REDUCED_MS = 1200;
const INTRO_MAX_MS = 7600;
const INTRO_EXIT_MS = 500;

export function AuroraIntro() {
  const [mounted, setMounted] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const root = document.documentElement;

    if (!root.classList.contains("js-intro")) {
      setMounted(false);
      return;
    }

    let dismissed = false;
    let ready = document.readyState === "complete";
    const startedAt = performance.now();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = prefersReducedMotion ? INTRO_REDUCED_MS : INTRO_SEQUENCE_MS;
    const wordTimers = prefersReducedMotion
      ? [window.setTimeout(() => setWordIndex(3), 0)]
      : [
          window.setTimeout(() => setWordIndex(1), 1060),
          window.setTimeout(() => setWordIndex(2), 2120),
          window.setTimeout(() => setWordIndex(3), INTRO_FINAL_WORD_MS)
        ];

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
      wordTimers.forEach((timer) => window.clearTimeout(timer));
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
          <span className={styles.fixedPhrase}>Made to be</span>
          <span className={styles.wordViewport}>
            <span
              className={`${styles.wordStack} ${
                wordIndex === 1
                  ? styles.wordStackKnown
                  : wordIndex === 2
                    ? styles.wordStackUseful
                    : wordIndex === 3
                      ? styles.wordStackUnderstood
                      : styles.wordStackClear
              }`}
            >
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
