export const EXPAND_SCROLL_DURATION_MS = 900;
export const RESUME_TRANSITION_DURATION_MS = 600;

// framer-motion equivalent of the easeInOutCubic used by smoothScrollTo,
// so the arrow's sink animation stays visually in pace with the page scroll.
export const EASE_IN_OUT_CUBIC: [number, number, number, number] = [0.65, 0, 0.35, 1];
