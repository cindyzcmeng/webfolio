import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { projectThemes } from "../data/projectThemes";
import { useScrollLock } from "../hooks/useScrollLock";

const archiveDriftImages = import.meta.glob("../assets/archive-drift/*.png", { eager: true, import: "default" }) as Record<string, string>;
const thisToMeImages = import.meta.glob("../assets/this-to-me/*.png", { eager: true, import: "default" }) as Record<string, string>;
const learnAndRecordImages = import.meta.glob("../assets/learn-and-record/*.png", { eager: true, import: "default" }) as Record<string, string>;
const baristaImages = import.meta.glob("../assets/barista/*.png", { eager: true, import: "default" }) as Record<string, string>;
const stampuzzleImages = import.meta.glob("../assets/stampuzzle/*.png", { eager: true, import: "default" }) as Record<string, string>;

const IMAGES_BY_SLUG: Record<string, Record<string, string>> = {
  "archive-drift": archiveDriftImages,
  "this-to-me": thisToMeImages,
  "learn-and-record": learnAndRecordImages,
  barista: baristaImages,
  stampuzzle: stampuzzleImages,
};

function getSortedImages(slug: string): string[] {
  const modules = IMAGES_BY_SLUG[slug] ?? {};
  return Object.keys(modules)
    .sort()
    .map((key) => modules[key]);
}

type ThemedProjectDetailPageProps = {
  slug: string;
  overlay?: boolean;
};

function BackLink({
  overlay,
  mute,
  accent,
}: {
  overlay: boolean;
  mute: string;
  accent: string;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const sharedProps = {
    className:
      "group flex w-fit cursor-pointer items-center gap-2 self-start font-body text-base outline-none transition-colors",
    style: { color: hovered ? accent : mute },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  const Arrow = () => (
    <svg
      viewBox="0 0 100 49"
      className="h-4 w-8 rotate-90 fill-current transition-transform duration-200 ease-out group-hover:-translate-x-1 group-active:translate-x-0"
    >
      <path d="M51 31C51 29.8954 50.1046 29 49 29C47.8954 29 47 29.8954 47 31L49 31L51 31ZM47.5858 33.9142C48.3668 34.6953 49.6332 34.6953 50.4142 33.9142L63.1421 21.1863C63.9232 20.4052 63.9232 19.1389 63.1421 18.3579C62.3611 17.5768 61.0948 17.5768 60.3137 18.3579L49 29.6716L37.6863 18.3579C36.9052 17.5768 35.6389 17.5768 34.8579 18.3579C34.0768 19.1389 34.0768 20.4052 34.8579 21.1863L47.5858 33.9142ZM49 31L47 31L47 32.5L49 32.5L51 32.5L51 31L49 31Z" />
    </svg>
  );

  if (overlay) {
    return (
      <button type="button" onClick={() => navigate(-1)} {...sharedProps}>
        <Arrow />
        Back to homepage
      </button>
    );
  }

  return (
    <Link to="/" {...sharedProps}>
      <Arrow />
      Back to homepage
    </Link>
  );
}

export default function ThemedProjectDetailPage({ slug, overlay = false }: ThemedProjectDetailPageProps) {
  useScrollLock(overlay);

  const project = projects.find((p) => p.slug === slug);
  const theme = projectThemes[slug];
  const images = getSortedImages(slug);

  if (!project || !theme) {
    return null;
  }

  const content = (
    <div className="mx-auto flex max-w-[1160px] flex-col gap-12 px-6 py-16 sm:px-10">
      <BackLink overlay={overlay} mute={theme.mute} accent={theme.accent} />

      <div className="flex flex-col gap-4">
        <h1
          className={`w-fit text-5xl uppercase sm:text-6xl md:text-7xl ${theme.titleFontClass}`}
          style={{
            color: theme.titleColor,
            backgroundImage: theme.titleHighlight
              ? `linear-gradient(${theme.titleHighlight}, ${theme.titleHighlight})`
              : undefined,
            backgroundRepeat: "no-repeat",
            backgroundSize: theme.titleHighlight ? "100% 50%" : undefined,
            backgroundPosition: theme.titleHighlight ? "0 60%" : undefined,
            padding: theme.titleHighlight ? "0.05em 0.2em" : undefined,
          }}
        >
          {project.title}
        </h1>

        <p className={`text-2xl sm:text-3xl ${theme.bodyFontClass}`} style={{ color: theme.taglineColor }}>
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-sm uppercase tracking-wide sm:text-base ${theme.bodyFontClass}`}
              style={{ color: theme.mute }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className={`text-lg leading-relaxed sm:text-xl ${theme.bodyFontClass}`} style={{ color: theme.ink }}>
          {project.description}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {images.map((src, index) => (
          <div key={src} className="w-full overflow-hidden" style={{ aspectRatio: theme.imageAspectRatio }}>
            <img src={src} alt={`${project.title} — image ${index + 1}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );

  if (overlay) {
    return (
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto bg-white"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return <main className="w-full bg-white">{content}</main>;
}
