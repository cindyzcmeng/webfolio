import { useEffect, useState } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

// Touch browsers fire a phantom hover on tap that only clears on the next
// tap elsewhere, so hover-driven animations read as "stuck" instead of
// hover-triggered. Gate them to devices that can actually hover.
export function useCanHover() {
  const [canHover, setCanHover] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setCanHover(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return canHover;
}
