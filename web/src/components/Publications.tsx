import { Section } from "@/components/Section";
import { publications } from "@/content/site";

export function Publications() {
  return (
    <Section id="publications" title="Publications">
      <ul className="space-y-6">
        {publications.map((pub) => (
          <li key={pub.doi} className="border border-border p-6">
            <p className="font-medium">{pub.title}</p>
            <p className="mt-2 text-muted">{pub.description}</p>
            <a
              href={pub.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-accent hover:underline"
            >
              DOI: {pub.doi}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
