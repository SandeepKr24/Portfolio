import { Section } from "@/components/Section";
import { about } from "@/content/site";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-4 text-base leading-relaxed">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
