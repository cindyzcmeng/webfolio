import { Routes, Route, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BancallDetailPage from "./pages/BancallDetailPage";

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
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/projects/bancall" element={<BancallDetailPage overlay />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage overlay />} />
        </Routes>
      )}
    </>
  );
}
