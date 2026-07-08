import { motion } from "framer-motion";
import type { Project } from "../../types/project";

const TEXT_WIDTH = 320;
const PILL_RADIUS = 999;
// The polaroid is a baked, fully-opaque rectangle (white frame + its own
// drop shadow already rendered into the pixels), unlike the old organic-blob
// photo cutouts — so the clip-path can sit flush with the photo's bounding
// box on that side with no extra inset or corner-rounding to hide a mismatch.

type PebbleProps = {
  project: Project;
  opened: boolean;
  interactive: boolean;
  hovered: boolean;
  buttonRef: (el: HTMLButtonElement | null) => void;
  x: number;
  y: number;
  rotate: number;
  width: number;
  height: number;
  growRight: boolean;
  delay: number;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
};

export default function Pebble({
  project,
  opened,
  interactive,
  hovered,
  buttonRef,
  x,
  y,
  rotate,
  width,
  height,
  growRight,
  delay,
  onEnter,
  onLeave,
  onClick,
}: PebbleProps) {
  const containerWidth = width + TEXT_WIDTH;
  const containerHeight = height;

  // The photo is fixed-size and locked to one edge of the container; the rest
  // (white panel + text) lives in the remaining space and is only ever
  // revealed by the clip-path below, never by moving or resizing the photo.
  const photoSide = growRight ? "left" : "right";
  const textSide = growRight ? "right" : "left";

  // Rotation/scale should pivot around the photo's own center, not the wider
  // container's center, so non-hovered pebbles don't visibly shift when their
  // (invisible) text side flips direction.
  const photoCenterPercent = growRight
    ? ((width / 2) / containerWidth) * 100
    : ((TEXT_WIDTH + width / 2) / containerWidth) * 100;

  const collapsedClip = growRight ? `inset(0 ${TEXT_WIDTH}px 0 0)` : `inset(0 0 0 ${TEXT_WIDTH}px)`;
  const expandedClip = growRight
    ? `inset(0 0 0 0 round 0px ${PILL_RADIUS}px ${PILL_RADIUS}px 0px)`
    : `inset(0 0 0 0 round ${PILL_RADIUS}px 0px 0px ${PILL_RADIUS}px)`;

  // Container position tracks the photo's fixed edge, so the photo itself
  // never moves — only the reveal grows outward from it.
  const photoLeftEdge = x - width / 2;
  const containerX = growRight ? photoLeftEdge : photoLeftEdge - TEXT_WIDTH;
  const containerY = y - height / 2;

  // While hidden behind the envelope, anchor to the envelope's resting spot
  // (stage center-ish, slightly below) using the same photo-locked math.
  const hiddenPhotoLeftEdge = 0 - width / 2;
  const hiddenContainerX = growRight ? hiddenPhotoLeftEdge : hiddenPhotoLeftEdge - TEXT_WIDTH;
  const hiddenContainerY = 40 - height / 2;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: containerWidth,
        height: containerHeight,
        zIndex: hovered ? 30 : 10,
        // This wrapper has no clip-path (see comment below), so it must never
        // itself intercept pointer events — only the clipped button inside
        // should be hit-testable, otherwise its full rectangular bounds would
        // silently swallow clicks meant for a neighboring pebble.
        pointerEvents: "none",
        transformOrigin: `${photoCenterPercent}% 50%`,
      }}
      initial={false}
      animate={{
        x: opened ? containerX : hiddenContainerX,
        y: opened ? containerY : hiddenContainerY,
        scale: opened ? 1 : 0,
        rotate: opened ? (hovered ? 0 : rotate) : 0,
        opacity: opened ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 16,
        delay: opened ? 0.12 + delay : 0,
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={`View ${project.title} project`}
        onClick={onClick}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        className="relative block h-full w-full cursor-pointer touch-manipulation"
        style={{
          pointerEvents: interactive ? "auto" : "none",
          // clip-path here restricts hit-testing too, so the invisible
          // (collapsed) part of this wide container can't intercept
          // clicks/hovers meant for a neighboring pebble.
          clipPath: hovered ? expandedClip : collapsedClip,
          transition: "clip-path 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        tabIndex={interactive ? 0 : -1}
      >
        {/* Transparent until hovered — this is the text panel's backdrop, kept
            invisible while collapsed since the panel area itself is clipped away. */}
        <div
          className="absolute inset-0 bg-white"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease" }}
        />
        <div
          className="absolute inset-y-0 flex items-center gap-4"
          style={{
            [textSide]: 0,
            width: TEXT_WIDTH,
            flexDirection: growRight ? "row" : "row-reverse",
            paddingLeft: growRight ? 44 : 24,
            paddingRight: growRight ? 24 : 44,
          }}
        >
          <span className="h-14 w-[2.5px] shrink-0 rounded-full bg-moss" />
          <div
            className="flex min-w-0 flex-1 flex-col gap-1"
            style={{ textAlign: growRight ? "left" : "right" }}
          >
            <p className="font-card text-lg uppercase leading-tight tracking-wide text-moss">
              {project.title}
            </p>
            <p className="font-body text-sm leading-snug text-moss">{project.summary}</p>
            <p className="font-body text-xs uppercase leading-snug tracking-wide text-moss-muted">
              {project.tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ")}
            </p>
          </div>
        </div>
        <img
          src={project.cover}
          alt={project.title}
          draggable={false}
          className="absolute inset-y-0 h-full select-none object-contain"
          style={{ [photoSide]: 0, width }}
        />
      </button>
    </motion.div>
  );
}
