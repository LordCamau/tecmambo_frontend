const base = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3100";
export {};
const checks: Array<[string, number]> = [
  ["/", 200],
  ["/news/google-pixel-11-series-tensor-g6-hilight-price-2026", 200],
  ["/real-life/we-tested-three-power-banks-on-a-real-boda-rider-s-full-shift", 404],
  ["/real-life/fast-charging-claims-vs-reality-we-timed-every-30-minute-charge-promise", 404],
  ["/news/kenya-s-new-sim-registration-rules-explained-without-the-legal-jargon", 404],
  ["/wallet-watch/the-cheapest-laptop-that-won-t-frustrate-a-university-student", 404],
  ["/glossary/4g-lte", 200],
  ["/reviews", 200],
  ["/search?q=pixel", 200],
  ["/privacy", 200],
  ["/sitemap.xml", 200],
  ["/articles-sitemap.xml", 200],
  ["/news-sitemap.xml", 200],
  ["/feed.xml", 200]
];

const responses = new Map<string, string>();
let failed = 0;

for (const [path, expected] of checks) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  const body = await response.text();
  responses.set(path, body);
  const noindex = body.includes("noindex");
  const ads = body.includes("pagead2.googlesyndication.com") || body.includes("google-adsense");
  const ok = response.status === expected;
  if (!ok) failed += 1;
  console.log(JSON.stringify({ path, status: response.status, expected, ok, noindex, ads }));
}

const glossary = responses.get("/glossary/4g-lte") ?? "";
const reviews = responses.get("/reviews") ?? "";
const privacy = responses.get("/privacy") ?? "";
const sitemap = responses.get("/sitemap.xml") ?? "";
const articleMap = responses.get("/articles-sitemap.xml") ?? "";
const assertions = {
  glossaryNoindex: glossary.includes("noindex"),
  reviewsNoindex: reviews.includes("noindex"),
  privacyGooglePartnerLink: privacy.includes("policies.google.com/technologies/partner-sites"),
  unsafeAbsentFromSitemaps: !sitemap.includes("we-tested-three-power-banks") && !articleMap.includes("we-tested-three-power-banks"),
  glossaryDetailsAbsentFromStandardSitemap: !sitemap.includes("/glossary/4g-lte"),
  adsLoaderAbsent: !glossary.includes("pagead2.googlesyndication.com") && !reviews.includes("pagead2.googlesyndication.com")
};

console.log(JSON.stringify({ assertions }, null, 2));
if (Object.values(assertions).some((value) => !value)) failed += 1;
if (failed) process.exitCode = 1;
