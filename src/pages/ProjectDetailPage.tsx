import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { getSavedScrollY } from "../lib/scrollMemory";

const SECTIONS = [
  { key: "overview", label: "Project Overview" },
  { key: "challenge", label: "Design Challenge" },
  { key: "research", label: "Research Process" },
  { key: "development", label: "Design Development" },
  { key: "outcome", label: "Final Outcome" },
] as const;

type ProjectDetailPageProps = {
  overlay?: boolean;
};

export default function ProjectDetailPage({ overlay = false }: ProjectDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  const BackLink = () =>
    overlay ? (
      <button
        type="button"
        onClick={() => {
          navigate(-1);
          const y = getSavedScrollY();
          requestAnimationFrame(() => window.scrollTo(0, y));
        }}
        className="font-body text-base text-moss-muted hover:text-moss"
      >
        ← Back to portfolio
      </button>
    ) : (
      <Link to="/" className="font-body text-base text-moss-muted hover:text-moss">
        ← Back to portfolio
      </Link>
    );

  const content = !project ? (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-heading text-2xl uppercase text-moss">Project not found</p>
      <BackLink />
    </div>
  ) : (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-16 sm:px-10">
      <BackLink />

      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-4xl uppercase text-moss sm:text-5xl">{project.title}</h1>
        <p className="font-body text-xl text-moss sm:text-2xl">{project.summary}</p>
        <p className="font-body text-sm uppercase tracking-wide text-moss-muted">
          {project.tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ")}
        </p>
      </header>

      <div className="h-72 w-full overflow-hidden shadow-pebble sm:h-[420px]">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-12">
        {SECTIONS.map(({ key, label }) => (
          <section key={key} className="flex flex-col gap-3">
            <h2 className="font-heading text-2xl uppercase text-moss sm:text-3xl">{label}</h2>
            <p className="font-body text-lg leading-relaxed text-moss sm:text-xl">
              {project[key]}
            </p>
          </section>
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
