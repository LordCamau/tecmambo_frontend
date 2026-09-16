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
  await rejectCookies.waitFor({ state: "visible", timeout: 2500 }).then(() => rejectCookies.click()).catch(() => undefined);
  await page.addStyleTag({ content: ".skip-link, header { display: none !important; } article { transform: none !important; transition: none !important; }" });

  const homepageGroup = page
    .getByRole("article", { name: "Featured story" })
    .locator("xpath=..");
  const featuredSections = [
    ["phones", "Phones in plain English"],
    ["mobility", "How transport tech moves in real life"],
    ["africa", "Tech across Africa"],
    ["business", "Startups and the industry behind the screen"],
    ["ai", "Useful AI, without the stage smoke"]
  ];

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
      const labelStyles = cards.map((card) => {
        const label = [...card.querySelectorAll("span")].find((node) => /MAMBO|Should you care|Wallet Watch|Review|Business/i.test(node.textContent ?? ""));
        if (!label) return null;
        const style = getComputedStyle(label);
        return {
          background: style.backgroundColor,
          border: style.borderStyle,
          radius: style.borderRadius,
          padding: style.padding
        };
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
        cardBoxes: cards.map((card) => {
          const box = card.getBoundingClientRect();
          return {
            left: Math.round(box.left),
            top: Math.round(box.top),
            right: Math.round(box.right),
            bottom: Math.round(box.bottom),
            width: Math.round(box.width),
            height: Math.round(box.height)
          };
        }),
        hierarchyRatio: headlineSize(cards[0]) / headlineSize(cards[1]),
        secondaryWidths: secondaryBoxes.map((box) => Math.round(box.width)),
        secondaryHeights: secondaryBoxes.map((box) => Math.round(box.height)),
        labelStyles,
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
    if (result.labelStyles.some((style) => !style || style.background !== "rgba(0, 0, 0, 0)" || style.border !== "none" || style.radius !== "0px" || style.padding !== "0px")) {
      throw new Error(`${name}/${groupName}: a format label is not plain text (${JSON.stringify(result.labelStyles)})`);
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

    if (groupName.startsWith("feature/")) {
      const [hero, ...secondary] = result.cardBoxes;
      const secondaryColumns = new Set(secondary.map((box) => box.left)).size;
      const secondaryRows = new Set(secondary.map((box) => box.top)).size;

      if (name === "desktop") {
        if (secondaryColumns !== 2 || secondaryRows !== 2) throw new Error(`${name}/${groupName}: expected a 2x2 secondary grid, got ${secondaryColumns} columns and ${secondaryRows} rows (${JSON.stringify(secondary)})`);
        if (hero.width < secondary[0].width * 1.9) throw new Error(`${name}/${groupName}: hero column is not approximately twice as wide`);
        if (Math.abs(hero.top - Math.min(...secondary.map((box) => box.top))) > 2) throw new Error(`${name}/${groupName}: hero and secondary rows do not start together`);
        if (Math.abs(hero.bottom - Math.max(...secondary.map((box) => box.bottom))) > 2) throw new Error(`${name}/${groupName}: hero does not span both secondary rows`);
      } else if (name === "tablet") {
        if (secondaryColumns !== 2 || secondaryRows !== 2) throw new Error(`${name}/${groupName}: expected the tablet 2x2 secondary grid`);
        if (hero.width < secondary[0].width * 1.9) throw new Error(`${name}/${groupName}: tablet hero does not span both columns`);
        if (Math.min(...secondary.map((box) => box.top)) <= hero.bottom) throw new Error(`${name}/${groupName}: tablet secondary grid is not below the hero`);
      } else {
        if (secondaryColumns !== 1 || secondaryRows !== 4) throw new Error(`${name}/${groupName}: expected a single ordered mobile stack`);
        if (secondary[0].top <= hero.bottom) throw new Error(`${name}/${groupName}: mobile secondary stack is not below the hero`);
      }
    }

    return result;
  }

  const homepage = await inspectGroup(homepageGroup, 3, "homepage");
  const features = {};
  for (const [key, heading] of featuredSections) {
    const section = page.getByRole("heading", { name: heading }).locator("xpath=ancestor::section[1]");
    features[key] = await inspectGroup(section, 5, `feature/${key}`);
  }
  const phonesSection = page.getByRole("heading", { name: "Phones in plain English" }).locator("xpath=ancestor::section[1]");
  await homepageGroup.screenshot({ path: join(outputDir, `home-supporting-${name}.png`) });
  await phonesSection.screenshot({ path: join(outputDir, `home-feature-${name}.png`) });
  await browser.close();
  return { homepage, features };
}

const desktop = await inspect({ width: 1440, height: 1000 }, "desktop");
const tablet = await inspect({ width: 768, height: 1024 }, "tablet");
const mobile = await inspect({ width: 390, height: 844 }, "mobile");

console.log("Homepage feature visual checks passed.");
console.log(JSON.stringify({ desktop, tablet, mobile }, null, 2));
