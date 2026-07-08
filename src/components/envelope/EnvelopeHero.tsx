import { useState } from "react";
import BackgroundGlow from "./BackgroundGlow";
import Envelope from "./Envelope";
import PebbleCluster from "./PebbleCluster";
import ExpandArrow from "./ExpandArrow";

type EnvelopeHeroProps = {
  expanded: boolean;
  onToggleExpand: () => void;
};

export default function EnvelopeHero({ expanded, onToggleExpand }: EnvelopeHeroProps) {
  const [opened, setOpened] = useState(false);

  const handleEnvelopeToggle = () => {
    setOpened((v) => {
      const next = !v;
      if (!next && expanded) {
        onToggleExpand();
      }
      return next;
    });
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
            <ExpandArrow expanded={expanded} visible={opened} onToggle={onToggleExpand} />
          </div>
        </div>
        <PebbleCluster opened={opened} />
      </div>
    </section>
  );
}
