# tecMAMBO Full Implementation Report: Google News, Search, SEO, AIO and GEO

**Report date:** September 10, 2026

**Site:** [tecmambo.com](https://tecmambo.com/)

**Scope:** Complete Phase 2 implementation, full-archive audit, technical SEO, Google News, structured data, crawl controls, image delivery, answer-engine accessibility, production deployment and remaining human-owned actions

**Implementation state:** Published to `main` and verified on production; the approved byline assignment list was not available and was not inferred

## Executive result

| Area | Status | Result |
|---|---|---|
| Genuine sitemap freshness | **Pass** | Deployment-time `lastmod` values were removed; content-backed dates are used instead. |
| Newsworthiness control | **Pass** | Articles can explicitly opt into or out of News sitemap and `NewsArticle` treatment. |
| Article schema selection | **Pass** | Newsworthy reporting uses `NewsArticle`, opinion uses `OpinionNewsArticle`, and evergreen content remains `Article`. |
| Corrections | **Pass** | The model, CMS mapping, validation and visible correction log are implemented. |
| Regression protection | **Pass** | News age/future exclusion, schema fields, FAQ parity and sitemap freshness are tested. |
| Eleven approved bylines | **Needs Human Action** | The referenced approval file containing the exact 9/2 title mapping was absent. No byline was guessed. |
| Core Web Vitals | **Fail / Needs Human Action** | CLS and lab responsiveness are good; representative live Lighthouse runs found LCP failures on several templates. Field INP requires CrUX/Search Console or RUM. |
| HTTPS and HSTS | **Pass** | HSTS is set in application headers and `www` now redirects to the HTTPS apex in one hop. |
| Structured data coverage | **Pass / Needs Human Action** | Article, organization, website, breadcrumb, collection, person, FAQ and glossary term schema are implemented. Author `sameAs` awaits approved profile URLs. |
| Internal linking | **Pass** | No orphan article or broken internal article link was found; hubs and relevant related-story modules are populated. |
| Archive metadata | **Pass / Needs Human Action** | No missing or duplicate metadata/canonicals were found. Long snippets and genuinely short articles need editorial decisions. |
| Crawl and indexing controls | **Pass / Needs Human Action** | Real 404s, one-hop redirects, canonicals and robots controls pass. Search Console inspection and sitemap processing remain account-holder tasks. |
| Image SEO and delivery | **Pass** | Image metadata is complete, responsive delivery supports modern formats, and 13 raster-in-SVG heroes were replaced with compact WebP assets. |
| AIO/GEO accessibility | **Pass** | Full article text and current `/llms.txt` output are server-rendered without requiring client JavaScript. |

## 1. Part A confirmation

### A1. Genuine `lastmod` values — Pass

- The sitemap index no longer adds a request or deployment timestamp to child sitemap records.
- Article entries retain their actual `updatedAt` values.
- Format, region, author, topic and brand hub dates are derived from the most recently updated constituent article.
- The home and latest pages follow the latest indexable article; Africa follows the latest relevant regional article; Glossary follows the latest term update.
- Static legal and company pages omit `lastmod` when the application has no trustworthy content-change date.

Regression coverage confirms that hub freshness is content-derived and the sitemap index never contains synthetic `lastmod` values.

### A2. Content-level newsworthiness — Pass

The article model, CMS query/mapping layer and WordPress ACF definition now support `isNewsworthy`.

Eligibility works as follows:

- `isNewsworthy: true` explicitly qualifies a gated article for News treatment.
- `isNewsworthy: false` explicitly excludes it.
- Existing `news` and `business` stories retain the previous default when the field is absent.
- Editorial gating, source review, human approval and the 48-hour publication window still apply.
- Future-dated stories are excluded rather than accidentally passing the age calculation.

The current production News sitemap contains 10 eligible September 9 stories, including approved timely explainers.

### A3. Schema migration — Pass

- Opinion: `OpinionNewsArticle`
- Explicitly or implicitly newsworthy reporting: `NewsArticle`
- Evergreen explainers and real-life features: `Article`
- Hands-on reviews retain `Review`

Every tested article schema contains the required headline, publication and modification dates, canonical entity URL, `Person` author and `NewsMediaOrganization` publisher.

### A4. Structured corrections — Pass

The implementation adds:

- An optional structured array of correction date and description records.
- CMS/WordPress fields and query mapping.
- Validation that dates and descriptions are usable.
- Public-text quality checks that include corrections.
- A visible article section using the form `Correction of [date]: [description]`.

No historic correction was invented or added.

### A5. Regression tests — Pass

Added coverage checks:

- Inclusion of timely, flagged explainers.
- Exclusion of stories older than 48 hours.
- Exclusion of future-dated and unflagged explainers.
- Correct schema subtype and required publisher fields.
- Exact FAQ visible-copy/schema parity.
- Content-derived sitemap freshness and no synthetic sitemap-index dates.

Final automated result: **17 test files and 112 tests passed**.

### A6. Eleven placeholder bylines — Needs Human Action

The implementation prompt refers to `phase2-approval-and-decisions-2026-09-10.md` for the exact assignment of nine stories to Tim Humphreys and two to Lulu Camau. That file was not present in the repository or available attachments.

The instruction also prohibits judgment calls and byline changes outside the exact approved list. Therefore, the eleven assignments remain unchanged. Editorial must provide the title-to-author mapping or restore the referenced file; implementation is then mechanical.

## 2. Part B findings and fixes

### B1. Core Web Vitals and page experience — Fail / Needs Human Action

Representative live Lighthouse runs were recorded before deployment of this implementation. INP is not produced by a load-only Lighthouse run, so TBT is reported as its laboratory diagnostic proxy. Google recommends real-user field data for INP and explicitly notes that Lighthouse uses TBT instead.

#### Mobile

| Template | Performance | LCP | CLS | TBT | Result |
|---|---:|---:|---:|---:|---|
| Article | 98 | 2,002 ms | 0 | 40 ms | **Pass** |
| Author | 94 | 2,880 ms | 0 | 24 ms | **Fail: LCP** |
| Homepage | 98 | 1,808 ms | 0 | 94 ms | **Pass** |
| Hub | 83 | 4,564 ms | 0 | 40 ms | **Fail: LCP** |

#### Desktop

| Template | Performance | LCP | CLS | TBT | Result |
|---|---:|---:|---:|---:|---|
| Article | 67 | 3,122 ms | 0 | 0 ms | **Fail: LCP** |
| Author | 63 | 4,155 ms | 0 | 0 ms | **Fail: LCP** |
| Homepage | 65 | 3,685 ms | 0 | 0 ms | **Fail: LCP** |
| Hub | 68 | 3,121 ms | 0 | 0 ms | **Fail: LCP** |

Implemented in this pass:

- Article hero images already receive explicit dimensions and priority loading.
- Below-the-fold video media remains lazy-loaded.
- Thirteen August 21 raster images wrapped in SVG were converted to real 1040×520 WebP files. Their active total dropped from approximately **8.6 MB to 688 KB**, a reduction of about 92%.
- The one actual vector illustration remains SVG.
- HSTS is now emitted as `max-age=63072000; includeSubDomains; preload`.
- Requests to `www.tecmambo.com` now redirect directly to the equivalent HTTPS apex URL with the path and query preserved.

Remaining human/data action: inspect the Core Web Vitals report in Search Console or PageSpeed Insights after deployment, particularly field INP and LCP at the 75th percentile. The lab results identify an LCP problem but cannot establish real-user INP.

Reference: [Google Web Vitals measurement guidance](https://web.dev/articles/vitals).

### B2. Structured data completeness — Pass / Needs Human Action

- Article pages already contain actual-navigation `BreadcrumbList` data.
- Latest, author, topic and brand archives now expose `BreadcrumbList`; indexable archives also expose `CollectionPage` with their article collection.
- Breadcrumbs only identify real navigable levels and do not invent nonexistent topic/brand indexes.
- The homepage has `WebSite` and working `SearchAction` markup for `/search?q={search_term_string}`.
- Author pages expose `Person` with `jobTitle`, expertise, profile URL, image and `worksFor` linked to the site's `NewsMediaOrganization` identity.
- The model now accepts authorized author `sameAs` URLs, but none were fabricated.
- Glossary pages already provide `DefinedTerm` and `DefinedTermSet` schema, so no unapproved content restructuring was necessary.

Human action: provide any professional profile URLs Tim Humphreys and Lulu Camau have explicitly approved for publication. Leave the field empty if none are approved.

### B3. Internal linking and topical structure — Pass

- Every audited article appears in its format hub; orphan count: **0**.
- Hub cards use ordinary crawlable HTML links to their constituent articles.
- Article breadcrumb navigation links back to the relevant format section.
- Related stories are selected using shared tag overlap, not merely recency.
- The full local link audit checked **252 articles** and found **0 link issues**.
- One legacy opinion URL pointing to an existing real-life article now has a permanent redirect, eliminating the only link-audit failure.

### B4. Metadata and duplicate-content hygiene — Pass / Needs Human Action

The full 179-article live archive audit found:

- Missing title tags: **0**
- Missing meta descriptions: **0**
- Duplicate title tags: **0**
- Duplicate meta descriptions: **0**
- Missing or mismatched self-canonicals: **0**
- Duplicate canonical targets: **0**
- Accidental article `noindex`: **0**
- Title tags longer than approximately 60 characters: **43**
- Meta descriptions longer than approximately 160 characters: **38**
- Articles below approximately 600 words of body copy: **46**

No title, description, headline or article body was automatically rewritten. The length findings are editorial opportunities, not proof of a quality violation; the 46 shorter stories require an individual expand, retain, consolidate, noindex or retire decision based on usefulness and intent.

### B5. Crawl efficiency and indexing signals — Pass / Needs Human Action

- A nonexistent URL returns HTTP **404**, not a soft 404.
- Audited sitemap article URLs return 200 and do not traverse redirect chains.
- The canonical-host redirect is one hop.
- Robots directives and canonical tags are internally consistent.
- Thin utility/search pages and low-value archives are guarded by existing archive-indexability logic.
- Sitemap URLs are absolute and canonical; `robots.txt` advertises the sitemap index.

No IndexNow integration was added. Google's current official recrawl guidance lists Search Console inspection, sitemaps/its API, `robots.txt` discovery and WebSub rather than IndexNow. Search Console submission also requires account ownership.

Human action: submit or reconfirm [the sitemap index](https://tecmambo.com/sitemap-index.xml) and inspect processing in [Google Search Console](https://search.google.com/search-console). References: [Google's sitemap submission guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

### B6. Image SEO — Pass

The audit found:

- Referenced local image assets missing from disk: **0**
- Hero images missing declared dimensions after fixes: **0**
- Empty or generic hero alt text: **0**
- Hero alt text that merely repeats the headline: **0**
- Empty inline-image alt text: **0**
- The image sitemap is generated from the current indexable article inventory.
- Next Image is configured for responsive AVIF/WebP delivery.
- Thirteen active raster-in-SVG heroes now use compact WebP source assets and accurate MIME/dimension metadata.
- Explicitly approved blank image-credit decisions are recorded as intentional omissions rather than quality-gate errors.

## 3. Part C findings and fixes

### C1. Answer-engine accessibility — Pass

- `/llms.txt` is generated from current content on request and participates in CMS revalidation; it is not a stale checked-in snapshot.
- Major named AI crawlers remain allowed by `robots.txt`.
- Article routes are statically generated or server-rendered. Raw initial HTML includes the full article text, headline, byline, dates, links and structured data without requiring client JavaScript.
- The production build generated **560 static pages** successfully.
- Quick-answer paragraphs are included in article speakable selectors when editorial supplies the block.

### C2. Extraction-friendly authoring workflow — Pass

- `quickAnswer` is now an optional first-class article/CMS field.
- When present, it renders near the start of the article in a distinct, semantic Quick Answer block.
- Existing optional FAQ content remains single-sourced to visible copy and `FAQPage` data, preventing schema drift.
- No Quick Answer or FAQ was auto-generated for the archive.

Editorial can now use these components for suitable explainers without making them mandatory for every story.

## 4. Verification record

| Check | Result |
|---|---|
| Unit/integration tests | **Pass: 17 files, 112 tests** |
| Badge contrast browser checks | **Pass** |
| ESLint | **Pass** |
| TypeScript | **Pass** |
| Production build | **Pass: 560 static pages** |
| Content quality CI | **Pass: 559 public records, 0 high-confidence discovery leaks** |
| Link audit CI | **Pass: 252 articles, 0 issues** |
| Production deployment | **Pass: core implementation commit `47baacb` published** |
| Production HSTS | **Pass** |
| Production `www` canonical redirect | **Pass: one-hop 308, path/query preserved** |
| Production nonexistent URL | **Pass: HTTP 404** |
| Production News sitemap | **Pass: 10 eligible current entries** |
| Production sitemap index synthetic dates | **Pass: no `<lastmod>`** |
| Production WebP asset delivery | **Pass: HTTP 200** |

## 5. Final human checklist

1. **Editorial owner:** provide `phase2-approval-and-decisions-2026-09-10.md`, or a replacement list mapping each of the eleven named articles to Tim Humphreys or Lulu Camau. Do not send only “9 Tim / 2 Lulu”; the exact title mapping is required.
2. **Search Console owner:** open [Google Search Console](https://search.google.com/search-console), confirm the `tecmambo.com` Domain property, submit/reconfirm `https://tecmambo.com/sitemap-index.xml`, and review sitemap errors, News discovery, indexing, manual actions and crawl statistics.
3. **Performance owner:** after deployment, review Search Console Core Web Vitals and [PageSpeed Insights](https://pagespeed.web.dev/) for field LCP/INP. Prioritize the hub and author templates and the desktop LCP failures shown above.
4. **Editorial/SEO owner:** review the 43 long titles and 38 long descriptions for clarity and search presentation. Change only where a shorter version is genuinely better.
5. **Editorial owner:** triage the 46 sub-600-word stories individually. Expand only where additional reporting adds value; otherwise retain, consolidate, noindex or retire by editorial decision.
6. **Author/editorial owner:** provide explicitly authorized professional profile URLs for author `sameAs`, or confirm that the fields should remain empty.
7. **Publisher owner, optional:** ordinary Google News publication pages are now generated automatically and no longer rely on submitted Publisher Center feeds/locations. Use [Publisher Center](https://publishercenter.google.com/) only for still-supported products and settings such as Reader Revenue Manager or News Showcase. See [Google's transition notice](https://support.google.com/news/publisher-center/answer/15898024).

## Final verdict

The authorized engineering work is complete and verified. The site now has truthful sitemap freshness, editorial newsworthiness controls, correct schema selection, structured corrections, stronger archive schema, repaired canonical-host handling, validated crawl behavior, extraction-friendly CMS fields and substantially lighter active hero assets.

The remaining work is not an undiscovered code defect: it consists of the absent exact byline assignment file, account-owned Google checks, field performance data and editorial decisions about metadata and short-form archive content.
