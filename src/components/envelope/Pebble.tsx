import { motion } from "framer-motion";
import type { Project } from "../../types/project";

type PebbleProps = {
  project: Project;
  opened: boolean;
  hovered: boolean;
  dimmed: boolean;
  x: number;
  y: number;
  rotate: number;
  width: number;
  height: number;
  delay: number;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
};

export default function Pebble({
  project,
  opened,
  hovered,
  dimmed,
  x,
  y,
  rotate,
  width,
  height,
  delay,
  onEnter,
  onLeave,
  onClick,
}: PebbleProps) {
  const scale = opened ? (hovered ? 1.28 : 1) : 0;

  return (
    <motion.button
      type="button"
      aria-label={`View ${project.title} project`}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="absolute left-1/2 top-1/2 cursor-pointer touch-manipulation"
      style={{ width, height, pointerEvents: opened ? "auto" : "none", zIndex: hovered ? 30 : 10 }}
      tabIndex={opened ? 0 : -1}
      initial={false}
      animate={{
        x: x - width / 2,
        y: y - height / 2,
        scale,
        rotate: opened ? rotate : 0,
        opacity: opened ? (dimmed ? 0.6 : 1) : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 17,
        delay: opened ? delay : 0,
      }}
    >
      <img
        src={project.cover}
        alt={project.title}
        draggable={false}
        className="h-full w-full select-none object-contain"
        style={{
          filter: hovered
            ? "drop-shadow(8px 16px 24px rgba(97,162,0,0.35))"
            : "drop-shadow(8px 16px 24px rgba(205,205,205,0.35))",
          transition: "filter 0.3s ease",
        }}
      />
    </motion.button>
  );
}
