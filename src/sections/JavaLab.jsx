import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { javaProjects } from "../data/projects";
import JavaProjectInteractive from "../components/JavaProjectInteractive";

/**
 * JavaLab.jsx
 * Core Java build log plus the featured RAG research system.
 */
export default function JavaLab() {
  return (
    <Section id="java-lab">
      <SectionHeading
        index="04"
        kicker="Java"
        title="Java Backend Projects"
        description="Console and desktop-style backend systems written in Java."
      />

      <JavaProjectInteractive projects={javaProjects} />


    </Section>
  );
}
