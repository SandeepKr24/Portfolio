import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { flagshipProjects, miniProjects } from "@/content/site";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="space-y-6">
        {flagshipProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {miniProjects.map((project) => (
          <div key={project.name} className="border border-border p-4">
            <p className="text-sm font-medium">{project.name}</p>
            <p className="mt-1 text-sm text-muted">{project.summary}</p>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-accent hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
