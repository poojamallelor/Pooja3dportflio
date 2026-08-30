// Technology universe data. `visual` drives the 3D activation mode.

export const skillCategories = [
  {
    id: "programming",
    label: "PROGRAMMING",
    accent: "violet",
    skills: [
      { name: "C", visual: "core" },
      { name: "Java", visual: "java" },
    ],
  },
  {
    id: "core",
    label: "CORE",
    accent: "coral",
    skills: [
      { name: "Object-Oriented Programming", visual: "core" },
      { name: "Data Structures & Algorithms", visual: "core" },
      { name: "DBMS", visual: "database" },
    ],
  },
  {
    id: "backend",
    label: "BACKEND",
    accent: "amber",
    skills: [
      { name: "Spring Boot", visual: "backend" },
      { name: "JDBC", visual: "jdbc" },
      { name: "REST API", visual: "api" },
      { name: "Servlets", visual: "backend" },
    ],
  },
  {
    id: "frontend",
    label: "FRONTEND",
    accent: "magenta",
    skills: [
      { name: "HTML", visual: "frontend" },
      { name: "CSS", visual: "frontend" },
      { name: "Tailwind CSS", visual: "frontend" },
      { name: "Bootstrap", visual: "frontend" },
      { name: "JavaScript", visual: "frontend" },
      { name: "React.js", visual: "frontend" },
      { name: "Next.js", visual: "frontend" },
    ],
  },
  {
    id: "database",
    label: "DATABASE",
    accent: "violet",
    skills: [{ name: "MySQL", visual: "database" }],
  },
  {
    id: "tools",
    label: "TOOLS",
    accent: "coral",
    skills: [
      { name: "VS Code", visual: "core" },
      { name: "Eclipse", visual: "core" },
      { name: "Android Studio", visual: "core" },
      { name: "GitHub", visual: "core" },
      { name: "MySQL Workbench", visual: "database" },
    ],
  },
];

export const visualNotes = {
  java: "Java node activates the language core of the ecosystem.",
  backend: "Backend service layer and application architecture activate.",
  api: "Request and response flow animates between client and service.",
  jdbc: "Java-to-database connection channel activates.",
  database: "Relational storage rings and table structures activate.",
  frontend: "Frontend rendering layer and component surfaces activate.",
  core: "Core computer-science foundation lattice activates.",
};
