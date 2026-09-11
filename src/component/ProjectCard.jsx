import { Circle } from "lucide-react";
import LivePreview from "./LivePreview";

function ProjectCard({ project, number }) {
  return (
    <section
      className="shrink-0 w-full flex items-center justify-center px-4 sm:px-8 sticky top-[10vh] mb-[-15vh]"
    >
      <div className="relative w-full max-w-screen-2xl min-h-[75vh] rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 sm:p-8 overflow-hidden flex flex-col">
        <div className="relative flex items-start justify-between mb-4 shrink-0">
          <div className="flex items-start gap-3">
            <span className="text-5xl sm:text-6xl font-bold text-white/15 leading-none">
              {number}
            </span>
            <div className="pt-1">
              <p className="text-[11px] tracking-wide text-red-400/80 mb-1">{project.category}</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">{project.title}</h3>
            </div>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 shrink-0 rounded-full border border-red-500/40 text-red-400 text-xs font-bold px-4 py-2 hover:bg-red-500/10 transition-colors uppercase tracking-wider"
          >
            <Circle size={8} className="fill-red-500 text-red-500 animate-pulse" />
            LIVE PROJECT
          </a>
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
