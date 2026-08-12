"use client";

import { useState } from "react";
import type { flagshipProjects } from "@/content/site";

export function ProjectCard({
  project,
}: {
  project: (typeof flagshipProjects)[number];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border p-6">
      <h3 className="font-medium">{project.name}</h3>
      <p className="mt-2 text-muted">{project.summary}</p>

      {expanded && <p className="mt-3 text-muted">{project.long}</p>}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-3 text-sm text-accent hover:underline"
      >
        {expanded ? "Show less" : "Read more"}
      </button>

      {project.status === "unavailable" && (
        <p className="mt-4 text-sm text-muted italic">
          Currently unavailable while I work on fixing unexpected problems.
        </p>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
        >
          View on GitHub
        </a>
      )}
    </div>
  );
}
