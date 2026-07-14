import { useEffect, useState } from "react";

const QUERY = "(pointer: coarse)";

// True for the device's primary pointer being touch (phones/tablets), false
// for a mouse/trackpad — used to swap tap/hover-driven interactions for
// scroll-driven ones where a real hover state doesn't exist.
export function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setIsCoarse(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isCoarse;
}
