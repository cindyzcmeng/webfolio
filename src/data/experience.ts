export type ExperienceEntry = {
  role: string;
  dateRange: string;
  organization: string;
  notes: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Creative Design Intern",
    dateRange: "Mar 2024-Jul 2024",
    organization: "Asia Innovation Center, Shanghai, China",
    notes: [
      "Identified consumer needs in cross-functional brainstorm workshops with Kraft Heinz, and translated discussion outcomes into early design concept sketches",
      "Designed and produced visual deliverables that enhanced stakeholder communication",
    ],
  },
];
