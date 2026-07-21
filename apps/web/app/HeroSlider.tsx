"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { SponsoredBadge } from "@/components/signature/SponsoredBadge";
import { articlePath } from "@/lib/formats";
import type { Article } from "@/lib/types";
import styles from "./page.module.css";

const slideDurationMs = 6500;

type HeroSliderProps = {
  slides: Article[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const carouselSlides = useMemo(() => slides.slice(0, 3), [slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, Math.max(carouselSlides.length - 1, 0)));
  }, [carouselSlides.length]);

  useEffect(() => {
    if (carouselSlides.length < 2 || isPaused) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % carouselSlides.length);
    }, slideDurationMs);

    return () => window.clearInterval(timer);
  }, [carouselSlides.length, isPaused]);

  const activeSlide = carouselSlides[activeIndex] ?? carouselSlides[0];
  if (!activeSlide) return null;

  const activeHref = articlePath(activeSlide.format, activeSlide.slug);
  const slideCount = carouselSlides.length;
  const activePage = String(activeIndex + 1).padStart(2, "0");
  const totalPages = String(slideCount).padStart(2, "0");

  function showPreviousSlide() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + slideCount) % slideCount);
  }

  function showNextSlide() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slideCount);
  }

  return (
    <article
      aria-label="Featured stories"
      className={`${styles.heroCard} ${styles.heroSlider}`}
      onBlur={(event) => {
        const nextFocus = event.relatedTarget as Node | null;
        if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
          setIsPaused(false);
        }
      }}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.heroImage}>
        {carouselSlides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              aria-hidden={isActive ? undefined : true}
              className={styles.heroSlideImage}
              data-active={isActive}
              href={articlePath(slide.format, slide.slug)}
              key={slide.id}
              tabIndex={isActive ? 0 : -1}
            >
              <Image
                alt={slide.image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1180px) 610px, (min-width: 780px) 54vw, calc(100vw - 32px)"
                src={slide.image.src}
              />
            </Link>
          );
        })}
      </div>

      <div className={`${styles.heroCopy} ${styles.heroSlideCopy}`} key={activeSlide.id}>
        <div className={styles.badgeRow}>
          <FormatBadge format={activeSlide.format} />
          {activeSlide.sponsored ? <SponsoredBadge /> : null}
        </div>
        <h1>
          <Link href={activeHref}>{activeSlide.title}</Link>
        </h1>
        <p className={styles.subhead}>{activeSlide.subhead}</p>
        <div className={styles.heroMeta}>
          <span>{activeSlide.author.name}</span>
          <span>{activeSlide.readTime}</span>
        </div>
        {slideCount > 1 ? (
          <div aria-label="Featured story pagination" className={styles.heroSliderControls}>
            <button
              aria-label="Show previous featured story"
              className={styles.heroSliderArrow}
              onClick={showPreviousSlide}
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={16} strokeWidth={2.4} />
            </button>
            <div className={styles.heroSliderDots}>
              {carouselSlides.map((slide, index) => (
                <button
                  aria-current={index === activeIndex ? "step" : undefined}
                  aria-label={`Show featured story ${index + 1}: ${slide.title}`}
                  className={styles.heroSliderDot}
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </div>
            <span aria-label={`Featured story ${activeIndex + 1} of ${slideCount}`} className={styles.heroSliderCounter}>
              {activePage} / {totalPages}
            </span>
            <button
              aria-label="Show next featured story"
              className={styles.heroSliderArrow}
              onClick={showNextSlide}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={16} strokeWidth={2.4} />
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
