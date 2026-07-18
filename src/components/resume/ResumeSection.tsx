import { motion } from "framer-motion";
import AboutMe from "./AboutMe";
import Contact from "./Contact";
import EducationList from "./EducationList";
import ExperienceList from "./ExperienceList";
import ProjectsList from "./ProjectsList";
import { RESUME_TRANSITION_DURATION_MS } from "../../lib/motion";

type ResumeSectionProps = {
  expanded: boolean;
};

export default function ResumeSection({ expanded }: ResumeSectionProps) {
  return (
    <motion.div
      className="overflow-hidden"
      initial={false}
      animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
      transition={{ duration: RESUME_TRANSITION_DURATION_MS / 1000, ease: "easeInOut" }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-6 pb-24 pt-8 sm:gap-32 sm:px-10">
        <div className="flex flex-col gap-16 sm:gap-24">
          <AboutMe />
          <EducationList />
          <ExperienceList />
        </div>
        <ProjectsList />
        <Contact />
      </div>
    </motion.div>
  );
}
