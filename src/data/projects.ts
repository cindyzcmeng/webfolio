import type { Project } from "../types/project";

import archiveDrift from "../assets/pebbles/archive-drift.png";
import thisToMe from "../assets/pebbles/this-to-me.png";
import learnAndRecord from "../assets/pebbles/learn-and-record.png";
import bancall from "../assets/pebbles/bancall.png";
import barista from "../assets/pebbles/barista.png";
import stampuzzle from "../assets/pebbles/stampuzzle.png";

import archiveDriftImage from "../assets/originals/archive-drift.jpg";
import thisToMeImage from "../assets/originals/this-to-me.jpg";
import learnAndRecordImage from "../assets/originals/learn-and-record.jpg";
import bancallImage from "../assets/originals/bancall.jpg";
import baristaImage from "../assets/originals/barista.jpg";
import stampuzzleImage from "../assets/originals/stampuzzle.jpg";

const placeholderSummary =
  "A paragraph briefly introducing the project. Including type of project, for example, interactive media, or mobile application. The text should clearly explain the design goal of this project, i.e. its intended effect, the design brief, and the result.";

export const projects: Project[] = [
  {
    slug: "archive-drift",
    title: "Archive Drift",
    summary: "A bench that brings joy and community to the city through movements.",
    tags: ["Concept", "Modeling", "Animation & Rendering"],
    cover: archiveDrift,
    image: archiveDriftImage,
    description: placeholderSummary,
    overview: "Project overview placeholder — replace with the real brief for Archive Drift.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "this-to-me",
    title: "This, To me...",
    summary: "A bench that brings joy and community to the city through movements.",
    tags: ["Concept", "Modeling", "Animation & Rendering"],
    cover: thisToMe,
    image: thisToMeImage,
    description: placeholderSummary,
    overview: "Project overview placeholder — replace with the real brief for This, To me...",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "learn-and-record",
    title: "Learn and Record",
    summary: "A bench that brings joy and community to the city through movements.",
    tags: ["Concept", "Modeling", "Animation & Rendering"],
    cover: learnAndRecord,
    image: learnAndRecordImage,
    description: placeholderSummary,
    overview: "Project overview placeholder — replace with the real brief for Learn and Record.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "bancall",
    title: "Bancall",
    summary: "A bench that brings joy and community to the city through movements.",
    tags: ["Concept", "Modeling", "Animation & Rendering"],
    cover: bancall,
    image: bancallImage,
    description: placeholderSummary,
    overview: "Project overview placeholder — replace with the real brief for Bancall.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "barista",
    title: "Barista",
    summary: "A bench that brings joy and community to the city through movements.",
    tags: ["Concept", "Modeling", "Animation & Rendering"],
    cover: barista,
    image: baristaImage,
    description: placeholderSummary,
    overview: "Project overview placeholder — replace with the real brief for Barista.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "stampuzzle",
    title: "StamPuzzle",
    summary: "A bench that brings joy and community to the city through movements.",
    tags: ["Concept", "Modeling", "Animation & Rendering"],
    cover: stampuzzle,
    image: stampuzzleImage,
    description: placeholderSummary,
    overview: "Project overview placeholder — replace with the real brief for StamPuzzle.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
];
