export type EducationEntry = {
  degree: string;
  dateRange: string;
  institution: string;
  notes: string[];
};

export const education: EducationEntry[] = [
  {
    degree: "MSc Design for Interaction",
    dateRange: "Sep 2025-Jul 2027 (Exp.)",
    institution: "Delft University of Technology, Delft, Netherlands",
    notes: ["Course: Human-Centered Design, Context Mapping, Research through Design"],
  },
  {
    degree: "BA Product Design",
    dateRange: "Sep 2021-Jul 2025",
    institution: "Tongji University, Shanghai, China",
    notes: [
      "GPA:4.82/5 (Ranked 3rd out of 50); Recipient of the Chinese Government Full Scholarship",
      "Course: Design Thinking, User Study, Interactive Technologies and Applications",
    ],
  },
  {
    degree: "Exchange student in Industrial Design",
    dateRange: "Sep 2023-Feb 2024",
    institution: "ENSCI - Les Ateliers, Paris, France",
    notes: ["Course: Research through Design, Technical Drawing, VR Design and Development"],
  },
];
