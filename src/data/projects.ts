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
    summary: "An interactive game that highlights the archive to everyone with a spatial audio browsing experience.",
    tags: ["Concept", "Data Embedding"],
    cover: archiveDrift,
    image: archiveDriftImage,
    description: "Drawing on the serendipitous quality of the physical archive visit, \"Archive Drift\" is a spatial, game-like digital experience that maps audio entries into an interactive environment. ",
    overview: "Project overview placeholder — replace with the real brief for Archive Drift.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "this-to-me",
    title: "This, To me...",
    summary: "A museum exploration tookit that encourages explorations and reflections.",
    tags: ["User Research", "Concept", "Prototype"],
    cover: thisToMe,
    image: thisToMeImage,
    description: "The toolkit aims to encourages non-expert visitors to slow down, notice details, and reflect on the significance of an artwork. By providing a “cue”, it gives visitor a starting point, a scaffold, lowering the psychological pressure of interpreting.",
    overview: "Project overview placeholder — replace with the real brief for This, To me...",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "learn-and-record",
    title: "Learn and Record",
    summary: "A language learning APP powered by LLM that integrates Mandarin learning with daily life.",
    tags: ["User Research", "UI/UX", "LLM"],
    cover: learnAndRecord,
    image: learnAndRecordImage,
    description: "Mandarin learners are facing difficulty trying to apply classroom Chinese to real life. By providing learning material tailored to each student\’s need, L&R help students learn Chinese that fits seamlessly into their daily life.",
    overview: "Project overview placeholder — replace with the real brief for Learn and Record.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "bancall",
    title: "Bancall",
    summary: "A bench that brings vitality to a newly established neighborhood through movement.",
    tags: ["Concept", "Modeling", "Animation & Rendering"],
    cover: bancall,
    image: bancallImage,
    description: "Inspired by The Seine, the interactive bench mimics the movement of floating through its spherical bottom, providing an unbalanced feeling to whoever sits on it. This simple movement will provoke fun and vitality, and also bring the citizens of Vitry together. As people sit on the bench, their interactions will ripple through each other, just like waves in water.",
    overview: "Project overview placeholder — replace with the real brief for Bancall.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "barista",
    title: "Barista",
    summary: "A smart coffee scale that aids beginners while balancing guidance and autonomy.",
    tags: ["Concept", "Prototype", "User Research"],
    cover: barista,
    image: baristaImage,
    description: "Barista is an intelligent guided pour-over coffee scale, providing a process-oriented and systematic hand-brewing coffee experience, so that novices or those who are eager to experiment with different types and flavors of coffee can operate it with ease and enjoy high-quality coffee. By using audio and visual cues instead of traditional digital cues, Barista enables users to understand the coffee brewing process more intuitively.",
    overview: "Project overview placeholder — replace with the real brief for Barista.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
  {
    slug: "stampuzzle",
    title: "StamPuzzle",
    summary: "A creative tool designed to reduce fear of messing up when painting for children who lack confidence.",
    tags: ["Concept", "Prototype", "User Research"],
    cover: stampuzzle,
    image: stampuzzleImage,
    description: "StamPuzzle is a guided creative tool that provides space for \"trial and error\". It combines the advantages of block puzzles and stamps, aiming to provide a new, yet cognitive way of creation for children. Its ease of use can reduce the child's \"fear\" of painting due to a lack of confidence, courage, and skill to draw.",
    overview: "Project overview placeholder — replace with the real brief for StamPuzzle.",
    challenge: "Design challenge placeholder — what problem was this project solving?",
    research: "Research process placeholder — methods, interviews, or references used.",
    development: "Design development placeholder — iterations, prototypes, key decisions.",
    outcome: "Final outcome placeholder — the shipped result and its impact.",
  },
];
