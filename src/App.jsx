import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import About from "./pages/About";

import AnimatedBackground from "./component/AnimatedBackground";

const App = () => {
  return (
    <Router>
      {/* Full‑screen container – background sits behind the routed pages */}
      <div className="min-h-screen relative">
        <AnimatedBackground />                     {/* ← single background component */}
        <div className="relative z-10">              {/* ← content stays on top */}
          <Routes>
            <Route path="/My-Portfolio" element={<Index />} />
            <Route path="/My-Portfolio/skills" element={<Skills />} />
            <Route path="My-Portfolio/projects" element={<Projects />} />
            <Route path="My-Portfolio/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
