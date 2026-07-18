export type NavSectionId = "about" | "projects" | "contact";

type NavBarProps = {
  onNavigate: (id: NavSectionId) => void;
  onHome: () => void;
};

const NAV_LINKS: { id: NavSectionId; label: string }[] = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function NavBar({ onNavigate, onHome }: NavBarProps) {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 border-b border-moss-muted/50 bg-white/80 px-6 py-3 backdrop-blur-md sm:px-10 sm:py-4">
      <button
        type="button"
        onClick={onHome}
        className="font-body text-lg uppercase text-moss transition-opacity hover:opacity-70 sm:text-xl"
      >
        CINDY MENG
      </button>
      <ul className="flex items-center gap-4 sm:gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              onClick={() => onNavigate(link.id)}
              className="font-body text-sm uppercase tracking-wide text-moss transition-opacity hover:opacity-70 sm:text-base"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
