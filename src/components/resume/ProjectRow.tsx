import { Link, useLocation } from "react-router-dom";
import type { Project } from "../../types/project";
import { saveScrollY } from "../../lib/scrollMemory";

type ProjectRowProps = {
  project: Project;
  reverse: boolean;
};

export default function ProjectRow({ project, reverse }: ProjectRowProps) {
  const location = useLocation();
  return (
    <Link
      to={`/projects/${project.slug}`}
      state={{ backgroundLocation: location }}
      onClick={saveScrollY}
      className={`group flex w-full flex-col items-center gap-6 py-4 md:flex-row md:gap-16 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="h-64 w-full shrink-0 overflow-hidden shadow-pebble transition-transform duration-300 group-hover:scale-[1.02] sm:h-80 md:w-[410px]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className={`flex flex-1 flex-col gap-6 ${reverse ? "md:items-end md:text-right" : ""}`}>
        <div
          className={`flex items-center gap-6 ${reverse ? "md:flex-row-reverse" : ""}`}
        >
          <span className="hidden h-16 w-px shrink-0 bg-moss md:block" />
          <div className="flex flex-col gap-1">
            <h4 className="font-body text-2xl uppercase tracking-wide text-moss sm:text-3xl">
              {project.title}
            </h4>
            <p className="font-body text-lg text-moss sm:text-xl">{project.summary}</p>
            <p className="font-body text-sm uppercase tracking-wide text-moss-muted sm:text-base">
              {project.tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ")}
            </p>
          </div>
        </div>
        <p className="font-body text-base text-moss sm:text-xl">{project.description}</p>
      </div>
    </Link>
  );
}
