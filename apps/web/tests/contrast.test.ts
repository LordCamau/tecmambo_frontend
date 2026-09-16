import { describe, expect, it } from "vitest";
import { contrastColors, contrastPairs, contrastRatio } from "../lib/contrast-tokens";

describe("text-on-colour contrast tokens", () => {
  it("keeps every registered pairing at WCAG AA or better", () => {
    for (const pair of contrastPairs) {
      const ratio = contrastRatio(pair.fg, pair.bg);
      const minimum = pair.size === "large" ? 3 : 4.5;

      expect(
        ratio,
        `${pair.theme} ${pair.name} has ${ratio.toFixed(2)}:1 contrast for ${pair.fg} on ${pair.bg}`
      ).toBeGreaterThanOrEqual(minimum);
    }
  });

  it("keeps text-only format labels readable in both themes", () => {
    expect(contrastPairs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "format label", theme: "light", fg: contrastColors.brandPurpleDark, bg: contrastColors.lightBg }),
        expect.objectContaining({ name: "format label", theme: "dark", fg: contrastColors.darkPurpleStrong, bg: contrastColors.darkBg })
      ])
    );
  });

  it("never registers white text on pink accent surfaces", () => {
    const whiteOnPink = contrastPairs.filter(
      (pair) => pair.bg.toLowerCase() === contrastColors.accentPink.toLowerCase() && pair.fg.toLowerCase() === contrastColors.white.toLowerCase()
    );

    expect(whiteOnPink).toEqual([]);
  });

  it("registers pink as dark-ink fills in both themes", () => {
    expect(contrastPairs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "price pill", theme: "light", fg: contrastColors.onAccent, bg: contrastColors.accentPink }),
        expect.objectContaining({ name: "price pill", theme: "dark", fg: contrastColors.onAccent, bg: contrastColors.accentPink }),
        expect.objectContaining({ name: "accent button", theme: "light", fg: contrastColors.onAccent, bg: contrastColors.accentPink }),
        expect.objectContaining({ name: "accent button", theme: "dark", fg: contrastColors.onAccent, bg: contrastColors.accentPink })
      ])
    );
  });

  it("covers approved gradient text surfaces at their lightest tested point", () => {
    expect(contrastPairs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "newsletter aurora scrim worst stop", theme: "light", fg: contrastColors.white, bg: contrastColors.ogScrimOverAuroraCyan }),
        expect.objectContaining({ name: "newsletter aurora scrim worst stop", theme: "dark", fg: contrastColors.white, bg: contrastColors.ogScrimOverAuroraCyan }),
        expect.objectContaining({ name: "og aurora scrim worst stop", theme: "light", fg: contrastColors.white, bg: contrastColors.ogScrimOverAuroraCyan }),
        expect.objectContaining({ name: "og aurora scrim worst stop", theme: "dark", fg: contrastColors.white, bg: contrastColors.ogScrimOverAuroraCyan })
      ])
    );
  });
});
