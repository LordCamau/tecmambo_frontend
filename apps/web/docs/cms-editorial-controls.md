# tecMAMBO editorial publication controls

## Publication lifecycle

New articles use the gated workflow. A record is not public merely because it exists in the CMS or repository.

Valid publication states are `draft`, `in_review`, `publish`, `scheduled`, `private`, and `archived`. Valid editorial states include `draft`, `editorial_review`, `fact_check`, `ready`, `published`, `needs_revision`, and `archived`.

For a new article to become public, every requirement below must pass:

- `workflowVersion` is `gated`.
- `publicationStatus` is `publish`.
- `editorialStatus` is `published`.
- `sourceChecked` is true.
- `humanEditorApproved` is true.
- `editor` names the responsible human editor.
- `reviewedAt` contains the approval date and time.
- The article has a named author, a meaningful summary, a lead image with an alt description and credit decision, useful body copy, and an original-value classification.
- News and business reporting contains a source list.
- No editorial notes, verification requests, placeholder copy, or unsupported first-hand claims remain.

The static content model has an explicit legacy migration cutoff of 12 August 2026. Content published after that date does not receive legacy status automatically. Legacy status preserves established public articles while their approval metadata is backfilled. It does not satisfy the gated workflow for new content.

## Reviews and first-hand claims

The Reviews section is reserved for documented hands-on testing. A review needs all of the following:

- `reviewMethod: hands_on`
- `hasOriginalTesting: true`
- A testing methodology
- The source of the product or test unit
- A testing period
- Start and completion timestamps
- An evidence list
- A named approving editor

Research-only product coverage must use analysis, explainer, first-look, or buying-guide labels. Titles and summaries must not say `we tested`, `we timed`, `we asked`, `we checked`, `we ran`, `hands-on`, or `review` unless the evidence record is complete.

## Indexing and discovery

The same central gate controls homepage curation, Latest, section archives, topic and brand archives, regional archives, related stories, search, RSS, JSON Feed, standard sitemaps, image sitemaps, and News sitemap eligibility. Direct article requests use the same gate and return not found for quarantined records.

Glossary detail pages remain live for readers but stay `noindex, follow`, outside sitemaps and feeds, and ad-free until they meet the multi-signal glossary quality threshold. The main Glossary hub remains indexable.

Archives require at least five eligible articles and a useful unique introduction before they become indexable. Thin archives remain available for navigation where appropriate, but stay `noindex, follow` and ad-free.

## Monetization

Advertising is disabled by default. Set `NEXT_PUBLIC_ADSENSE_ENABLED=true` only when advertising should be active. Even then, an article must be public, indexable, non-sponsored, free of quality warnings, and at least 600 words before the ad loader and slot can render.

Legal pages, utility pages, search, errors, previews, glossary pages, and thin archives never load the AdSense script through the central policy.

## Required checks

Run these commands from `apps/web` before deployment:

```text
npm run typecheck
npm run lint
npm test
npm run audit:adsense:ci
npm run build
```

For a local production crawl, start the production server on port 3100 and run `npm run audit:routes` in another terminal.
