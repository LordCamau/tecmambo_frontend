// @vitest-environment jsdom

import { createElement } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { extractYouTubeVideoId, YouTubeEmbed } from "@/components/media/YouTubeEmbed";

beforeEach(() => {
  const values = new Map<string, string>();
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      clear: () => values.clear(),
      getItem: (key: string) => values.get(key) ?? null,
      removeItem: (key: string) => values.delete(key),
      setItem: (key: string, value: string) => values.set(key, value)
    }
  });
});
afterEach(cleanup);

describe("extractYouTubeVideoId", () => {
  it("accepts supported YouTube URL forms", () => {
    expect(extractYouTubeVideoId("https://www.youtube.com/watch?v=Mzw2ttJD2qQ")).toBe("Mzw2ttJD2qQ");
    expect(extractYouTubeVideoId("https://youtu.be/pHE9kcQOfQE")).toBe("pHE9kcQOfQE");
    expect(extractYouTubeVideoId("https://youtube.com/embed/9rO0FGivAvQ")).toBe("9rO0FGivAvQ");
  });

  it("rejects unsupported hosts and malformed IDs", () => {
    expect(extractYouTubeVideoId("https://example.com/watch?v=Mzw2ttJD2qQ")).toBeNull();
    expect(extractYouTubeVideoId("https://youtube.com.evil.example/watch?v=Mzw2ttJD2qQ")).toBeNull();
    expect(extractYouTubeVideoId("https://youtube.com/watch?v=short")).toBeNull();
    expect(extractYouTubeVideoId("not a URL")).toBeNull();
  });

  it("loads a privacy-enhanced iframe only after consent and a user action", async () => {
    window.localStorage.setItem("tecmambo.cookieConsent", JSON.stringify({ choices: { social: true } }));
    render(createElement(YouTubeEmbed, {
      url: "https://www.youtube.com/watch?v=Mzw2ttJD2qQ",
      title: "The Odyssey official trailer",
      caption: "Official trailer."
    }));

    expect(screen.queryByTitle("The Odyssey official trailer")).toBeNull();
    fireEvent.click(await screen.findByRole("button", { name: "Play embedded video" }));

    const iframe = screen.getByTitle("The Odyssey official trailer");
    expect(iframe.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/Mzw2ttJD2qQ");
    expect(iframe.getAttribute("src")).not.toContain("autoplay");
    expect(iframe.getAttribute("loading")).toBe("lazy");
    expect(screen.getByRole("link", { name: "Watch on YouTube" }).getAttribute("href"))
      .toBe("https://www.youtube.com/watch?v=Mzw2ttJD2qQ");
  });
});
