import { useState } from "react";
import BackgroundGlow from "./BackgroundGlow";
import Envelope from "./Envelope";
import PebbleCluster from "./PebbleCluster";
import ExpandArrow from "./ExpandArrow";

type DesktopEnvelopeHeroProps = {
  expanded: boolean;
  onToggleExpand: () => void;
};

// Mouse-driven experience: click to open, hover to preview and repel
// pebbles. Kept as its own component (rather than branching inline) so the
// scroll-driven mobile variant (see MobileEnvelopeHero) can't regress this
// by accident.
export default function DesktopEnvelopeHero({ expanded, onToggleExpand }: DesktopEnvelopeHeroProps) {
  const [opened, setOpened] = useState(false);
  const [arrowUsed, setArrowUsed] = useState(false);

  const handleEnvelopeToggle = () => {
    setOpened((v) => {
      const next = !v;
      // Before the arrow's one-time reveal, the envelope only opens/closes
      // itself. After that, it becomes the expand/collapse toggle.
      if (arrowUsed && next !== expanded) {
        onToggleExpand();
      }
      return next;
    });
  };

  const handleArrowClick = () => {
    setArrowUsed(true);
    onToggleExpand();
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 pb-10 pt-16">
      <BackgroundGlow />

      <div className="relative flex w-full flex-1 items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{ zIndex: opened ? 10 : 20 }}
        >
          <div className="pointer-events-auto">
            <Envelope opened={opened} onOpen={handleEnvelopeToggle} />
          </div>
          <div className="pointer-events-auto">
            <ExpandArrow expanded={expanded} visible={opened && !expanded && !arrowUsed} onToggle={handleArrowClick} />
          </div>
        </div>
        <PebbleCluster opened={opened} />
      </div>
    </section>
  );
}
