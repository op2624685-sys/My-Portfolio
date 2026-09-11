import { Circle, Github } from "lucide-react";
import LivePreview from "./LivePreview";

function ProjectCard({ project, number }) {
  return (
    <section
      className="shrink-0 w-full flex items-center justify-center px-4 sm:px-8 sticky top-[10vh] mb-[-15vh]"
    >
      <div className="relative w-full max-w-screen-2xl min-h-[75vh] rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 sm:p-8 overflow-hidden flex flex-col">
        <div className="relative flex items-start justify-between mb-4 shrink-0">
          <div className="flex items-start gap-3">
            <span className="text-5xl sm:text-6xl font-bold leading-none bg-gradient-to-b from-white/30 to-white/5 bg-clip-text text-transparent">
              {number}
            </span>
            <div className="pt-1">
              <p className="text-[11px] tracking-wide text-red-400/80 mb-1">{project.category}</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">{project.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              title="View Source Code"
            >
              <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 text-black font-black text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.2)] active:scale-95 border border-white/20"
            >
              <Circle size={10} className="fill-red-500 text-red-500 animate-pulse" />
              LIVE PROJECT
            </a>
          </div>
        </div>

        <p className="relative text-sm text-white/50 mb-4 shrink-0">{project.description}</p>

        {/* preview takes up remaining card space, since the card now fills the screen */}
        <div className="relative flex-1 min-h-0">
          <LivePreview url={project.liveUrl} title={project.title} />
        </div>
      </div>
    </section>
  );
}

export default ProjectCard;
