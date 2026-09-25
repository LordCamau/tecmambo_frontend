# tecMAMBO Google News readiness implementation report

Date: September 25, 2026

## Scope and baseline

The audit found a strong existing foundation: server-rendered article pages, a dedicated News section, article and publisher structured data, article-specific social metadata, canonical URLs, standard and News sitemaps, crawlable images, robots controls, feeds, publication gates, source records, corrections records, and separate editorial formats.

The main gaps were incomplete author identity data, article headers that showed only an updated date, no dedicated editorial policy or corrections route, incomplete trust-page discovery in the footer and sitemap, unpaginated high-volume archives, basic related-story ranking, and no editor warning for headlines over 110 characters.

## Completed

- Added stable author IDs, exact supplied social profiles, editorial roles, biographies, coverage areas, and responsibilities.
- Added an Authors directory at `/authors` and upgraded individual profiles with article totals, social links, responsibilities, publication dates, and crawlable pagination.
- Added visible author roles, original publication date and time, and conditional updated date and time near every article headline. Dates are shown in East Africa Time and remain machine readable.
- Removed a nested JSON-LD context from article author entities and connected each Person to the canonical tecMAMBO author profile.
- Identified the publisher as tecMAMBO, with the existing verified legal name Brainerd Media Company, in organization structured data.
- Added `/editorial-policy` and `/corrections` with factual policies based on the implemented workflow.
- Expanded the Contact page description for readers, sources, companies, PR teams, advertisers, and partners using the existing verified email address.
- Updated About with factual publisher information and removed an unsupported superlative.
- Added Authors, Editorial policy, and Corrections links to the footer without expanding the primary navigation.
- Added all new trust pages and Contact to the normal page sitemap.
- Added crawlable pagination to Latest, category archives, and author archives.
- Improved related-story ranking using shared tags, regions, category, and publication recency.
- Added a non-blocking 110-character headline warning. Headlines are never truncated automatically.
- Added an optional AI assistance record to the article model and documented author, source, approval, image, date, and headline controls.
- Added automated tests for author identity, supplied social URLs, article author and publisher structured data, policy routes, publisher identity, and headline warnings.

## Public URLs

- Tim Humphreys: `https://tecmambo.com/authors/tim-humphreys`
- Lulu Camau: `https://tecmambo.com/authors/lulu-camau`
- Authors: `https://tecmambo.com/authors`
- About: `https://tecmambo.com/about`
- Editorial policy: `https://tecmambo.com/editorial-policy`
- Corrections: `https://tecmambo.com/corrections`
- Contact: `https://tecmambo.com/contact`
- Sitemap index: `https://tecmambo.com/sitemap-index.xml`
- Standard sitemap: `https://tecmambo.com/sitemap.xml`
- News sitemap: `https://tecmambo.com/news-sitemap.xml`
- Robots: `https://tecmambo.com/robots.txt`

## Structured data

Representative articles emit one Article, NewsArticle, OpinionNewsArticle, or Review entity as appropriate. The entity includes an exact headline, canonical page URL, ISO publication and modification dates, representative image objects, a Person author with the internal author URL, and the tecMAMBO NewsMediaOrganization publisher. Author profiles emit Person data and the About page emits AboutPage and organization data.

## Validation completed

- TypeScript: passed
- ESLint: passed
- Vitest: 191 tests passed
- Badge contrast Playwright checks: passed in light and dark themes
- Content quality audit: 630 records checked, zero high-confidence discovery leaks
- Link audit: 286 articles checked, zero link issues
- AdSense content audit: passed with advertising disabled by configuration
- Production build: 630 static pages generated successfully with Next.js 16.2.9
- Production route audit: all expected 200 and 404 statuses passed
- Representative JSON-LD: all blocks parsed as valid JSON
- Sitemaps: new trust routes present; News sitemap remains separate and dynamic
- Robots: all sitemap endpoints declared
- Mobile and responsive checks: iPhone, Android, tablet, and desktop widths passed with visible bylines and dates, no horizontal overflow, and no image overflow
- Accessibility spot check: no serious or critical Axe violations on the representative article and footer
- Local production performance spot check: server-rendered article text was present, measured layout shift was 0, and local load completed in 198 ms. Localhost timings are diagnostic only and are not a substitute for live field data.
- Modified editorial copy and templates: zero Unicode em dash occurrences

## Manual actions required

- Review the 11 legacy articles currently attributed to `tecMAMBO Team`. Reassign only when the real writer can be confirmed. Do not guess.
- Confirm the new editorial policy accurately reflects day-to-day editorial practice before deployment.
- If WordPress becomes the active content source, create and verify matching custom fields for author social profiles and AI assistance before adding them to production GraphQL queries.
- Confirm whether any additional verified company details or contact channels should be published. No registration number, telephone number, street address, or ownership detail was invented.
- Submit `https://tecmambo.com/sitemap-index.xml` and `https://tecmambo.com/news-sitemap.xml` in Google Search Console after deployment.
- Run representative live article URLs through Google's Rich Results Test after deployment. Local validation cannot submit unpublished localhost URLs to that service.
- Configure Publisher Center only if it is useful to the publication. It does not guarantee placement in Google News.

Google News and Discover inclusion remain editorial and algorithmic decisions by Google. These changes establish transparent authorship, publisher identity, policies, crawlability, valid metadata, and a maintainable editorial workflow without claiming guaranteed inclusion.
