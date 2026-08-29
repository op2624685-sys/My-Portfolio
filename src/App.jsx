import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";

const App = () => {
  return (
    <Router basename="/My-Portfolio">
      <div className="min-h-screen relative" style={{ background: 'var(--bg-base)' }}>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/skills" element={<Index />} />
            <Route path="/projects" element={<Index />} />
            <Route path="/about" element={<Index />} />
            <Route path="/contact" element={<Index />} />
            <Route path="*" element={<Index />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
