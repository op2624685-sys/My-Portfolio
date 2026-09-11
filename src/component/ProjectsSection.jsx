import ProjectCard from "./ProjectCard";

export default function ProjectsSection({ projects }) {
  return (
    <div className="w-full flex flex-col gap-0 relative">
      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} number={String(i + 1).padStart(2, "0")} />
      ))}
    </div>
  );
}
