import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/* global console, document, getComputedStyle, process */

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "test-results");
const baseUrl = process.env.TECMAMBO_VISUAL_URL ?? "http://127.0.0.1:3000";

await mkdir(outputDir, { recursive: true });

async function inspect(viewport, name) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Phones in plain English" }).waitFor();
  const rejectCookies = page.getByRole("button", { name: "Reject all" });
  if (await rejectCookies.isVisible()) await rejectCookies.click();
  await page.addStyleTag({ content: ".skip-link, header { display: none !important; }" });

  const homepageGroup = page
    .getByRole("article", { name: "Featured story" })
    .locator("xpath=..");
  const featureSection = page
    .getByRole("heading", { name: "Phones in plain English" })
    .locator("xpath=ancestor::section[1]");

  async function inspectGroup(group, expectedCount, groupName) {
    await group.scrollIntoViewIfNeeded();
    const images = group.locator("img");
    for (let index = 0; index < await images.count(); index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((node) => node.complete ? undefined : new Promise((resolve) => node.addEventListener("load", resolve, { once: true })));
    }

    const result = await group.evaluate((element) => {
      const cards = [...element.querySelectorAll("article")];
      const headlineSize = (card) => Number.parseFloat(getComputedStyle(card.querySelector("h1, h3")).fontSize);
      const secondaryBoxes = cards.slice(1).map((card) => card.getBoundingClientRect());
      const badgeBackgrounds = cards.map((card) => {
        const label = [...card.querySelectorAll("span")].find((node) => /MAMBO|Should you care|Wallet Watch|Review|Business/i.test(node.textContent ?? ""));
        return label ? getComputedStyle(label).backgroundColor : "missing";
      });
      const secondaryBadgeOffsets = cards.slice(1).map((card) => {
        const label = [...card.querySelectorAll("span")].find((node) => /MAMBO|Should you care|Wallet Watch|Review|Business/i.test(node.textContent ?? ""));
        return label ? Math.round(label.getBoundingClientRect().top - card.getBoundingClientRect().top) : -1;
      });
      const secondaryImageBoxes = cards.slice(1).map((card) => card.querySelector("a")?.getBoundingClientRect());
      const secondaryCopyBoxes = cards.slice(1).map((card) => card.querySelector("h3")?.parentElement?.getBoundingClientRect());
      const secondaryDeks = cards.slice(1).map((card) => card.querySelector("h3 + p")?.textContent?.trim() ?? "");
      const secondaryHasMeta = cards.slice(1).map((card) => {
        const parts = [...card.querySelectorAll('[aria-label="Article details"] span')];
        return parts.length === 2 && (parts[0].textContent?.trim().length ?? 0) > 0 && /\d+\s+min read/i.test(parts[1].textContent ?? "");
      });

      return {
        cardCount: cards.length,
        hierarchyRatio: headlineSize(cards[0]) / headlineSize(cards[1]),
        secondaryWidths: secondaryBoxes.map((box) => Math.round(box.width)),
        secondaryHeights: secondaryBoxes.map((box) => Math.round(box.height)),
        badgeBackgrounds,
        secondaryBadgeOffsets,
        secondaryIsHorizontal: secondaryImageBoxes.some((image, index) => {
          const copy = secondaryCopyBoxes[index];
          return Boolean(image && copy && image.right <= copy.left);
        }),
        secondaryImageAboveCopy: secondaryImageBoxes.every((image, index) => {
          const copy = secondaryCopyBoxes[index];
          return Boolean(image && copy && image.bottom <= copy.top + 1);
        }),
        secondaryDeks,
        secondaryHasMeta,
        pageOverflows: document.documentElement.scrollWidth > globalThis.innerWidth
      };
    });

    if (result.cardCount !== expectedCount) throw new Error(`${name}/${groupName}: expected ${expectedCount} cards, found ${result.cardCount}`);
    if (result.hierarchyRatio < 1.35) throw new Error(`${name}/${groupName}: headline hierarchy ratio is ${result.hierarchyRatio.toFixed(2)}`);
    if (result.badgeBackgrounds.some((background) => background === "missing" || background === "rgba(0, 0, 0, 0)")) {
      throw new Error(`${name}/${groupName}: a format badge does not have a solid background`);
    }
    if (result.secondaryIsHorizontal) throw new Error(`${name}/${groupName}: a secondary card is still horizontal`);
    if (!result.secondaryImageAboveCopy) throw new Error(`${name}/${groupName}: a secondary image is not above its copy`);
    if (result.secondaryDeks.some((dek) => dek.length === 0)) throw new Error(`${name}/${groupName}: a secondary card is missing its dek`);
    if (result.secondaryHasMeta.some((hasMeta) => !hasMeta)) throw new Error(`${name}/${groupName}: a secondary card is missing its byline/read-time metadata`);
    if (result.pageOverflows) throw new Error(`${name}/${groupName}: page has horizontal overflow`);
    if (new Set(result.secondaryWidths).size !== 1) throw new Error(`${name}/${groupName}: secondary card widths differ`);
    if (name !== "mobile" && Math.max(...result.secondaryBadgeOffsets) - Math.min(...result.secondaryBadgeOffsets) > 2) {
      throw new Error(`${name}/${groupName}: secondary badge positions differ`);
    }
    if (name === "desktop" && Math.max(...result.secondaryHeights) - Math.min(...result.secondaryHeights) > 2) {
      throw new Error(`${name}/${groupName}: secondary card heights differ`);
    }

    return result;
  }

  const homepage = await inspectGroup(homepageGroup, 3, "homepage");
  const feature = await inspectGroup(featureSection, 4, "phones");
  await homepageGroup.screenshot({ path: join(outputDir, `home-supporting-${name}.png`) });
  await featureSection.screenshot({ path: join(outputDir, `home-feature-${name}.png`) });
  await browser.close();
  return { homepage, feature };
}

const desktop = await inspect({ width: 1440, height: 1000 }, "desktop");
const tablet = await inspect({ width: 768, height: 1024 }, "tablet");
const mobile = await inspect({ width: 390, height: 844 }, "mobile");

console.log("Homepage feature visual checks passed.");
console.log(JSON.stringify({ desktop, tablet, mobile }, null, 2));
