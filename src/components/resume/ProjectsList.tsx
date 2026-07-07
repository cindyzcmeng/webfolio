import { projects } from "../../data/projects";
import ProjectRow from "./ProjectRow";

export default function ProjectsList() {
  return (
    <section className="flex w-full flex-col items-start gap-8">
      <h3 className="font-heading text-3xl uppercase text-moss sm:text-4xl md:text-5xl">
        Projects
      </h3>
      <div className="flex w-full flex-col">
        {projects.map((project, i) => (
          <div key={project.slug}>
            <ProjectRow project={project} reverse={i % 2 === 1} />
            {i < projects.length - 1 && (
              <div className="my-2 w-full border-t-2 border-dotted border-moss-muted" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
