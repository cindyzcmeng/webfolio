import { useEffect, useRef, useState } from "react";
import EnvelopeHero from "../components/envelope/EnvelopeHero";
import ResumeSection from "../components/resume/ResumeSection";
import { smoothScrollTo } from "../lib/smoothScroll";
import { EXPAND_SCROLL_DURATION_MS, RESUME_TRANSITION_DURATION_MS } from "../lib/motion";
import { getSavedScrollY } from "../lib/scrollMemory";
import { lockScroll, unlockScroll } from "../lib/scrollLock";

const SCROLL_DURATION = EXPAND_SCROLL_DURATION_MS;

type HomeProps = {
  overlayOpen?: boolean;
};

export default function Home({ overlayOpen = false }: HomeProps) {
  const [expanded, setExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const wasOverlayOpen = useRef(overlayOpen);

  // Home stays mounted behind the project overlay (see App.tsx's
  // backgroundLocation trick), so `expanded` is already preserved for free.
  // Scroll position isn't: the overlay covers the page without moving it,
  // but restore explicitly rather than trust that as an invariant.
  useEffect(() => {
    if (wasOverlayOpen.current && !overlayOpen) {
      window.scrollTo(0, getSavedScrollY());
    }
    wasOverlayOpen.current = overlayOpen;
  }, [overlayOpen]);

  const handleToggleExpand = () => {
    const next = !expanded;
    // Block manual scroll input for the animation's duration — otherwise a
    // wheel/touch/key scroll mid-animation fights the programmatic scroll
    // and the motion reads as janky.
    lockScroll();
    if (next) {
      setExpanded(next);
      const heroHeight = heroRef.current?.getBoundingClientRect().height ?? 0;
      window.setTimeout(() => {
        smoothScrollTo(heroHeight, SCROLL_DURATION);
      }, 350);
      window.setTimeout(unlockScroll, 350 + SCROLL_DURATION);
    } else {
      // Collapse after scrolling — shrinking mid-scroll fights the scroll animation.
      smoothScrollTo(0, SCROLL_DURATION);
      window.setTimeout(() => {
        setExpanded(next);
      }, SCROLL_DURATION);
      window.setTimeout(unlockScroll, SCROLL_DURATION + RESUME_TRANSITION_DURATION_MS);
    }
  };

  return (
    <main className="relative w-full bg-white">
      <div ref={heroRef}>
        <EnvelopeHero expanded={expanded} onToggleExpand={handleToggleExpand} />
      </div>
      <div ref={resumeRef}>
        <ResumeSection expanded={expanded} />
      </div>
    </main>
  );
}
