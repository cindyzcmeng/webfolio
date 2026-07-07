import { motion } from "framer-motion";
import closedSrc from "../../assets/images/envelope-closed.svg";
import openedSrc from "../../assets/images/envelope-opened.svg";

type EnvelopeProps = {
  opened: boolean;
  onOpen: () => void;
};

export default function Envelope({ opened, onOpen }: EnvelopeProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={opened ? "Close envelope" : "Open envelope"}
      className="relative z-10 flex h-[150px] w-[170px] cursor-pointer items-center justify-center sm:h-[190px] sm:w-[216px]"
      animate={{ scale: opened ? 1.08 : 1, y: opened ? 44 : 0 }}
      whileHover={{ scale: opened ? 1.12 : 1.04 }}
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
