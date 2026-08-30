import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { fullStackProjects } from "../data/projects";
import ProjectShowcaseInteractive from "../components/ProjectShowcaseInteractive";

export default function Projects() {
  return (
    <Section id="projects" className="relative overflow-hidden">
      {/* Background ambient effects representing FULL STACK LAB */}
      <div
        className="pointer-events-none absolute -left-20 top-40 size-[500px] rounded-full opacity-10 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-20 size-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 70%)" }}
      />
      
      <div className="relative z-10">
        <SectionHeading
          index="03"
          kicker="FULL STACK LAB"
          title="Full Stack Projects"
          description="Applications where I owned the interface, the API layer and the data model."
        />

        <ProjectShowcaseInteractive projects={fullStackProjects} theme="fullstack" />
      </div>
    </Section>
  );
}
