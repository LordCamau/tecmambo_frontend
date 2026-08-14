"use client";

import { useEffect } from "react";

const adsenseClientId = "ca-pub-6410608625427921";
const adsenseScriptId = "google-adsense";

export function AdSenseScript() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "true") {
      return;
    }
    if (document.getElementById(adsenseScriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = adsenseScriptId;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
