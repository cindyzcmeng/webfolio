import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../types/project";

type ProjectPreviewCardProps = {
  project: Project | null;
  x: number;
  y: number;
  width: number;
  halfHeight: number;
  side: "left" | "right";
};

export default function ProjectPreviewCard({
  project,
  x,
  y,
  width,
  halfHeight,
  side,
}: ProjectPreviewCardProps) {
  const totalWidth = width + 24;
  const centeredX = x - totalWidth / 2;
  const centeredY = y - halfHeight;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="pointer-events-none absolute left-1/2 top-1/2 z-40 flex items-center gap-3"
          style={{ width, flexDirection: side === "right" ? "row" : "row-reverse" }}
          initial={{
            opacity: 0,
            x: centeredX + (side === "right" ? -16 : 16),
            y: centeredY,
          }}
          animate={{ opacity: 1, x: centeredX, y: centeredY }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <span className="h-px w-6 shrink-0 bg-moss/60" />
          <div
            className="flex-1 rounded-2xl bg-white/95 p-4 shadow-pebble backdrop-blur-sm"
            style={{ textAlign: side === "right" ? "left" : "right" }}
          >
            <p className="font-card text-lg uppercase tracking-wide text-moss">{project.title}</p>
            <p className="mt-1 font-body text-sm text-moss">{project.summary}</p>
            <p className="mt-2 font-body text-xs uppercase tracking-wide text-moss-muted">
              {project.tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
