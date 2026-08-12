import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Hero } from "@/components/Hero";
import { Hobbies } from "@/components/Hobbies";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Education />
        <Publications />
        <Projects />
        <Skills />
        <Hobbies />
        <Contact />
      </main>
    </>
  );
}
