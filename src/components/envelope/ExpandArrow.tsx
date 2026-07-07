import { motion } from "framer-motion";
import arrowSrc from "../../assets/icons/arrow.svg";

type ExpandArrowProps = {
  expanded: boolean;
  visible: boolean;
  onToggle: () => void;
};

export default function ExpandArrow({ expanded, visible, onToggle }: ExpandArrowProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={expanded ? "Collapse portfolio view" : "Expand portfolio view"}
      className="relative z-10 flex h-10 w-20 cursor-pointer items-center justify-center"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.4 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={arrowSrc}
        alt=""
        className="h-full w-full object-contain"
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
      />
    </motion.button>
  );
}
