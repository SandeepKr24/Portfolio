import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-8 text-sm font-medium tracking-widest text-muted uppercase">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
