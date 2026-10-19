"use client";

import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/lib/motion";

export function useMatchMedia(query: string = BREAKPOINTS.desktop): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
