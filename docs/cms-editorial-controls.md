# tecMAMBO CMS editorial controls

This guide defines the WordPress fields required to make public eligibility explicit. The frontend remains conservative when these fields are unavailable. No private editorial notes are queried or sent to the browser.

## WordPress setup

Add the fields below to the existing `articleFields` GraphQL group for the `post` post type. Expose them through WPGraphQL. After the schema is deployed and verified, set `WORDPRESS_EDITORIAL_CONTROLS_AVAILABLE=true` in the frontend environment. Until then, leave the variable unset or set it to `false` so the existing GraphQL schema continues to work.

| Field name | WordPress field type | Allowed values | Required | GraphQL exposure | Frontend fallback |
| --- | --- | --- | --- | --- | --- |
| `editorialStatus` | Select | `draft`, `editorial_review`, `fact_check`, `ready`, `published`, `needs_revision`, `archived` | Yes | Public value for published posts and authenticated preview | Missing values are assessed through publication status, completeness, and placeholder checks |
| `indexingStatus` | Select | `index`, `noindex`, `inherit` | Yes | Public | Defaults to `inherit` |
| `contentFormat` | Select | `news`, `analysis`, `explainer`, `buying_guide`, `hands_on_review`, `research_based_review`, `opinion`, `glossary`, `interview`, `field_test` | Yes | Public | Existing format taxonomy is used conservatively |
| `isNewsworthy` | True or false | `true`, `false` | Yes | Public | News and Business default to eligible; other formats require an explicit `true` |
| `quickAnswer` | Text area | Editor-written plain text | No | Public | Omitted when absent; never generated automatically |
| `corrections` | Repeater | ISO date and public description | No | Public | Omitted when absent; each entry renders visibly |
| `reviewMethod` | Select | `hands_on`, `research_based`, `unknown` | Required for reviews | Public | Reviews default to `unknown` and are presented as research-based analysis |
| `hasOriginalTesting` | True or false | `true`, `false` | Required for hands-on reviews | Public | Defaults to `false` |
| `hasOriginalPhotography` | True or false | `true`, `false` | No | Public | Defaults to `false` |
| `testingMethodology` | Text area | Plain text | Required for hands-on reviews | Public | Missing evidence prevents hands-on presentation |
| `productSource` | Text | Editorial purchase, manufacturer loan, retailer loan, or another accurate disclosure | Required for hands-on reviews | Public | Missing evidence prevents hands-on presentation |
| `testingPeriod` | Text | An accurate date range or duration | Required for hands-on reviews | Public | Missing evidence prevents hands-on presentation |
| `sourceDisclosure` | Text area | Plain text | Recommended for hands-on reviews | Public | Omitted when absent |
| `excludeFromDiscovery` | True or false | `true`, `false` | Yes | Public | Defaults to `false`, while other quality checks still apply |

Keep private workflow fields such as internal notes, legal review notes, embargo instructions, contact details, and unpublished source material outside the public GraphQL fragment.

## Required editorial states

A post may enter homepage, archive, search, feed, related-story, sitemap, and LLM discovery only when all of these conditions are true:

1. WordPress status is `publish`.
2. `editorialStatus` is `ready` or `published`, when the field is available.
3. `excludeFromDiscovery` is false.
4. The public copy has no high-confidence editorial placeholder.
5. Required title, summary, value explanation, author, image metadata, and article body are present.
6. A buying guide has adequate verification evidence.

`indexingStatus=noindex` keeps an otherwise readable page out of search indexing and every sitemap. It does not block crawler access in robots.txt.

## Review workflow

Select `hands_on` only when the named reviewer directly used the product and the methodology, testing period, and product source are complete. Set `hasOriginalTesting=true`. The frontend then permits a visible score and Review structured data.

Use `research_based` for specification analysis, previews, reporting based on cited third-party tests, and any assessment without direct-use evidence. The frontend labels it as research-based analysis, hides the numerical score, and emits Article structured data.

Use `unknown` during migration or when evidence cannot be confirmed. It receives the same conservative presentation as research-based analysis.

## Migration procedure

1. Back up the WordPress database and export current field definitions.
2. Add the fields to the article field group without changing existing field names.
3. Set every published post to `editorialStatus=published`, `indexingStatus=inherit`, and `excludeFromDiscovery=false` only after an editor confirms it is complete.
4. Set known unfinished posts to `editorialStatus=needs_revision`, `indexingStatus=noindex`, and `excludeFromDiscovery=true`.
5. Set every existing review to `reviewMethod=unknown`, `hasOriginalTesting=false`, and `contentFormat=research_based_review` until evidence is checked.
6. Upgrade a review to `hands_on_review` and `reviewMethod=hands_on` only after all required evidence fields are complete.
7. Test the new GraphQL fields in a non-production environment.
8. Set `WORDPRESS_EDITORIAL_CONTROLS_AVAILABLE=true` only after the deployed schema returns all fields without an error.
9. Run `npm run audit:content:ci`, `npm run audit:links:ci`, and the production build before deployment.

When adding a correction, record the date and reader-facing description, then save the post so WordPress updates `modified`. Use `isNewsworthy=true` only for timely reporting or analysis; it never substitutes for the publication gates or the two-day Google News window.

## Known records requiring editorial action

| Slug | Required action |
| --- | --- |
| `best-smartphones-under-ksh-15-000-right-now` | Verify current products, prices, availability, comparison method, and sources before returning to discovery |
| `five-power-banks-that-actually-last-a-full-day-ranked-by-price` | Complete original testing or remove test-based claims, then verify current products and prices |
| `is-a-refurbished-phone-ever-worth-it-we-checked-three-sellers` | Verify seller identities, inspection date, prices, warranty terms, and comparison evidence |
| `iphone-air-review-the-iphone-that-asks-what-you-re-willing-to-give-up` | Retain as research-based analysis unless original hands-on evidence is documented |
| `samsung-galaxy-a37-5g-review` | Revise unsupported direct-use phrasing and retain as research-based analysis unless original hands-on evidence is documented |
| `gemini-spark-review` | Verify the product, availability, sources, and direct-use claims before returning it to discovery |

The repository cannot migrate the live WordPress database safely because that requires an authenticated administrative operation. This document provides the exact schema and migration steps for the CMS owner.
