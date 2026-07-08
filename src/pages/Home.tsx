import { useRef, useState } from "react";
import EnvelopeHero from "../components/envelope/EnvelopeHero";
import ResumeSection from "../components/resume/ResumeSection";
import { smoothScrollTo } from "../lib/smoothScroll";

const SCROLL_DURATION = 900;

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleToggleExpand = () => {
    const next = !expanded;
    if (next) {
      setExpanded(next);
      const heroHeight = heroRef.current?.getBoundingClientRect().height ?? 0;
      window.setTimeout(() => {
        smoothScrollTo(heroHeight, SCROLL_DURATION);
      }, 350);
    } else {
      // Collapse after scrolling — shrinking mid-scroll fights the scroll animation.
      smoothScrollTo(0, SCROLL_DURATION);
      window.setTimeout(() => {
        setExpanded(next);
      }, SCROLL_DURATION);
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
