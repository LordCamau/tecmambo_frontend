# tecMAMBO content model notes

## Homepage singleton

The frontend now uses `apps/web/lib/home-curation.ts` as the local fallback for the planned WordPress Homepage singleton. The matching ACF export lives at `/wordpress/acf-homepage.json`.

Expected WordPress fields:

- `hero_article`
- `hero_fallback`
- `latest_rail`
- `lanes`
- `glossary_spotlight`
- `promo_partner`

Lane rows should expose:

- `key`
- `title`
- `eyebrow`
- `enabled`
- `order`
- `featured_article`
- `source`
- `count`

## Imagery

Every article must have a unique featured image with alt text and credit. The local draft loader uses deterministic topic-matched Unsplash placeholders until real CMS images exist.

## Card headlines

Articles may define an optional `cardHeadline` (`card_headline` in ACF) for homepage and section-card display. It should be an editorially meaningful 8 to 10 word variant that preserves the article's meaning without changing its H1, SEO title, URL, or social metadata. Card components must fall back to the full article title and apply a three-line clamp only when this field is empty.

## Newsworthiness, quick answers and corrections

`isNewsworthy` (`is_newsworthy` in ACF) is an explicit editorial decision for timely explainers or analysis that should be eligible for Google News. News and Business articles remain newsworthy by default. The flag does not bypass the 48-hour publication window or any source-check, approval, editor or review-date gate. Opinion retains `OpinionNewsArticle` schema even when the flag is set.

`quickAnswer` (`quick_answer` in ACF) is optional, editor-written copy. When supplied, it renders near the start of the article and is included in the article's speakable selector. Do not generate it automatically or backfill the archive without review.

`corrections` is a dated list of public correction descriptions. Each entry renders as `Correction of [date]: [description]`. Saving a material correction must also update the post modified date so `dateModified` and sitemap `lastmod` remain truthful.

## Deals

Wallet Watch articles may carry a `deal` object with product, retailer, price, affiliate URL, expiry, threshold, and verification fields. Product/Offer schema only renders when `verified` is true.

## Region taxonomy

Region is a cross-cutting taxonomy for stories with specific country relevance. It sits beside Format, Topic, and Brand, so a story can be News, AI, Google, and Kenya without changing its article URL.

Current seeded group: Africa. Seeded country terms: Kenya, Nigeria, South Africa, Rwanda, Ghana, Egypt, Ethiopia, Tanzania, and Uganda.

Editorial rule: tag the country or countries the story is about or especially useful to. Leave global stories untagged. Do not add a country tag just because a global story is readable there.

Regional hub markdown mirrors live at `/africa.md` and `/africa/<country>.md`.
