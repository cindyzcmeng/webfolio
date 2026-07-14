import { motion } from "framer-motion";
import { useCanHover } from "../../hooks/useCanHover";
import closedSrc from "../../assets/images/envelope-closed.svg";
import openedSrc from "../../assets/images/envelope-opened.svg";

type EnvelopeProps = {
  opened: boolean;
  onOpen: () => void;
};

export default function Envelope({ opened, onOpen }: EnvelopeProps) {
  // Opening/closing is already a tap (onClick fires on touch and mouse
  // alike) — only the extra hover scale bump needs gating, since on touch
  // devices a tap leaves that hover state stuck until the next tap elsewhere.
  const canHover = useCanHover();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={opened ? "Close envelope" : "Open envelope"}
      className="relative z-10 flex w-1/3 min-w-[140px] max-w-[360px] cursor-pointer touch-manipulation items-center justify-center aspect-[216/190] min-[380px]:min-w-[180px] sm:min-w-[240px] sm:max-w-[400px] md:min-w-[300px] md:max-w-[500px]"
      animate={{ scale: opened ? 1.08 : 1, y: opened ? 60 : 0 }}
      whileHover={canHover ? { scale: opened ? 1.12 : 1.04 } : undefined}
      whileTap={{ scale: opened ? 1.02 : 0.97 }}
      transition={{ type: "spring", stiffness: 170, damping: 20 }}
    >
      <img
        src={closedSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
        style={{ opacity: opened ? 0 : 1, transition: "opacity 0.4s ease" }}
      />
      <img
        src={openedSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
        style={{ opacity: opened ? 1 : 0, transition: "opacity 0.4s ease" }}
      />
    </motion.button>
  );
}
