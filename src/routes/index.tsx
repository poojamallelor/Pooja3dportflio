import { createFileRoute } from "@tanstack/react-router";

import EngineeringWorld from "../components/3d/EngineeringWorld";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import Navbar from "../components/Navbar";

import Hero from "../sections/Hero";
import About from "../sections/About";
import Stack from "../sections/Stack";
import Projects from "../sections/Projects";
import JavaLab from "../sections/JavaLab";
import ReactProjects from "../sections/ReactProjects";
import JavaScriptProjects from "../sections/JavaScriptProjects";
import Experience from "../sections/Experience";
import Achievements from "../sections/Achievements";
import Hackathons from "../sections/Hackathons";
import BeyondCode from "../sections/BeyondCode";
import InterviewMode from "../sections/InterviewMode";
import WhyHire from "../sections/WhyHire";
import DeveloperSystem from "../sections/DeveloperSystem";
import Contact from "../sections/Contact";
import FloatingAIAssistant from "../components/FloatingAIAssistant";

const title = "Pooja Mallelor — Java Full Stack Developer Portfolio";
const description =
  "Portfolio of Pooja Parshuram Mallelor, a Java Full Stack Developer from Solapur, India building with React, Java, Spring Boot, REST APIs and MySQL.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Pooja Parshuram Mallelor",
          jobTitle: "Java Full Stack Developer",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Solapur",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
          email: "mailto:poojamallelor@gmail.com",
          sameAs: [
            "https://www.linkedin.com/in/poojamallelor",
            "https://github.com/poojamallelor",
          ],
          knowsAbout: ["Java", "Spring Boot", "React.js", "REST APIs", "MySQL"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <EngineeringWorld />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <JavaLab />
        <ReactProjects />
        <JavaScriptProjects />
        <Experience />
        <Achievements />
        <Hackathons />
        <BeyondCode />
        <InterviewMode />
        <WhyHire />
        <DeveloperSystem />
        <Contact />
      </main>
      <FloatingAIAssistant />
    </div>
  );
}
