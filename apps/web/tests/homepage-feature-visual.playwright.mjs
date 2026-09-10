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
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: ".skip-link, header { display: none !important; }" });

  const section = page
    .getByRole("heading", { name: "Phones in plain English" })
    .locator("xpath=ancestor::section[1]");
  await section.scrollIntoViewIfNeeded();
  const images = section.locator("img");
  for (let index = 0; index < await images.count(); index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((node) => node.complete ? undefined : new Promise((resolve) => node.addEventListener("load", resolve, { once: true })));
  }

  const result = await section.evaluate((element) => {
    const cards = [...element.querySelectorAll("article")];
    const headlineSize = (card) => Number.parseFloat(getComputedStyle(card.querySelector("h3")).fontSize);
    const secondaryBoxes = cards.slice(1).map((card) => card.getBoundingClientRect());
    const badgeBackgrounds = cards.map((card) => {
      const label = [...card.querySelectorAll("span")].find((node) => /MAMBO|Should you care|Wallet Watch|Review|Business/i.test(node.textContent ?? ""));
      return label ? getComputedStyle(label).backgroundColor : "missing";
    });
    const secondaryBadgeOffsets = cards.slice(1).map((card) => {
      const label = [...card.querySelectorAll("span")].find((node) => /MAMBO|Should you care|Wallet Watch|Review|Business/i.test(node.textContent ?? ""));
      return label ? Math.round(label.getBoundingClientRect().top - card.getBoundingClientRect().top) : -1;
    });
    const firstSecondaryImage = cards[1]?.querySelector("a")?.getBoundingClientRect();
    const firstSecondaryHeadline = cards[1]?.querySelector("h3")?.getBoundingClientRect();

    return {
      cardCount: cards.length,
      hierarchyRatio: headlineSize(cards[0]) / headlineSize(cards[1]),
      secondaryWidths: secondaryBoxes.map((box) => Math.round(box.width)),
      secondaryHeights: secondaryBoxes.map((box) => Math.round(box.height)),
      badgeBackgrounds,
      secondaryBadgeOffsets,
      secondaryIsHorizontal: Boolean(firstSecondaryImage && firstSecondaryHeadline && firstSecondaryImage.right <= firstSecondaryHeadline.left),
      pageOverflows: document.documentElement.scrollWidth > globalThis.innerWidth
    };
  });

  if (result.cardCount !== 4) throw new Error(`${name}: expected four feature cards, found ${result.cardCount}`);
  if (result.hierarchyRatio < 1.4) throw new Error(`${name}: headline hierarchy ratio is ${result.hierarchyRatio.toFixed(2)}`);
  if (result.badgeBackgrounds.some((background) => background === "missing" || background === "rgba(0, 0, 0, 0)")) {
    throw new Error(`${name}: a format badge does not have a solid background`);
  }
  if (!result.secondaryIsHorizontal) throw new Error(`${name}: secondary card is not horizontal`);
  if (result.pageOverflows) throw new Error(`${name}: page has horizontal overflow`);
  if (new Set(result.secondaryWidths).size !== 1) throw new Error(`${name}: secondary card widths differ`);
  if (Math.max(...result.secondaryBadgeOffsets) - Math.min(...result.secondaryBadgeOffsets) > 2) {
    throw new Error(`${name}: secondary badge positions differ`);
  }
  if (name === "desktop" && Math.max(...result.secondaryHeights) - Math.min(...result.secondaryHeights) > 2) {
    throw new Error(`${name}: secondary card heights differ`);
  }

  await section.screenshot({ path: join(outputDir, `home-feature-${name}.png`) });
  await browser.close();
  return result;
}

const desktop = await inspect({ width: 1440, height: 1000 }, "desktop");
const mobile = await inspect({ width: 390, height: 844 }, "mobile");

console.log("Homepage feature visual checks passed.");
console.log(JSON.stringify({ desktop, mobile }, null, 2));
