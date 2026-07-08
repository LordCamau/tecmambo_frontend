"use client";

import { useEffect } from "react";

function isProtectedImageTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("img, picture"));
}

export function ImageProtection() {
  useEffect(() => {
    const protect = (event: Event) => {
      if (isProtectedImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", protect, { capture: true });
    document.addEventListener("dragstart", protect, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", protect, { capture: true });
      document.removeEventListener("dragstart", protect, { capture: true });
    };
  }, []);

  return null;
}
