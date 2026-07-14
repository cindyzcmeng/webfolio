import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import BackgroundGlow from "./BackgroundGlow";
import closedSrc from "../../assets/images/envelope-closed.svg";
import openedSrc from "../../assets/images/envelope-opened.svg";
import { projects } from "../../data/projects";
import { saveScrollY } from "../../lib/scrollMemory";

type MobileEnvelopeHeroProps = {
  expanded: boolean;
  onToggleExpand: () => void;
};

// Baked polaroid export ratio shared by every project cover (see PebbleCluster).
const POLAROID_RATIO = 800 / 937;

// Small per-card rotation + nudge so the grid reads as a handful of loose
// photos rather than a rigid table — cycled by index, not randomised, so the
// layout doesn't reshuffle on every re-render. Tailwind's JIT scanner needs
// each full class name literally in the source (it can't evaluate template
// interpolation), hence the pre-built strings instead of building them from
// per-card numbers.
const CARD_TILT_CLASSES = [
  "rotate-[-6deg] -translate-x-[2px] translate-y-[4px]",
  "rotate-[4deg] translate-x-[3px] -translate-y-[6px]",
  "rotate-[-3deg] -translate-x-[3px] translate-y-[6px]",
  "rotate-[5deg] translate-x-[2px] -translate-y-[4px]",
  "rotate-[-4deg] -translate-x-[4px] translate-y-[8px]",
  "rotate-[3deg] translate-x-[4px] -translate-y-[6px]",
];

// Touch has no hover to preview-then-commit with, and a tap on the envelope
// is easy to trigger by accident while scrolling past it — so on mobile the
// scroll gesture itself opens the envelope and reveals the polaroids. The
// section is taller than the viewport and its content pins via `sticky`,
// turning that extra scroll distance into a scrubbable 0–1 progress value.
// The envelope and the grid share this one pinned screen (rather than the
// grid living further down the page) so there's never a stretch of blank
// space between them — every scroll position shows both together, tightly.
const SCRUB_VH = 160;

export default function MobileEnvelopeHero({ expanded, onToggleExpand }: MobileEnvelopeHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  // There's no arrow to tap on mobile — reaching the bottom of the scrub
  // (envelope fully open, every polaroid revealed) commits to expanding,
  // the same one-time, one-way action the arrow used to gate. This ref
  // (not state) just makes sure that commit only ever fires once.
  const hasExpandedRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 34, mass: 0.4 });

  // The envelope finishes opening by the halfway point of the scrub, and the
  // polaroid grid trails in behind it — so the two reveals overlap instead
  // of happening as two separate, disconnected steps.
  const envelopeT = useTransform(progress, [0, 0.5], [0, 1]);
  const gridT = useTransform(progress, [0.35, 1], [0, 1]);

  const closedOpacity = useTransform(envelopeT, (v) => 1 - v);
  const envelopeScale = useTransform(envelopeT, [0, 1], [1, 1.06]);
  const envelopeY = useTransform(envelopeT, [0, 1], [0, 24]);
  const gridY = useTransform(gridT, [0, 1], [28, 0]);

  useMotionValueEvent(envelopeT, "change", (v) => {
    setOpened((prev) => {
      const next = v > 0.6;
      if (prev === next) return prev;
      return next;
    });
  });

  // Raw (unsprung) progress — the commit should fire the instant the user's
  // actual scroll reaches the end of the pin, not whenever the smoothed
  // value catches up.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.98 && !hasExpandedRef.current && !expanded) {
      hasExpandedRef.current = true;
      onToggleExpand();
    }
  });

  return (
    <section ref={trackRef} className="relative" style={{ height: `${SCRUB_VH}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-26 overflow-hidden px-4 sm:gap-28 md:gap-32">
        <BackgroundGlow />

        <motion.div
          aria-hidden
          className="relative z-10 flex w-[46vw] max-w-[220px] min-w-[150px] items-center justify-center aspect-[216/190]"
          style={{ scale: envelopeScale, y: envelopeY }}
        >
          <motion.img
            src={closedSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            style={{ opacity: closedOpacity }}
          />
          <motion.img
            src={openedSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            style={{ opacity: envelopeT }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 grid w-full max-w-[360px] grid-cols-3 gap-x-4 gap-y-8 sm:max-w-[420px] sm:gap-x-5 sm:gap-y-10 md:max-w-[460px] md:gap-x-6"
          style={{ opacity: gridT, y: gridY, pointerEvents: opened ? "auto" : "none" }}
          aria-hidden={!opened}
        >
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              tabIndex={opened ? 0 : -1}
              aria-label={`View ${project.title} project`}
              onClick={() => {
                saveScrollY();
                navigate(`/projects/${project.slug}`, { state: { backgroundLocation: location } });
              }}
              className={`flex touch-manipulation flex-col items-center gap-1 text-center transition-transform duration-150 ease-out active:scale-95 ${CARD_TILT_CLASSES[index % CARD_TILT_CLASSES.length]}`}
            >
              <span className="block w-full overflow-hidden" style={{ aspectRatio: `${POLAROID_RATIO}` }}>
                <img
                  src={project.cover}
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none object-contain"
                />
              </span>
              <span className="font-card text-[10px] uppercase leading-tight tracking-wide text-moss">
                {project.title}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
