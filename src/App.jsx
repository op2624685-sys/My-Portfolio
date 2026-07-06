import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen relative" style={{ background: 'var(--bg-base)' }}>
        <div className="relative z-10">
          {/* All routes render the same single-page Index.
              The page reads the path and scrolls to the matching section. */}
          <Routes>
            <Route path="/My-Portfolio" element={<Index />} />
            <Route path="/My-Portfolio/skills" element={<Index />} />
            <Route path="/My-Portfolio/projects" element={<Index />} />
            <Route path="/My-Portfolio/about" element={<Index />} />
            <Route path="/My-Portfolio/contact" element={<Index />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
