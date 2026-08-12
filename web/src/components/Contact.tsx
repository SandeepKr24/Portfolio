import { Section } from "@/components/Section";
import { contact } from "@/content/site";

const links = [
  { label: "Email", href: `mailto:${contact.email}` },
  { label: "LinkedIn", href: contact.linkedinUrl },
  { label: "GitHub", href: contact.githubUrl },
  { label: "Instagram", href: contact.instagramUrl },
];

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === "Email" ? undefined : "_blank"}
            rel={link.label === "Email" ? undefined : "noreferrer"}
            className="border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
