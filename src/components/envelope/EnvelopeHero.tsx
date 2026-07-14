import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import DesktopEnvelopeHero from "./DesktopEnvelopeHero";
import MobileEnvelopeHero from "./MobileEnvelopeHero";

type EnvelopeHeroProps = {
  expanded: boolean;
  onToggleExpand: () => void;
};

export default function EnvelopeHero({ expanded, onToggleExpand }: EnvelopeHeroProps) {
  const isCoarsePointer = useIsCoarsePointer();

  if (isCoarsePointer) {
    return <MobileEnvelopeHero expanded={expanded} onToggleExpand={onToggleExpand} />;
  }
  return <DesktopEnvelopeHero expanded={expanded} onToggleExpand={onToggleExpand} />;
}
