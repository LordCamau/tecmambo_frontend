"use client";

import { useEffect, useState } from "react";

function getCurrentYear() {
  return new Date().getFullYear();
}

export function FooterCopyright() {
  const [year, setYear] = useState(getCurrentYear);

  useEffect(() => {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    const timeout = window.setTimeout(() => {
      setYear(getCurrentYear());
    }, Math.max(1000, nextYear.getTime() - now.getTime()));

    return () => window.clearTimeout(timeout);
  }, [year]);

  return (
    <p>
      © <span suppressHydrationWarning>{year}</span> tecMAMBO. A Brainerd Media Company. All rights reserved.
    </p>
  );
}
