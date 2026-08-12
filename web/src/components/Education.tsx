import { Section } from "@/components/Section";
import { education } from "@/content/site";

export function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="space-y-6">
        {education.map((entry) => (
          <li
            key={entry.degree}
            className="flex flex-col gap-1 border-b border-border pb-6 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <div>
              <p className="font-medium">{entry.degree}</p>
              <p className="text-muted">{entry.school}</p>
            </div>
            <div className="text-sm text-muted sm:text-right">
              <p>{entry.period}</p>
              <p>{entry.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
