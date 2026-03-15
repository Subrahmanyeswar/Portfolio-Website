import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import Section from "@/components/Section/Section";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";
import Achievements from "@/components/Achievements/Achievements";
import Education from "@/components/Education/Education";
import Contact from "@/components/Contact/Contact";

const Terminal = dynamic(() => import("@/components/Terminal/Terminal"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-[#0F0F0E] animate-pulse rounded-lg" />
});

export default function Home() {
  return (
    <main>
      <Hero />
      
      <Section id="about">
        <About />
      </Section>

      <Section id="experience">
        <Experience />
      </Section>

      <Section id="skills" className="bg-white">
        <Skills />
      </Section>
      
      <Section id="projects">
        <Projects />
      </Section>

      <Section id="achievements" className="bg-white">
        <Achievements />
      </Section>

      <Section id="education">
        <Education />
      </Section>

      <Section id="terminal" className="bg-white">
        <Terminal />
      </Section>
      
      <Contact />
    </main>
  );
}
