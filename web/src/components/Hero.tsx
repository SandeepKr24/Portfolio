import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">{hero.name}</h1>
      <p className="mt-4 text-lg text-muted">{hero.tagline}</p>
    </section>
  );
}
