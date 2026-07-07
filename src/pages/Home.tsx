import { useRef, useState } from "react";
import EnvelopeHero from "../components/envelope/EnvelopeHero";
import ResumeSection from "../components/resume/ResumeSection";

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleToggleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      const heroHeight = heroRef.current?.getBoundingClientRect().height ?? 0;
      window.setTimeout(() => {
        window.scrollTo({ top: heroHeight, behavior: "smooth" });
      }, 350);
    } else {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
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
