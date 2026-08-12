import { Section } from "@/components/Section";
import { hobbies } from "@/content/site";

export function Hobbies() {
  const [before, after] = hobbies.paragraph.split(hobbies.instagramHandle);

  return (
    <Section id="hobbies" title="Hobbies">
      <p className="leading-relaxed text-muted">
        {before}
        <a
          href={hobbies.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          {hobbies.instagramHandle}
        </a>
        {after}
      </p>
    </Section>
  );
}
