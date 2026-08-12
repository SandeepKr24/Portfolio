"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    // A short final section's heading can be scrolled past the detection
    // band before the page runs out of room to scroll further, so it never
    // triggers the observer above. Fall back to activating the last section
    // once the user has scrolled to the bottom of the page.
    const lastId = nav[nav.length - 1].id;
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(lastId);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const linkClass = (id: string) =>
    active === id
      ? "text-accent"
      : "text-muted transition-colors hover:text-foreground";

  const contactItem = nav.find(({ id }) => id === "contact")!;
  const otherItems = nav.filter(({ id }) => id !== "contact");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-8 text-sm">

        <a href={`#${contactItem.id}`} className={linkClass(contactItem.id)}>
          {contactItem.label}
        </a>

        <a href="#" className="justify-self-center font-medium whitespace-nowrap">
          Sandeep Kumar
        </a>

        <ul className="flex justify-end gap-4">
          {otherItems.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={linkClass(id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
