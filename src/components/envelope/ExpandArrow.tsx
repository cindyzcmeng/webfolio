import { motion } from "framer-motion";
import arrowSrc from "../../assets/icons/arrow.svg";
import { EASE_IN_OUT_CUBIC, EXPAND_SCROLL_DURATION_MS } from "../../lib/motion";

type ExpandArrowProps = {
  expanded: boolean;
  visible: boolean;
  onToggle: () => void;
};

const REST_Y = 44;

export default function ExpandArrow({ expanded, visible, onToggle }: ExpandArrowProps) {
  // Once used, the arrow sinks down in pace with the page scroll rather than
  // snapping back up — it's a one-time affordance, not a toggle.
  const hiddenY = expanded ? REST_Y + 40 : 12;
  const transition = expanded
    ? { duration: EXPAND_SCROLL_DURATION_MS / 1000, ease: EASE_IN_OUT_CUBIC }
    : { duration: 0.4 };

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label="Expand portfolio view"
      className="relative z-10 flex h-10 w-20 cursor-pointer items-center justify-center"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? REST_Y : hiddenY }}
      transition={transition}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      whileHover={visible ? { scale: 1.1 } : undefined}
      whileTap={visible ? { scale: 0.95 } : undefined}
    >
      <img src={arrowSrc} alt="" className="h-full w-full object-contain" />
    </motion.button>
  );
}
