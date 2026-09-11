# tecMAMBO Desktop LCP Root-Cause Investigation

**Investigation date:** September 10–11, 2026

**Production site:** [tecmambo.com](https://tecmambo.com/)

**Commit containing the targeted fix:** `b4c9f7b`

**Status:** Root cause confirmed, targeted fix deployed, and all eight controlled post-fix Lighthouse samples pass the 2.5-second LCP threshold

## Executive conclusion

The reported sitewide desktop LCP failure was not caused by a desktop-only image variant, sidebar, ad, third-party widget, webfont, or slow application origin.

Two separate findings explain the data:

1. **The sitewide desktop-versus-mobile reversal was primarily an audit-execution artifact.** All four original desktop audits began at essentially the same instant and measured 495–503 ms network RTT. All four mobile audits also ran together but measured only 81–112 ms RTT. The desktop Lighthouse preset itself specified 40 ms RTT, 10,240 Kbps throughput and no CPU slowdown, so desktop should not have been the harder environment. The raw Lighthouse server-response audit remained only 109–111 ms on those desktop runs. Serial desktop reruns, without an application change, reduced LCP to 739–1,332 ms and measured 46–58 ms RTT.
2. **Author and Hub pages contained a real LCP discovery problem.** Their LCP element was the first story-card image, but the generated image markup used `loading="lazy"`. In controlled pre-fix traces this created 1,035 ms and 1,137 ms resource-load delays on desktop. The first visible card is now the only card marked as priority on those templates, producing an image preload and High request priority while preserving lazy loading for every later card.

The investigation did not find evidence supporting another speculative compression, code-splitting, or third-party removal pass.

## 1. Audit methodology

### Pages

| Template | Production URL |
|---|---|
| Article | `https://tecmambo.com/explainers/iphone-duo-official-price-specs-kenya` |
| Author | `https://tecmambo.com/authors/tim-humphreys` |
| Homepage | `https://tecmambo.com/` |
| Hub | `https://tecmambo.com/news` |

### Lighthouse configuration

All measurements used Lighthouse **13.4.1**, headless Chrome and the performance category.

| Setting | Desktop | Mobile |
|---|---:|---:|
| Form factor | Desktop | Mobile |
| Viewport | 1350×940 | 412×823 |
| Device scale factor | 1 | 1.75 |
| Throttling method | Simulated | Simulated |
| Configured RTT | 40 ms | 150 ms |
| Configured throughput | 10,240 Kbps | 1,638.4 Kbps |
| CPU slowdown | 1× | 4× |

The original reports were inspected first. Confirmation and post-fix runs were executed serially, not four-at-once. Query parameters were used only to avoid CDN document-cache ambiguity; they did not change layout or content.

Lighthouse's LCP score is a simulated metric. The LCP breakdown insight contains observed trace phases, so its phase values do not always add up to the simulated LCP score. Phase values in this report are used to identify request discovery and rendering causes, not as a second calculation of the score.

## 2. Actual LCP element by template and viewport

| Template | Desktop LCP element | Mobile LCP element | Breakpoint changes the element? |
|---|---|---|---|
| Article | Article `<h1>` headline | Article `<h1>` headline | No |
| Author | First StoryCard image: “Apple iPhone Duo opened to show its 7.6-inch folding display” | Same first StoryCard image | No |
| Homepage | Lead-story image: “Apple iPhone Duo opened to show its 7.6-inch folding display” | Lead-story `<h1>` headline | **Yes** |
| Hub | First StoryCard image: “A depiction of the upcoming Apple iPhone Fold” | Same first StoryCard image | No |

The homepage is the only audited template where the desktop breakpoint promotes a different element to LCP. That image was already eagerly discovered and was not the cause of the original desktop-wide regression.

## 3. Root-cause evidence

### 3.1 Original desktop runs were network-contended

The four original desktop report timestamps are separated by only 17 milliseconds:

| Template | Original fetch time (UTC) | Measured RTT | Lighthouse server response | LCP TTFB phase | Reported LCP |
|---|---|---:|---:|---:|---:|
| Article | 10:01:37.849 | 503 ms | 109 ms | 1,670 ms | 3,122 ms |
| Author | 10:01:37.832 | 503 ms | 111 ms | 1,676 ms | 4,155 ms |
| Homepage | 10:01:37.832 | 502 ms | 111 ms | 1,675 ms | 3,685 ms |
| Hub | 10:01:37.841 | 495 ms | 109 ms | 1,648 ms | 3,121 ms |

The approximately 500 ms measured RTT appears on every concurrently started desktop run despite the preset's 40 ms configured RTT. The raw origin-response audit is consistently healthy. This rules out an application TTFB floor and explains why even the text-LCP Article page acquired a large delay before paint.

Serial pre-fix desktop confirmation produced:

| Template | Measured RTT | Server response | LCP |
|---|---:|---:|---:|
| Article | 47 ms | 104 ms | 1,332 ms |
| Author | 51 ms | 109 ms | 785 ms |
| Homepage | 46 ms | 108 ms | 739 ms |
| Hub | 58 ms | 119 ms | 830 ms |

Article and Homepage received no new LCP code change between that confirmation and the targeted Author/Hub fix. Their recovery demonstrates that the earlier all-desktop failure was not a stable production behavior.

### 3.2 Responsive image selection is working

The relevant post-deployment requests were Next Image AVIF responses selected from `srcset`, not full-resolution source files:

| Template / viewport | Selected width | Transfer size | LCP relevance |
|---|---:|---:|---|
| Article desktop hero | 1080 px | 19.1 KB | Not LCP; headline is LCP |
| Article mobile hero | 750 px | 11.2 KB | Not LCP; headline is LCP |
| Author desktop first card | 640 px | 8.7 KB | LCP image |
| Author mobile first card | 750 px | 11.2 KB | LCP image |
| Homepage desktop lead image | 640 px | 8.8 KB | LCP image |
| Homepage mobile lead image | 750 px | 11.2 KB | Not LCP; headline is LCP |
| Hub desktop first card | 640 px | 5.5 KB | LCP image |
| Hub mobile first card | 750 px | 6.6 KB | LCP image |

No audited desktop LCP request fell back to an original full-resolution asset. The desktop width and transfer size are appropriate for the rendered card or hero.

### 3.3 No desktop-only blocking widget was implicated

- Google Analytics/Tag Manager was present in both form factors at approximately 189–190 KB transferred.
- Desktop script transfer was approximately 386 KB versus 363 KB on mobile, consistent with the same application and analytics stack rather than a large desktop-only bundle.
- Total Blocking Time was 0 ms in every final desktop run.
- Lighthouse did not attribute the final desktop LCP to a sidebar, advertisement, comments component, social embed or analytics node.
- No business-relevant third-party widget was removed.
- The loaded WOFF2 font used `font-display` behavior that passed Lighthouse's font-display insight; the image-LCP Author and Hub pages were not waiting on text font rendering.

Some mobile runs retained an estimated 150 ms render-blocking CSS opportunity, but that was not desktop-specific and did not explain the original reverse pattern.

### 3.4 Origin TTFB is not the systemic bottleneck

Clean final Lighthouse server-response values were:

| Template | Desktop | Mobile |
|---|---:|---:|
| Article | 111 ms | 88 ms |
| Author | 113 ms | 98 ms |
| Homepage | 110 ms | 99 ms |
| Hub | 102 ms | 85 ms |

One post-fix Hub desktop sample returned 1,107 ms server response and 858 ms measured RTT. It was rejected as a network/edge outlier, then rerun serially at 102 ms server response and 38 ms RTT. The rerun produced 716 ms LCP. The rejected sample is retained conceptually as evidence of single-run Lighthouse variability, not treated as a code regression.

## 4. Confirmed code defect and targeted fix

### Before

Author and section archive pages rendered every StoryCard with the default `priority={false}`. The LCP card therefore generated:

```html
<img loading="lazy" ...>
```

Pre-fix serial trace phases:

| Template / viewport | Resource-load delay | Load duration | Element-render delay |
|---|---:|---:|---:|
| Author desktop | 1,035 ms | 275 ms | 27 ms |
| Author mobile | 436 ms | 275 ms | 18 ms |
| Hub desktop | 1,137 ms | 296 ms | 21 ms |
| Hub mobile | 418 ms | 278 ms | 19 ms |

### Fix

Only the first card on the affected Author and section Hub grids now receives StoryCard priority:

```tsx
{articles.map((article, index) => (
  <StoryCard article={article} key={article.id} priority={index === 0} />
))}
```

This removes `loading="lazy"` from the first card, emits a preload for its selected responsive image and makes the request High priority. All later cards remain lazy-loaded.

Changed templates:

- `apps/web/app/authors/[slug]/page.tsx`
- `apps/web/app/(sections)/[section]/page.tsx`

Production commit: `b4c9f7b`.

### Load-delay result

Clean post-fix trace phases:

| Template / viewport | Before delay | After delay | Reduction | Post-fix request |
|---|---:|---:|---:|---|
| Author desktop | 1,035 ms | 266 ms | 769 ms / 74% | High, preloaded, 8.7 KB |
| Author mobile | 436 ms | 186 ms | 250 ms / 57% | High, preloaded, 11.2 KB |
| Hub desktop | 1,137 ms | 221 ms | 916 ms / 81% | High, preloaded, 5.5 KB |
| Hub mobile | 418 ms | 193 ms | 225 ms / 54% | High, preloaded, 6.6 KB |

## 5. Final Lighthouse results

These are clean, serial, post-deployment runs. All LCP values are below 2,500 ms.

### Desktop

| Template | Score | LCP | FCP | CLS | TBT | Result |
|---|---:|---:|---:|---:|---:|---|
| Article | 90 | 1,237 ms | 1,120 ms | 0 | 0 ms | **Pass** |
| Author | 100 | 723 ms | 525 ms | 0 | 0 ms | **Pass** |
| Homepage | 99 | 729 ms | 529 ms | 0 | 0 ms | **Pass** |
| Hub | 100 | 716 ms | 536 ms | 0 | 0 ms | **Pass** |

### Mobile

| Template | Score | LCP | FCP | CLS | TBT | Result |
|---|---:|---:|---:|---:|---:|---|
| Article | 96 | 2,349 ms | 1,299 ms | 0 | 111 ms | **Pass** |
| Author | 97 | 2,401 ms | 1,537 ms | 0 | 79 ms | **Pass** |
| Homepage | 98 | 2,382 ms | 1,298 ms | 0 | 61 ms | **Pass** |
| Hub | 97 | 2,489 ms | 1,289 ms | 0 | 52 ms | **Pass** |

The Hub mobile sample is only 11 ms inside the laboratory threshold. This is a reason to monitor field data, not evidence for another unmeasured code change.

## 6. Verification

| Check | Result |
|---|---|
| Production author first-card markup | No `loading="lazy"` |
| Production Hub first-card request | High priority and preloaded |
| Unit/integration suite | 17 files, 112 tests passed |
| Badge contrast browser checks | Passed |
| ESLint | Passed |
| TypeScript | Passed |
| Production build | Passed; 560 static pages generated |
| Deployment | Commit `b4c9f7b` live before post-fix audit |

## 7. Remaining human action

**Needs Human Action:** review the Core Web Vitals report in [Google Search Console](https://search.google.com/search-console) after enough post-deployment traffic accumulates. Lighthouse is a controlled laboratory sample, and load-only Lighthouse runs cannot measure real field INP. Confirm the 75th-percentile LCP and INP for Article, Author, Homepage and Hub route groups.

No third-party removal approval is needed because the investigation found no third-party component responsible for the desktop anomaly.

## Final verdict

The desktop-specific failure was not a persistent desktop rendering defect. It was primarily caused by concurrent Lighthouse runs experiencing approximately five times the measured network RTT of the mobile batch. A separate, genuine LCP discovery defect on Author and Hub pages was confirmed and fixed narrowly by prioritizing their first visible card image. The responsive image system, origin response, desktop JavaScript, font loading and third-party stack were ruled out with trace evidence.

All controlled post-fix samples now pass, while field Core Web Vitals monitoring remains the appropriate final validation.
