export type ProjectTheme = {
  accent: string;
  mute: string;
  ink: string;
  titleColor: string;
  /** Tagline under the title — usually the same as titleColor. */
  taglineColor: string;
  /** Highlighter-style background behind the title (stampuzzle only). */
  titleHighlight?: string;
  titleFontClass: string;
  bodyFontClass: string;
  imageAspectRatio: string;
};

export const projectThemes: Record<string, ProjectTheme> = {
  "this-to-me": {
    accent: "#1E3F66",
    mute: "#918F88",
    ink: "#7C8B9E",
    titleColor: "#1E3F66",
    taglineColor: "#1E3F66",
    titleFontClass: "font-gotham-rounded",
    bodyFontClass: "font-century-gothic",
    imageAspectRatio: "2 / 1",
  },
  "archive-drift": {
    accent: "#108834",
    mute: "#757575",
    ink: "#000000",
    titleColor: "#108834",
    taglineColor: "#108834",
    titleFontClass: "font-source-code-pro font-bold",
    bodyFontClass: "font-source-code-pro",
    imageAspectRatio: "2 / 1",
  },
  "learn-and-record": {
    accent: "#3498DB",
    mute: "#CCCCCC",
    ink: "#121212",
    titleColor: "#3498DB",
    taglineColor: "#3498DB",
    titleFontClass: "font-outfit font-bold",
    bodyFontClass: "font-outfit",
    imageAspectRatio: "4320 / 1526",
  },
  barista: {
    // ACCENT is reserved for future use highlighting words within body copy —
    // the title and tagline use TITLE instead.
    accent: "#D67217",
    mute: "#A1A1A1",
    ink: "#332117",
    titleColor: "#7F3C17",
    taglineColor: "#7F3C17",
    titleFontClass: "font-eb-garamond font-bold",
    bodyFontClass: "font-eb-garamond",
    imageAspectRatio: "4320 / 1526",
  },
  stampuzzle: {
    // ACCENT is the highlighter background behind the title, not a text color.
    accent: "#FCE300",
    mute: "#949494",
    ink: "#000000",
    titleColor: "#000000",
    taglineColor: "#000000",
    titleHighlight: "#FCE300",
    titleFontClass: "font-avenir-rounded font-bold",
    bodyFontClass: "font-avenir-rounded",
    imageAspectRatio: "4320 / 1526",
  },
};
