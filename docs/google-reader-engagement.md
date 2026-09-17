# Google reader engagement and article sharing

tecMAMBO article pages have two reusable reader-engagement components:

- `GoogleSourcePrompt` sits directly below the lead image and caption.
- `ArticleShare` sits after the editorial content and before article-footer utilities and related reading.

The components preserve the existing article structure and Britti Sans typography. They do not alter article copy, metadata, URLs, structured data, or the 2:1 editorial image system.

## Google Preferred Source

The integration uses Google's official manual-control library:

`https://news.google.com/swg/js/v1/publisher.js`

The root layout loads one script instance with `preferred-sources-control="manual"`. The client registers through Google's `PREFERRED_SOURCE` callback queue, calls `init()` once, and invokes `addPreferredSource()` from tecMAMBO's custom rectangular button.

Keep `GOOGLE_PREFERRED_SOURCE_ENABLED=false` until a signed-in editor confirms that `tecmambo.com` appears in Google's source-preferences tool. The tool required a Google sign-in during the September 17, 2026 implementation review, so eligibility could not be independently confirmed. When the flag is false, the script is not requested and the button is not shown.

The client additionally refuses to initialize the action away from `tecmambo.com` or `www.tecmambo.com`, preventing local and preview hosts from being submitted accidentally.

## Google Search and Discover profile

No verified public tecMAMBO Google Search/Discover profile was found during the September 17, 2026 implementation review. Leave `GOOGLE_DISCOVER_URL` empty until editorial creates or verifies the publication's public profile.

Only an HTTPS `profile.google.com` URL is accepted. Invalid or guessed destinations are ignored, and the Discover action is not rendered.

## Article sharing

Every article receives Facebook, LinkedIn, X, WhatsApp, and Copy Link actions. All share URLs are derived from the article's production canonical URL. X and WhatsApp also receive the article title. No SDK, OAuth flow, social login, tracking service, or API key is used.

Copy Link uses the Clipboard API and falls back to the browser's copy command. Success and failure are announced through a non-intrusive live region, and the button returns to its normal state automatically.

## Analytics

The components reuse the existing consent-aware Google Analytics setup. They emit only lightweight interaction events through the existing `gtag` function:

- `google_preferred_source_click`
- `google_discover_click`
- `article_share`, with the sharing method
- `article_copy_link`

No additional analytics platform or cookie is introduced.
