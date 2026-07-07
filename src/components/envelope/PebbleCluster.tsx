import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pebble from "./Pebble";
import ProjectPreviewCard from "./ProjectPreviewCard";
import { projects } from "../../data/projects";
import { saveScrollY } from "../../lib/scrollMemory";

const STAGE_WIDTH = 1180;
const STAGE_HEIGHT = 760;

const CARD_WIDTH = 260;
const CARD_HALF_HEIGHT = 80;
const PUSH_INFLUENCE = 300;
const PUSH_MAX = 90;

const LAYOUT = [
  { slug: "archive-drift", x: -420, y: -110, height: 150, ratio: 819 / 649, rotate: -6 },
  { slug: "this-to-me", x: -460, y: 230, height: 145, ratio: 775 / 645, rotate: 5 },
  { slug: "learn-and-record", x: -40, y: -290, height: 150, ratio: 813 / 688, rotate: -3 },
  { slug: "bancall", x: -160, y: 270, height: 128, ratio: 770 / 688, rotate: 7 },
  { slug: "barista", x: 250, y: -260, height: 148, ratio: 795 / 707, rotate: -5 },
  { slug: "stampuzzle", x: 440, y: -40, height: 146, ratio: 794 / 681, rotate: 4 },
] as const;

const BASE_LAYOUT = LAYOUT.map((l) => ({ ...l, width: l.height * l.ratio }));

type PebbleClusterProps = {
  opened: boolean;
};

export default function PebbleCluster({ opened }: PebbleClusterProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const hoveredBase = BASE_LAYOUT.find((l) => l.slug === hoveredSlug) ?? null;
  const hoveredProject = hoveredBase ? projects.find((p) => p.slug === hoveredBase.slug) ?? null : null;
  const cardSide: "left" | "right" = (hoveredBase?.x ?? 0) >= 0 ? "right" : "left";

  const cardCenter = useMemo(() => {
    if (!hoveredBase) return null;
    const hoveredHalfW = (hoveredBase.width / 2) * 1.28;
    const gap = 20;
    const cx =
      hoveredBase.x + (cardSide === "right" ? 1 : -1) * (hoveredHalfW + gap + CARD_WIDTH / 2);
    return { x: cx, y: hoveredBase.y };
  }, [hoveredBase, cardSide]);

  const positions = useMemo(() => {
    return BASE_LAYOUT.map((layout) => {
      if (!cardCenter || layout.slug === hoveredSlug) {
        return { ...layout, x: layout.x, y: layout.y };
      }
      const dx = layout.x - cardCenter.x;
      const dy = layout.y - cardCenter.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist >= PUSH_INFLUENCE) return layout;
      const factor = (PUSH_INFLUENCE - dist) / PUSH_INFLUENCE;
      const push = factor * PUSH_MAX;
      return { ...layout, x: layout.x + (dx / dist) * push, y: layout.y + (dy / dist) * push };
    });
  }, [cardCenter, hoveredSlug]);

  return (
    <div
      className="relative mx-auto h-[213px] w-[330px] sm:h-[342px] sm:w-[531px] md:h-[471px] md:w-[732px] lg:h-[608px] lg:w-[944px] xl:h-[760px] xl:w-[1180px]"
      style={{ pointerEvents: opened ? "auto" : "none" }}
    >
      <div
        className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.28] sm:scale-[0.45] md:scale-[0.62] lg:scale-[0.8] xl:scale-100"
        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
      >
        {positions.map((layout, i) => {
          const project = projects.find((p) => p.slug === layout.slug);
          if (!project) return null;
          return (
            <Pebble
              key={layout.slug}
              project={project}
              opened={opened}
              hovered={hoveredSlug === layout.slug}
              dimmed={hoveredSlug !== null && hoveredSlug !== layout.slug}
              x={layout.x}
              y={layout.y}
              rotate={layout.rotate}
              width={layout.width}
              height={layout.height}
              delay={i * 0.04}
              onEnter={() => setHoveredSlug(layout.slug)}
              onLeave={() =>
                setHoveredSlug((current) => (current === layout.slug ? null : current))
              }
              onClick={() => {
                saveScrollY();
                navigate(`/projects/${layout.slug}`, { state: { backgroundLocation: location } });
              }}
            />
          );
        })}
        {opened && cardCenter && (
          <ProjectPreviewCard
            project={hoveredProject}
            x={cardCenter.x}
            y={cardCenter.y}
            width={CARD_WIDTH}
            halfHeight={CARD_HALF_HEIGHT}
            side={cardSide}
          />
        )}
      </div>
    </div>
  );
}
