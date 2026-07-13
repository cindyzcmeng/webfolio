import { Routes, Route, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BancallDetailPage from "./pages/BancallDetailPage";
import ThemedProjectDetailPage from "./pages/ThemedProjectDetailPage";

const THEMED_PROJECT_SLUGS = ["this-to-me", "archive-drift", "learn-and-record", "barista", "stampuzzle"];

type LocationState = {
  backgroundLocation?: Location;
};

export default function App() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<Home overlayOpen={Boolean(backgroundLocation)} />} />
        <Route path="/projects/bancall" element={<BancallDetailPage />} />
        {THEMED_PROJECT_SLUGS.map((slug) => (
          <Route key={slug} path={`/projects/${slug}`} element={<ThemedProjectDetailPage slug={slug} />} />
        ))}
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/projects/bancall" element={<BancallDetailPage overlay />} />
          {THEMED_PROJECT_SLUGS.map((slug) => (
            <Route key={slug} path={`/projects/${slug}`} element={<ThemedProjectDetailPage slug={slug} overlay />} />
          ))}
          <Route path="/projects/:slug" element={<ProjectDetailPage overlay />} />
        </Routes>
      )}
    </>
  );
}
