# tecMAMBO low-value-content remediation report

## Outcome

The technical and structural remediation is complete in the repository. This does not guarantee Google AdSense approval. Editorial expansion and the optional WordPress field migration remain human follow-up work.

The audit covers 387 records: 170 articles, 98 glossary terms, core pages, and archive records. It finds 131 articles eligible for public discovery, 39 articles retained outside discovery, and 98 glossary term pages retained with `noindex, follow`. The repeatable audit reports zero high-confidence discovery leaks. The link audit checks 170 articles and reports zero broken or raw internal links.

## Original problems found

- Public eligibility was implemented differently across homepage, archive, related-story, search, feed, sitemap, glossary, and LLM surfaces.
- Three unfinished buying guides contained explicit pre-publication or verification instructions.
- One AI review contained unsupported first-person testing claims.
- Research-based product assessments could display scores and Review structured data without hands-on evidence.
- All 98 short glossary term pages were indexable and promoted through sitemaps and feeds despite limited standalone value.
- Search, thin archives, preview content, and non-production deployments did not have a complete indexing policy.
- Forty-four internal article references were plain paths rather than crawlable anchor links.
- WordPress had no documented fields for editorial readiness, indexing choice, review method, or testing evidence.

## Implementation

- Added one public content eligibility and indexing module used by discovery queries and metadata.
- Kept direct article URLs available for editorial continuity while excluding unfinished and thin articles from homepage, archives, search, related stories, feeds, sitemaps, and LLM promotion.
- Applied `noindex, follow` to retained unfinished and thin articles.
- Kept `/glossary` indexable while applying a configurable multi-signal threshold to individual terms.
- Removed non-qualifying glossary terms from glossary feeds, sitemap output, and LLM promotion.
- Added `noindex, follow` to search and thin archives, and `noindex, nofollow` to preview pages.
- Added deployment-wide noindex behavior for preview, development, or `NO_INDEX=true` environments.
- Reclassified uncertain reviews as research-based analysis, removed visible unsupported scores, and limited Review schema to evidence-backed hands-on reviews.
- Added visible review disclosures and a required How we tested block for any future hands-on review.
- Converted 44 raw internal paths to title-based Markdown links and added server-rendered link output.
- Added Corrections policy to the footer trust links.
- Added optional WordPress GraphQL support behind `WORDPRESS_EDITORIAL_CONTROLS_AVAILABLE=true`.
- Added repeatable content and internal-link audit commands with CI failure modes and an allowlist.

## Routes excluded for explicit editorial reasons

- `/wallet-watch/best-smartphones-under-ksh-15-000-right-now`
- `/wallet-watch/five-power-banks-that-actually-last-a-full-day-ranked-by-price`
- `/wallet-watch/is-a-refurbished-phone-ever-worth-it-we-checked-three-sellers`
- `/reviews/gemini-spark-review`

Thirty-five additional articles below 300 words are retained with `noindex, follow` and removed from discovery. The full route list and reason for every record are in `reports/content-quality-audit.md` and `reports/content-quality-audit.json`.

## Reviews reclassified

- `/reviews/iphone-air-review-the-iphone-that-asks-what-you-re-willing-to-give-up`
- `/reviews/samsung-galaxy-a37-5g-review`
- `/reviews/gemini-spark-review`, also excluded pending verification

The first two remain indexable as research-based Article content with no visible score. Gemini Spark remains noindexed and outside discovery.

## Sitemap and homepage changes

- Removed all 39 ineligible articles from article, image, news, and main sitemap output.
- Removed all 98 non-qualifying glossary term pages from sitemap output.
- Removed search, `/africa/more`, empty or thin archives, and unqualified tag, brand, author, and country hubs from sitemap output.
- Removed all ineligible articles from homepage curation. The pinned hero order remains iPhone 18 Pro variable aperture, Uber and Glovo antitrust, then Kenya home internet.

## Files and route groups changed

- Eligibility, content, SEO, sitemap, CMS mapping, and curation libraries under `apps/web/lib`.
- Article, section, archive, search, glossary, sitemap, feed, and layout routes under `apps/web/app`.
- Review and card presentation components under `apps/web/components`.
- Content source files containing repaired internal links.
- Tests and audit scripts under `apps/web/tests` and `apps/web/scripts`.
- CMS implementation guide under `docs` and audit output under `reports`.

## Editorial and CMS follow-up

- Verify products, prices, availability, and methodology for the three unfinished buying guides.
- Verify Gemini Spark product facts, availability, and any direct-use evidence.
- Expand or consolidate the 35 short articles using verified reporting rather than filler.
- Expand glossary terms only where genuine standalone reader value and sources are available.
- Apply the documented WordPress custom fields and migrate records before enabling the optional GraphQL fragment.

## Validation results

| Check | Result |
| --- | --- |
| No public placeholder content | PASS |
| No draft content in homepage queries | PASS |
| No draft content in category queries | PASS |
| No draft content in search | PASS |
| No draft content in RSS | PASS |
| No draft content in sitemap | PASS |
| Thin glossary pages noindexed | PASS |
| Sitemap contains only canonical indexable URLs | PASS |
| Search pages noindexed | PASS |
| Preview pages protected and noindexed | PASS |
| Review schema used only for evidence-backed hands-on reviews | PASS |
| Unsupported review scores removed from presentation | PASS |
| Article content server-rendered | PASS |
| Internal links validated | PASS |
| Required trust pages available | PASS |
| Production build successful | PASS |
| Type checking successful | PASS |
| Lint successful | PASS |
| Tests successful | PASS, 43 tests and badge contrast checks |
| Content audit successful | PASS, 387 records and zero discovery leaks |
| Internal link audit successful | PASS, 170 articles and zero issues |

## Assumptions and remaining risks

- The repository content model is the active production source unless `CONTENT_SOURCE=wordpress` is configured at deployment.
- WordPress public list queries already request only `PUBLISH` posts. The new editorial fields are not queried until their schema is available and the feature flag is enabled.
- No genuine hands-on review currently has all required evidence fields, so no Review schema is emitted.
- AdSense also evaluates traffic, originality, navigation, policy compliance, and the overall site. These repository changes address the identified technical and structural quality risks but cannot determine the review outcome.
