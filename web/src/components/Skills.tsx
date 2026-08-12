import { Section } from "@/components/Section";
import { skills } from "@/content/site";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <p className="mb-3 text-sm font-medium">{group.category}</p>
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
