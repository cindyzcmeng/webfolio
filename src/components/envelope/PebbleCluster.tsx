import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pebble from "./Pebble";
import { projects } from "../../data/projects";
import { saveScrollY } from "../../lib/scrollMemory";

const STAGE_WIDTH = 1180;
const STAGE_HEIGHT = 1000;

const TEXT_WIDTH = 320;
const PEBBLE_CLEARANCE = 24;
// The envelope sits fixed at stage center (0,0); keep the widget clear of it too.
const ENVELOPE_RADIUS = 100;
// During repulsion, every other pebble drifts away from the hovered one a little —
// not just the ones directly in its path — so the whole cluster feels alive.
const AMBIENT_STRENGTH = 55;
const AMBIENT_FALLOFF = 900;
const AMBIENT_FLOOR = 0.15;

type Rect = { left: number; right: number; top: number; height: number };

function rectOverlapsCircle(rect: Rect, cx: number, cy: number, r: number) {
  const closestX = Math.min(Math.max(cx, rect.left), rect.right);
  const closestY = Math.min(Math.max(cy, rect.top), rect.top + rect.height);
  return Math.hypot(cx - closestX, cy - closestY) < r;
}

// A dome spread across the upper half of the stage — the envelope rests below
// center, so no pebble should sit lower than it in the resting layout.
const LAYOUT = [
  { slug: "archive-drift", x: -342, y: -308, height: 150, ratio: 819 / 649, rotate: -6 },
  { slug: "this-to-me", x: -414, y: -73, height: 145, ratio: 775 / 645, rotate: 5 },
  { slug: "learn-and-record", x: 110, y: -384, height: 150, ratio: 813 / 688, rotate: -3 },
  { slug: "bancall", x: -110, y: -384, height: 128, ratio: 770 / 688, rotate: 7 },
  { slug: "barista", x: 342, y: -308, height: 148, ratio: 795 / 707, rotate: -5 },
  { slug: "stampuzzle", x: 414, y: -73, height: 146, ratio: 794 / 681, rotate: 4 },
] as const;

const BASE_LAYOUT = LAYOUT.map((l) => ({ ...l, width: l.height * l.ratio }));

type BaseLike = { x: number; y: number; width: number; height: number };

function buildWidgetRect(base: BaseLike, growRight: boolean): Rect {
  const photoHalfW = base.width / 2;
  const photoHalfH = base.height / 2;
  const top = base.y - photoHalfH;
  const height = photoHalfH * 2;
  if (growRight) {
    return { left: base.x - photoHalfW, right: base.x + photoHalfW + TEXT_WIDTH, top, height };
  }
  return { left: base.x - photoHalfW - TEXT_WIDTH, right: base.x + photoHalfW, top, height };
}

// Every pebble's reveal direction: toward stage center by default (more room),
// but flipped away from it if that would run the card through the envelope.
// This must be the SAME function for a pebble's resting state and its hovered
// state — the two lowest pebbles (closest to the envelope) sit close enough
// that "toward center" overlaps it, so if only the hovered check flipped
// direction, the flip would fire the instant hover starts: transform-origin
// changes instantly (untransitioned) while position is still mid-animation,
// producing a visible jump that then eases back — exactly the bug reported.
function computeGrowRight(base: BaseLike) {
  const preferred = base.x <= 0;
  const preferredRect = buildWidgetRect(base, preferred);
  if (!rectOverlapsCircle(preferredRect, 0, 0, ENVELOPE_RADIUS)) return preferred;
  return !preferred;
}

type PebbleClusterProps = {
  opened: boolean;
};

export default function PebbleCluster({ opened }: PebbleClusterProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  // Pebbles become clickable/hoverable the instant `opened` flips true, but they're
  // still mid-flight out of the envelope then. Clicking the envelope leaves the real
  // cursor resting right where the envelope is — and since every pebble's path starts
  // near that same point, a pebble settling under the stationary cursor mid-emergence
  // fires a spurious hover, kicking off repulsion before the burst animation even
  // finishes. Gate real interactivity until the emergence has had time to settle.
  const [interactive, setInteractive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!opened) {
      setInteractive(false);
      setHoveredSlug(null);
      return;
    }
    const timer = window.setTimeout(() => setInteractive(true), 750);
    return () => window.clearTimeout(timer);
  }, [opened]);

  // Pebbles animate via CSS transform, so a pebble that sweeps out from under a
  // *stationary* cursor never fires mouseleave (that only fires on actual cursor
  // movement) — its hover gets stuck, which then keeps driving repulsion on every
  // other pebble even though nothing looks intentionally hovered. Actively
  // re-validate the hovered slug against the real cursor position instead of
  // trusting mouseenter/mouseleave alone.
  const pebbleRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!hoveredSlug) return;
    const id = window.setInterval(() => {
      const el = pebbleRefs.current[hoveredSlug];
      const pos = mousePos.current;
      if (!el || !pos) return;
      // getBoundingClientRect() would return the button's full unclipped layout
      // box (photo + hidden text panel) — elementFromPoint respects the actual
      // clip-path hit-test shape instead, which is what we actually want here.
      const hit = document.elementFromPoint(pos.x, pos.y);
      const stillOver = hit !== null && (hit === el || el.contains(hit));
      if (!stillOver) {
        setHoveredSlug((current) => (current === hoveredSlug ? null : current));
      }
    }, 120);
    return () => window.clearInterval(id);
  }, [hoveredSlug]);

  const hoveredBase = BASE_LAYOUT.find((l) => l.slug === hoveredSlug) ?? null;

  const hoveredGrowRight = useMemo(() => {
    if (!hoveredBase) return true;
    return computeGrowRight(hoveredBase);
  }, [hoveredBase]);

  const widgetRect = useMemo(() => {
    if (!hoveredBase) return null;
    return buildWidgetRect(hoveredBase, hoveredGrowRight);
  }, [hoveredBase, hoveredGrowRight]);

  const positions = useMemo(() => {
    if (!widgetRect || !hoveredBase) return BASE_LAYOUT;

    const movable = BASE_LAYOUT.filter((l) => l.slug !== hoveredSlug).map((l) => ({
      ...l,
      radius: Math.max(l.width, l.height) / 2 + PEBBLE_CLEARANCE,
    }));

    // Ambient drift: everyone moves away from the hovered pebble a little, with a
    // floor so even the far side of the cluster visibly reacts.
    movable.forEach((p) => {
      const dx = p.x - hoveredBase.x;
      const dy = p.y - hoveredBase.y;
      const dist = Math.hypot(dx, dy) || 1;
      const factor = Math.max(AMBIENT_FLOOR, 1 - dist / AMBIENT_FALLOFF);
      const nudge = AMBIENT_STRENGTH * factor;
      p.x += (dx / dist) * nudge;
      p.y += (dy / dist) * nudge;
    });

    const pushOutOfWidget = (p: (typeof movable)[number]) => {
      const closestX = Math.min(Math.max(p.x, widgetRect.left), widgetRect.right);
      const closestY = Math.min(Math.max(p.y, widgetRect.top), widgetRect.top + widgetRect.height);
      const dx = p.x - closestX;
      const dy = p.y - closestY;
      const dist = Math.hypot(dx, dy);
      if (dist >= p.radius) return;
      if (dist < 0.001) {
        const centerY = widgetRect.top + widgetRect.height / 2;
        p.y += (p.y >= centerY ? 1 : -1) * p.radius;
        return;
      }
      const push = p.radius - dist;
      p.x += (dx / dist) * push;
      p.y += (dy / dist) * push;
    };

    // Alternate widget-clearance and pairwise pebble-pebble separation until stable,
    // since resolving one collision can reintroduce another. It's fine for a pushed
    // pebble to end up lower than the envelope here — this is a transient reaction,
    // not the resting layout.
    for (let iter = 0; iter < 8; iter++) {
      movable.forEach(pushOutOfWidget);
      for (let i = 0; i < movable.length; i++) {
        for (let j = i + 1; j < movable.length; j++) {
          const a = movable[i];
          const b = movable[j];
          const minDist = a.radius + b.radius;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= minDist) continue;
          if (dist < 0.001) {
            a.x -= minDist / 2;
            b.x += minDist / 2;
            continue;
          }
          const overlap = (minDist - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;
        }
      }
    }

    return BASE_LAYOUT.map((layout) => {
      if (layout.slug === hoveredSlug) return layout;
      const resolved = movable.find((m) => m.slug === layout.slug)!;
      return { ...layout, x: resolved.x, y: resolved.y };
    });
  }, [widgetRect, hoveredSlug, hoveredBase]);

  return (
    <div
      className="relative mx-auto h-[280px] w-[330px] sm:h-[450px] sm:w-[531px] md:h-[620px] md:w-[732px] lg:h-[800px] lg:w-[944px] xl:h-[1000px] xl:w-[1180px]"
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      <div
        className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.28] sm:scale-[0.45] md:scale-[0.62] lg:scale-[0.8] xl:scale-100"
        style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
      >
        {positions.map((layout, i) => {
          const project = projects.find((p) => p.slug === layout.slug);
          if (!project) return null;
          const hovered = hoveredSlug === layout.slug;
          return (
            <Pebble
              key={layout.slug}
              project={project}
              opened={opened}
              interactive={interactive}
              hovered={hovered}
              buttonRef={(el) => {
                pebbleRefs.current[layout.slug] = el;
              }}
              x={layout.x}
              y={layout.y}
              rotate={layout.rotate}
              width={layout.width}
              height={layout.height}
              growRight={hovered ? hoveredGrowRight : computeGrowRight(layout)}
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
      </div>
    </div>
  );
}
