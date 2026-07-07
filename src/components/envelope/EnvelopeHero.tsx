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

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 pt-16">
      <BackgroundGlow />

      <div className="relative flex w-full flex-1 items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ zIndex: opened ? 10 : 20 }}
        >
          <div className="pointer-events-auto">
            <Envelope opened={opened} onOpen={() => setOpened((v) => !v)} />
          </div>
        </div>
        <PebbleCluster opened={opened} />
      </div>

      <ExpandArrow expanded={expanded} visible={opened} onToggle={onToggleExpand} />
    </section>
  );
}
