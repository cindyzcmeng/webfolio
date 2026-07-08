import { experience } from "../../data/experience";

export default function ExperienceList() {
  return (
    <section className="flex w-full flex-col items-start gap-12">
      <h3 className="font-heading text-2xl uppercase text-moss sm:text-3xl">Work Experience</h3>
      <div className="flex w-full flex-col gap-4">
        {experience.map((entry) => (
          <div key={entry.role} className="flex w-full flex-col gap-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-body text-xl font-extrabold text-moss sm:text-2xl">
                {entry.role}
              </span>
              <span className="font-body text-base uppercase text-moss sm:text-lg">
                {entry.dateRange}
              </span>
            </div>
            <p className="font-body text-base font-light text-moss sm:text-lg">
              {entry.organization}
            </p>
            {entry.notes.map((note) => (
              <div key={note} className="flex items-start gap-3 py-0.5">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                <p className="font-body text-base text-moss sm:text-lg">{note}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
