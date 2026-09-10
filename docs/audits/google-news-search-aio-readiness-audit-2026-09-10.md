# tecMAMBO Google News, Search and AIO/GEO Readiness Audit

**Audit date:** September 10, 2026

**Site:** [tecmambo.com](https://tecmambo.com/)

**Scope:** Live endpoints, published archive, rendered metadata and repository templates

**Phase:** Phase 1 — Audit only

> No Phase 2 implementation changes were made. Sitewide changes remain pending editorial review and approval of this report.

## Executive verdict

| Area | Status | Finding |
|---|---|---|
| Robots and crawl access | **Pass** | Public sections, images and assets are crawlable. |
| Standard sitemaps | **Pass** | The sitemap index covers articles, pages, hubs and images. |
| Google News sitemap | **Pass / Needs Review** | The protocol is valid, but only `news` and `business` formats qualify. |
| Sitemap `lastmod` integrity | **Fail** | Article dates are genuine; page, hub and sitemap-index dates reset on deployment. |
| Article structured data | **Partial Fail** | Required fields are present, but explainers and real-life articles use generic `Article`. |
| Organization schema | **Pass** | Sitewide `NewsMediaOrganization` markup is comprehensive. |
| FAQ schema | **Pass** | The iPhone Duo FAQ schema matches the rendered Q&A exactly. |
| Author pages and links | **Pass** | Tim Humphreys and Lulu Camau have linked profile pages and biographies. |
| Placeholder bylines | **Needs Human Action** | Eleven published articles still use “tecMAMBO Team.” |
| Trust and policy pages | **Pass** | All required pages are live, substantive and linked in the footer. |
| Correction logging | **Fail** | A policy exists, but there is no article-level correction record or renderer. |
| Search Console | **Needs Human Action** | A verification token exists in DNS, but account access and indexing data require human confirmation. |
| Publisher Center | **Optional Human Action** | It no longer controls ordinary Google News publication pages. |
| Publishing cadence | **Needs Human Action** | The archive is bursty, with several substantial publishing gaps. |
| Domain history | **Context** | Earlier lifestyle and travel content may slow the establishment of topical authority. |
| AI crawler accessibility | **Pass** | Major AI crawlers are allowed and `/llms.txt` is available. |

## 1. Crawl configuration and sitemaps

### Pass — robots.txt

The live [robots.txt](https://tecmambo.com/robots.txt):

- Uses absolute sitemap URLs.
- Does not block `/news`, `/explainers`, `/business`, `/africa`, `/opinion`, `/real-life` or `/wallet-watch`.
- Does not block images, Next.js assets or other resources needed for rich results.
- Explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, Claude, Perplexity, Google-Extended and other named crawlers.
- Only blocks internal API operations such as preview, revalidation and search reindexing.

### Pass — standard sitemap coverage

The [sitemap index](https://tecmambo.com/sitemap-index.xml) references:

- [sitemap.xml](https://tecmambo.com/sitemap.xml)
- [pages-sitemap.xml](https://tecmambo.com/pages-sitemap.xml)
- [hubs-sitemap.xml](https://tecmambo.com/hubs-sitemap.xml)
- [articles-sitemap.xml](https://tecmambo.com/articles-sitemap.xml)
- [image-sitemap.xml](https://tecmambo.com/image-sitemap.xml)
- [news-sitemap.xml](https://tecmambo.com/news-sitemap.xml)

The audit found 179 unique published article URLs, matching the live article sitemap.

### Pass / Needs Review — Google News sitemap

The live [news sitemap](https://tecmambo.com/news-sitemap.xml) is technically valid:

- It uses the correct Google News namespace.
- It includes `<news:publication>` with `tecMAMBO` and language `en`.
- It uses original article publication dates.
- Its titles match the published articles.
- Only articles inside the two-day eligibility window are retained.

Google's current guidance says News sitemaps should contain articles published during the last two days and may legitimately become empty when nothing recent qualifies. See [Google's News sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap).

One coverage concern remains: the generator only considers articles categorized as `news` or `business`. Timely explainers such as the iPhone Duo article are excluded even when newly published. Editorial should decide whether newsworthy explainers and opinion analysis should qualify based on content rather than section alone.

### Fail — misleading `lastmod` updates

Article sitemap entries correctly use each article's actual `updatedAt` value.

However:

- Every sitemap listed in the sitemap index receives the deployment or build timestamp.
- Static pages receive the deployment timestamp.
- All hub and archive URLs receive the deployment timestamp.

For example, every child sitemap inspected during the audit reported `2026-09-10T04:07:07.799Z`. This can signal changes that did not actually happen and should be corrected in Phase 2.

## 2. Structured data

Five live articles were inspected:

- [News sample](https://tecmambo.com/news/apple-surprise-and-shine-event-2026-preview): `NewsArticle`
- [Explainer sample](https://tecmambo.com/explainers/iphone-duo-official-price-specs-kenya): `Article`
- [Business sample](https://tecmambo.com/business/yellow-series-c-smartphone-solar-financing-africa): `NewsArticle`
- [Opinion sample](https://tecmambo.com/opinion/bolt-kenya-10-years-ksh19-billion-investment): `OpinionNewsArticle`
- [Real-life sample](https://tecmambo.com/real-life/roam-gen-3-battery-working-boda-boda-riders): `Article`

All five include:

- `headline`
- `datePublished`
- `dateModified`
- `author` as `Person`
- Author name and profile URL
- `publisher` as `NewsMediaOrganization`
- Publisher logo
- `mainEntityOfPage`

The systemic gap is the schema-type mapping: explainers and real-life features use generic `Article`. This fails the requested tecMAMBO template standard, although it is not by itself a Google News eligibility failure. Google explicitly supports `Article`, `NewsArticle` and `BlogPosting` and says article markup is not mandatory for Google News eligibility. See [Google's Article structured-data documentation](https://developers.google.com/search/docs/appearance/structured-data/article).

### Pass — organization schema

A sitewide `NewsMediaOrganization` record includes:

- Name and legal name
- Logo
- URL
- Founding date of 2016
- Founder
- Nairobi address
- Coverage areas
- Facebook, Instagram, YouTube, X and TikTok `sameAs` links
- Editorial, ethics, corrections, sourcing, feedback and funding-policy URLs

### Pass — FAQ schema

The [iPhone Duo article](https://tecmambo.com/explainers/iphone-duo-official-price-specs-kenya) contains six FAQ entries.

The six JSON-LD questions and answers match the six rendered expandable Q&A entries exactly.

## 3. Authors and bylines

### Pass — author infrastructure

Both required profiles exist and contain biography content:

- [Tim Humphreys](https://tecmambo.com/authors/tim-humphreys)
- [Lulu Camau](https://tecmambo.com/authors/lulu-camau)

Article bylines link to their respective author profiles.

### Needs Human Action — eleven placeholder bylines

The complete archive search found eleven “tecMAMBO Team” articles, rather than only the two known examples:

1. [WhatsApp Plus is official: what KSh 119 gets Kenyan users and what stays free](https://tecmambo.com/explainers/whatsapp-plus-kenya-ksh-119-features-worth-it)
2. [Safaricom's new board appointments show what Vodacom's 55% control looks like in practice](https://tecmambo.com/business/safaricom-board-reshuffle-vodacom-mariam-cassim-matimba-mbungela)
3. [TikTok is quietly turning Live music and DMs into creator business infrastructure](https://tecmambo.com/opinion/tiktok-songs-of-live-professional-inbox-creator-tools)
4. [A KSh 2.5 million Kenyan privacy judgment shows intimate images are personal data, not gossip](https://tecmambo.com/explainers/kenya-intimate-image-privacy-ruling-2-5-million)
5. [Android's new Tap to Share brings back the best idea from Android Beam](https://tecmambo.com/news/google-quick-share-tap-to-share-pixel-nfc)
6. [Jumia raised $50 million from IFC, Axian and others. Now it has to prove the profitability story](https://tecmambo.com/opinion/jumia-50-million-ifc-axian-profitability)
7. [Kenya's cyber cafe rules do not require browsing history, but the logging debate is not over](https://tecmambo.com/explainers/kenya-cyber-cafe-rules-ca-clarification-privacy)
8. [Spotify wants fans to remix copyrighted songs legally, and Kobalt just joined the experiment](https://tecmambo.com/opinion/spotify-kobalt-licensed-ai-covers-remixes)
9. [Kenya's first locally domiciled ETF lets investors buy 11 bank stocks through one NSE trade](https://tecmambo.com/explainers/wsa-banking-index-etf-nse-kenya-explained)
10. [Instagram changed its wordmark after 10 years, and legibility may be the price of personality](https://tecmambo.com/opinion/instagram-new-wordmark-2026-design-refresh)
11. [WhatsApp's Scam Alert checks suspicious messages without sending them to Meta](https://tecmambo.com/explainers/whatsapp-scam-alert-on-device-ai-explained)

No authors were reassigned during this audit. Every item requires editorial sign-off under the standing Tim Humphreys/Lulu Camau policy.

## 4. Publisher trust

### Pass — policy and company pages

All required pages return substantive content and are linked from the footer:

- [About](https://tecmambo.com/about)
- [Editorial Standards](https://tecmambo.com/editorial-standards)
- [Contact](https://tecmambo.com/contact)
- [Terms](https://tecmambo.com/terms)
- [Privacy](https://tecmambo.com/privacy)
- [Cookies](https://tecmambo.com/cookies)
- [Advertise](https://tecmambo.com/advertise)

### Fail — correction mechanism

The Editorial Standards page explains how corrections should work and directs readers to a usable contact route.

However, the content model has no structured correction record, and the article template has no visible correction-note component. None of the 179 public articles contains a formal correction note, despite 40 having a later `updatedAt` value.

The policy exists, but the promised mechanism is not technically wired up.

## 5. External Google services

### Needs Human Action — Search Console

Public DNS contains a `google-site-verification` TXT token, which indicates that verification has probably been configured. It does not prove who currently has access or whether Google is processing the sitemaps successfully.

A verified owner should:

1. Open [Google Search Console](https://search.google.com/search-console).
2. Confirm access to the `tecmambo.com` Domain property.
3. Inspect page indexing, crawl statistics and manual actions.
4. Confirm that the sitemap index and News sitemap have been submitted and processed without errors.
5. Retain the DNS verification record.

Google documents Domain-property DNS verification in [Verify site ownership](https://support.google.com/webmasters/answer/9008080).

### Optional Human Action — Publisher Center

The original brief's statement that Publisher Center is the only way to control ordinary Google News logos and section labels is no longer current.

Since March 2025:

- Publication pages are automatically generated.
- Submitted RSS feeds and manual web locations are no longer used for ordinary publication pages.
- Logos come from the site's favicon.
- Publication titles come from Google's detected site name.
- Publisher Center remains relevant to products such as News Showcase and Reader Revenue Manager.

See Google's [Publisher Center transition notice](https://support.google.com/news/publisher-center/answer/15898024?hl=en). The account is available at [publishercenter.google.com](https://publishercenter.google.com/), but registration is not an ordinary Google News indexing task.

## 6. Publishing cadence and archive depth

The 179-row published inventory was cross-checked against the live article sitemap.

| Week beginning | Published articles |
|---|---:|
| June 8, 2026 | 0 |
| June 15, 2026 | 0 |
| June 22, 2026 | 8 |
| June 29, 2026 | 31 |
| July 6, 2026 | 30 |
| July 13, 2026 | 18 |
| July 20, 2026 | 10 |
| July 27, 2026 | 9 |
| August 3, 2026 | 17 |
| August 10, 2026 | 37 |
| August 17, 2026 | 7 |
| August 24, 2026 | 0 |
| August 31, 2026 | 1 |
| September 7, 2026 — partial week | 11 |

Additional findings:

- The current archive begins June 25, 2026.
- Articles were published on only 27 distinct days.
- The longest gap was 13 empty days between August 21 and September 4.
- The September 9 batch contained eleven articles.
- Eleven is approximately 1.8 times the median active publishing day, but only the fifth-largest batch.
- Format totals are 55 explainers, 45 opinion pieces, 44 news articles, 32 business articles, two real-life features and one wallet-watch article.

The pattern is materially bursty. This requires a sustained editorial cadence; it cannot be repaired with metadata or artificial backdating.

## 7. Domain history and topical pivot

The reported 2022 lifestyle and travel history should remain part of editorial expectations. Public search did not surface a currently accessible tecMAMBO copy of the cited theme-park article, so this audit treats the history as supplied context rather than independently verified evidence.

There is no appropriate code change. The practical response is sustained publication within the current technology remit.

## 8. AIO/GEO accessibility

### Pass — technical accessibility

- `robots.txt` explicitly permits major answer-engine crawlers.
- [llms.txt](https://tecmambo.com/llms.txt) returns successfully and identifies the publication, its sections, regional hubs and recent articles.
- The five sampled articles returned HTTP 200 responses, self-referencing canonical URLs and no `noindex` directive.
- Organization and author entities use stable URLs and consistent structured data.
- Machine-readable RSS, JSON, sitemap and Markdown routes are available.

These measures improve machine accessibility but cannot guarantee citation or ranking by an answer engine.

## Phase 2 changes proposed for approval

Only the following technical changes are presently justified:

1. Stop deployment timestamps from overwriting static-page, hub and sitemap-index `lastmod` values.
2. Review and migrate generic `Article` templates to `NewsArticle` where the editorial format is genuinely news-oriented.
3. Decide whether timely explainers and analysis should be eligible for the News sitemap.
4. Add an optional structured correction log and visible article correction-note component.
5. Add automated regression tests for News sitemap age limits, schema fields, FAQ parity and sitemap freshness.

Already compliant areas—robots, News sitemap protocol, organization schema, FAQ generation and author pages—do not need to be rebuilt.

## Remaining human review checklist

- [ ] Confirm Search Console ownership and access.
- [ ] Confirm sitemap processing and News sitemap status in Search Console.
- [ ] Review and approve the eleven placeholder byline assignments.
- [ ] Decide whether News sitemap eligibility should include newsworthy explainers and analysis.
- [ ] Approve or reject the proposed generic `Article` to `NewsArticle` template migration.
- [ ] Decide whether Publisher Center is needed for News Showcase or Reader Revenue Manager.
- [ ] Establish a sustained weekly publishing cadence without altering historical dates.
- [ ] Approve Phase 2 implementation.
