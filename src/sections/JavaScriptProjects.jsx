import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { javascriptProjects } from "../data/projects";
import ProjectShowcaseInteractive from "../components/ProjectShowcaseInteractive";

export default function JavaScriptProjects() {
  return (
    <Section id="javascript-projects" className="relative overflow-hidden">
      {/* Background ambient effects representing WEB APPLICATION LAB */}
      <div
        className="pointer-events-none absolute -right-20 top-20 size-[400px] rounded-full opacity-15 blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(255, 191, 0, 0.4) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 size-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255, 150, 0, 0.3) 0%, transparent 70%)" }}
      />
      
      <div className="relative z-10">
        <SectionHeading
          index="06"
          kicker="WEB APPLICATION LAB"
          title="JavaScript Projects"
          description="Practical web applications built with JavaScript and modern browser APIs."
        />

        <ProjectShowcaseInteractive projects={javascriptProjects} theme="javascript" />
      </div>
    </Section>
  );
}
