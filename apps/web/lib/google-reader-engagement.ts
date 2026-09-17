export const preferredSourceScriptUrl = "https://news.google.com/swg/js/v1/publisher.js";

export type GoogleReaderEngagementConfig = {
  preferredSourceEnabled: boolean;
  discoverUrl?: string;
};

export function verifiedGoogleDiscoverUrl(value: string | undefined) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "profile.google.com") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function googleReaderEngagementConfig(
  environment: Record<string, string | undefined> = process.env
): GoogleReaderEngagementConfig {
  return {
    preferredSourceEnabled: environment.GOOGLE_PREFERRED_SOURCE_ENABLED === "true",
    discoverUrl: verifiedGoogleDiscoverUrl(environment.GOOGLE_DISCOVER_URL)
  };
}
