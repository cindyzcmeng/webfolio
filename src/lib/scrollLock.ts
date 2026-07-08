const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

let lockCount = 0;

function preventScroll(event: Event) {
  event.preventDefault();
}

function preventScrollKey(event: KeyboardEvent) {
  if (SCROLL_KEYS.has(event.key)) {
    event.preventDefault();
  }
}

// Blocks user-driven scroll input (wheel/touch/keys) without touching
// overflow/layout, so it can run alongside a programmatic scroll animation
// without causing a scrollbar-induced jump.
export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKey, { passive: false });
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("keydown", preventScrollKey);
  }
}
