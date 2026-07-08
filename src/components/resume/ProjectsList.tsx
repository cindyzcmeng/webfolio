import { projects } from "../../data/projects";
import ProjectRow from "./ProjectRow";

export default function ProjectsList() {
  return (
    <section className="flex w-full flex-col items-start gap-16">
      <h3 className="font-heading text-3xl uppercase text-moss sm:text-4xl md:text-5xl">
        Projects
      </h3>
      <div className="flex w-full flex-col">
        {projects.map((project, i) => (
          <div key={project.slug}>
            <ProjectRow project={project} reverse={i % 2 === 1} />
            {i < projects.length - 1 && (
              <div className="mx-auto my-12 h-[4px] w-3/5 max-w-3xl"
                  style={{
                    backgroundImage: `radial-gradient(circle, var(--color-moss) 2px, transparent 2px)`,
                    backgroundSize: '16px 4px', // 12px 决定了点与点之间的间距（更接近图中的稀疏感）
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: 'center',
                  }}
                />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
