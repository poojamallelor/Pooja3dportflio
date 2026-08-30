import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { reactProjects } from "../data/projects";
import ProjectShowcaseInteractive from "../components/ProjectShowcaseInteractive";

export default function ReactProjects() {
  return (
    <Section id="react-projects" className="relative overflow-hidden">
      {/* Background ambient effects representing AI + FRONTEND PRODUCT LAB */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-40 size-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(0, 200, 255, 0.3) 0%, transparent 70%)" }}
      />
      
      <div className="relative z-10">
        <SectionHeading
          index="05"
          kicker="AI + FRONTEND LAB"
          title="React.js Projects"
          description="Interactive products and AI-powered experiences built with React.js."
        />

        <ProjectShowcaseInteractive projects={reactProjects} theme="react" />
      </div>
    </Section>
  );
}
