# tecMAMBO SEO and AIO Human Checklist

Use this checklist after each major deploy, after large article imports, and before resubmitting tecMAMBO for AdSense review.

## Search Console

- Submit `https://tecmambo.com/sitemap-index.xml`.
- Confirm `https://tecmambo.com/pages-sitemap.xml`, `https://tecmambo.com/hubs-sitemap.xml`, `https://tecmambo.com/articles-sitemap.xml`, `https://tecmambo.com/news-sitemap.xml`, `https://tecmambo.com/image-sitemap.xml`, and `https://tecmambo.com/glossary/sitemap.xml` are discovered.
- Inspect the homepage, latest page, About page, one hub page, one glossary page, and five recent articles.
- Check that canonical URLs point to the live tecMAMBO URL.
- Review indexing exclusions and fix accidental `noindex` entries for substantial articles.

## Article Quality

- Every published article should have a clear answer in the first two paragraphs.
- Every published article should have original framing, useful analysis, sources where needed, FAQs where natural, and no editorial placeholders.
- Sponsored content must be plainly labelled as sponsored.
- Thin utility pages, placeholders, tag pages without enough content, and non-substantial articles should not be treated as key search surfaces.
- No article should contain `EDITOR VERIFY BEFORE PUBLISH`, TODO notes, placeholder citations, or draft language.

## Schema

- Validate the homepage, About page, author pages, hub pages, glossary pages, and recent articles with Google Rich Results Test.
- Check `NewsMediaOrganization`, `WebSite`, `Article` or `NewsArticle`, `BreadcrumbList`, `FAQPage`, `CollectionPage`, `DefinedTerm`, and `Person` schemas.
- Confirm article schema images use the same lead image as the page and social cards.
- Confirm author schema points to real author pages and tecMAMBO as the publisher.

## Images

- Every article must have a lead image with `src`, `alt`, `credit`, `width`, `height`, and MIME type where known.
- Review Twitter/X Card Validator, Facebook Sharing Debugger, and WhatsApp previews for key articles.
- Use large images for Discover candidates and keep `max-image-preview:large` enabled.
- Confirm image credits appear on article pages and in image sitemap metadata.

## Hub Pages

- Review section pages, topic pages, Africa country hubs, author pages, brand pages, and glossary topic pages.
- Each hub should have useful intro copy, stable canonical metadata, and enough substantial items to feel like a real destination.
- Avoid highlighting the same article too often across homepage lanes and top story surfaces.

## Performance And UX

- Run Lighthouse on mobile for the homepage, one article, one hub, and Compare Phones.
- Confirm Core Web Vitals remain green or have a clear fix plan.
- Verify page loader behavior does not delay indexing content and does not flash before it appears.
- Check mobile navigation, search, footer links, cookie consent, and image rendering.

## AdSense Readiness

- Confirm `https://tecmambo.com/ads.txt` contains the active AdSense publisher line.
- Confirm the AdSense script and `google-adsense-account` meta tag are in the document head.
- Confirm privacy, cookie policy, terms, editorial standards, about, contact, and advertise pages are reachable from the footer.
- Confirm no misleading ad placements, auto-download prompts, copied filler pages, or empty archive pages are visible.
- Recheck article depth before requesting review. AdSense reviewers may classify young sites or shallow archives as low value even when the design is polished.

## Weekly Report

- Export Search Console queries, indexed pages, coverage issues, and Core Web Vitals status.
- Note top gaining articles, articles with impressions but low CTR, and articles with no impressions after two weeks.
- Pick three articles for title and intro refinement.
- Pick two internal linking improvements between related articles, glossary entries, and hubs.
- Track Discover, News, and social preview issues separately from ordinary Google Search.
