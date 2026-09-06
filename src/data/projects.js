// Central project data.
// To publish a link, fill in liveUrl / githubUrl. Empty strings hide the button.

export const fullStackProjects = [
  {
    id: "career-pilot",
    title: "CareerPilot AI",
    year: "2025–2026",
    technologies: ["React.js", "Spring Boot", "Artificial Intelligence"],
    description:
      "AI-powered career guidance and learning platform designed to help students improve their problem-solving, interview and communication skills through personalized recommendations.",
    image: "/projects/career-pilot.png",
    liveUrl: "https://career-pilot-ai-main-update.vercel.app/",
    githubUrl: "",
  },
  {
    id: "next-hire",
    title: "NextHire",
    year: "2026",
    technologies: ["React", "Java Spring Boot", "PostgreSQL", "Artificial Intelligence"],
    description:
      "AI-powered interview and group discussion preparation platform that helps students practice interviews, improve communication and receive AI-generated feedback.",
    image: "/projects/nexthire.png",
    liveUrl: "https://ai-interview-platform-taupe-one.vercel.app/",
    githubUrl: "https://github.com/poojamallelor/ai-interview-platform",
  },
  {
    id: "learning-disability",
    title: "Learning Disability Detection System",
    year: "2025",
    technologies: ["React.js", "Python", "Machine Learning"],
    description:
      "Machine-learning-based platform designed to analyze children's learning abilities and provide insights that can assist in the early identification of potential learning difficulties.",
    image: "/projects/learning-disability.png",
    liveUrl: "https://learning-disability-detection-dwhf.vercel.app/",
    githubUrl: "",
    achievementConnection: "Published Research Paper — Learning Disability Detection System"
  },
];

export const javaProjects = [
  {
    id: "bank-management",
    title: "Bank Management System",
    category: "Spring Boot Backend",
    year: "2025",
    technologies: ["Java", "Spring Boot", "REST APIs", "JPA", "MySQL"],
    description:
      "A backend banking application developed using Spring Boot for managing banking-related data and operations. The project follows a layered architecture to keep business logic, database access, entities, DTOs, and mapping responsibilities organized.",
    features: [
      "Backend application development",
      "REST API architecture",
      "DTO-based data transfer",
      "Entity modeling",
      "Mapper layer",
      "Service-layer business logic",
      "Repository/database layer",
      "MySQL integration",
      "Layered backend architecture",
    ],
    architecture: [
      "Client",
      "Controller",
      "DTO",
      "Service",
      "Mapper",
      "Repository",
      "MySQL",
    ],
    githubUrl: "https://github.com/poojamallelor/bankapp",
  },
  {
    id: "employee-payroll",
    title: "Employee & Payroll Management System",
    category: "SPRING BOOT BACKEND",
    year: "2025",
    technologies: ["Java", "Spring Boot", "REST APIs", "Spring Data JPA", "MySQL"],
    description:
      "A backend application for managing employee records, payroll information, and salary structures. The system is organized using a layered architecture with Controllers, Services, Repositories, and Entities, providing REST APIs for employee and payroll-related operations.",
    features: [
      "Employee Management",
      "Payroll Management",
      "Salary Structure Management",
      "REST APIs",
      "Layered Architecture",
      "Controller Layer",
      "Service Layer",
      "Repository Layer",
      "Entity Layer",
      "Database Integration",
    ],
    architecture: ["Client", "REST Controller", "Service", "Repository", "MySQL"],
    githubUrl: "https://github.com/poojamallelor/Springboot",
  },
  {
    id: "servlet-login",
    title: "Servlet Login & Authentication System",
    category: "JAVA SERVLET + JDBC",
    year: "2025",
    technologies: ["Java", "Servlets", "JDBC", "MySQL", "HTML"],
    description:
      "A Java Servlet-based login application demonstrating server-side authentication and database connectivity using JDBC. The project focuses on understanding the fundamentals of Java web development, request handling, form processing, and database interaction.",
    features: [
      "User Login",
      "Servlet Request Handling",
      "Form Processing",
      "JDBC Connectivity",
      "Database Interaction",
      "Server-side Validation",
      "Java Web Application Fundamentals",
    ],
    architecture: ["HTML Form", "Servlet", "JDBC", "MySQL"],
    githubUrl: "https://github.com/poojamallelor/servlet-loginpage",
  },
  {
    id: "admission-management",
    title: "Admission Management System",
    category: "CORE JAVA + JDBC",
    year: "2025",
    technologies: ["Core Java", "JDBC", "MySQL", "SQL"],
    description:
      "A Java and JDBC-based admission management application designed to manage student admission records through direct MySQL database operations. The project demonstrates practical implementation of JDBC connectivity, SQL queries, CRUD operations, and console-based application logic.",
    features: [
      "Student Admission Management",
      "MySQL Connectivity",
      "JDBC",
      "SQL Queries",
      "CRUD Operations",
      "Database Operations",
      "Java Business Logic",
    ],
    architecture: ["Java Application", "JDBC", "SQL Queries", "MySQL"],
    githubUrl: "https://github.com/poojamallelor/AddmissionManagementSystem",
  },
];

export const reactProjects = [
  {
    id: "rag-multi-model",
    title: "RAG-Based Multi-Model System",
    category: "React.js / AI / RAG",
    year: "2026",
    technologies: ["React.js", "Python", "Machine Learning", "NLP", "RAG Architecture"],
    description:
      "A multi-model AI system based on Retrieval-Augmented Generation (RAG), designed to provide intelligent and context-aware responses by combining retrieved knowledge with multiple AI models.",
    image: "/projects/multi-expert.png",
    flow: ["USER", "REACT INTERFACE", "RETRIEVAL", "KNOWLEDGE", "MULTIPLE AI MODELS", "CONTEXT-AWARE RESPONSE"],
    liveUrl: "https://multi-expert-ai-main2.poojamallelor.workers.dev/",
    githubUrl: "",
  },
  {
    id: "mid-ai",
    title: "Mid AI",
    category: "React.js / AI",
    year: "2025",
    technologies: ["React.js", "JavaScript", "AI"],
    description:
      "An interactive AI-focused web application built with React.js, designed around an engaging user experience and AI-powered functionality.",
    image: "/projects/mid-ai.png",
    liveUrl: "https://mid-main-khks.vercel.app/",
    githubUrl: "",
  },

  {
    id: "transform-ur-health",
    title: "Transform Ur Health",
    category: "React.js / Health Technology / GDG",
    year: "2025",
    badge: "GDG PROJECT",
    technologies: ["React.js", "JavaScript", "Web Technologies"],
    description:
      "A health-focused web project developed through the GDG ecosystem, combining an interactive frontend experience with a focus on improving the digital health experience.",
    image: "/projects/symptom-story.png",
    liveUrl: "https://transform-your-health-story.poojamallelor.workers.dev",
    githubUrl: "",
  },
];

export const javascriptProjects = [
  {
    id: "weather-app",
    title: "Weather App",
    category: "JavaScript / API Integration",
    year: "2025",
    technologies: ["HTML", "CSS", "JavaScript", "Weather API"],
    description:
      "A responsive weather application that uses JavaScript and weather API integration to provide users with weather information through a clean and interactive interface.",
    highlights: ["JavaScript", "API integration", "Dynamic data rendering", "Responsive UI", "Asynchronous requests"],
    flow: ["LOCATION", "WEATHER API", "JAVASCRIPT", "LIVE WEATHER DATA"],
    image: "/projects/weather-app.png",
    liveUrl: "https://poojamallelor.github.io/weatherapp/",
    githubUrl: "",
  },
  {
    id: "text-to-voice",
    title: "Text-to-Voice",
    category: "JavaScript / Web API",
    year: "2025",
    technologies: ["HTML", "CSS", "JavaScript", "Web Speech API"],
    description:
      "A browser-based text-to-voice application that converts written text into spoken output using JavaScript and browser speech capabilities.",
    highlights: ["JavaScript", "Web Speech API", "Text processing", "Voice interaction", "Interactive UI"],
    flow: ["TEXT", "JAVASCRIPT", "SPEECH API", "VOICE"],
    image: "/projects/text-to-voice.png",
    liveUrl: "https://poojamallelor.github.io/text-to-voice/",
    githubUrl: "",
  },
  {
    id: "senior-comfort-travel",
    title: "Senior Comfort Travel",
    category: "JavaScript / Web Application",
    year: "2025",
    technologies: ["HTML", "CSS", "JavaScript", "Google Maps API"],
    description:
      "A web-based travel platform designed to simplify travel planning for senior citizens by providing a more convenient and accessible travel experience.",
    highlights: ["JavaScript", "Google Maps API", "Travel planning", "Map-based services", "Responsive web interface"],
    flow: ["TRAVEL PLANNING", "MAPS", "HOTELS", "TRANSPORTATION", "NEARBY SERVICES"],
    image: "/projects/senior-travel.png",
    liveUrl: "https://poojamallelor.github.io/senior-citizen-app/",
    githubUrl: "",
  },
];

export const otherProjects = [
  {
    id: "women-safety",
    title: "Women Safety Android Application",
    year: "2025",
    technologies: [
      "Java",
      "Android Studio",
      "Google Maps API",
      "GPS",
      "SMS Manager",
    ],
    description:
      "An Android-based women safety application designed to provide emergency assistance through live location tracking and SOS alerts. The app enables users to send their real-time location via SMS to emergency contacts and includes quick-access safety features for immediate response.",
    image: "",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "omni-ai",
    title: "Omni AI Chat Bot",
    year: "2025",
    technologies: ["React.js", "Tailwind CSS", "LLM Integration"],
    description:
      "A conversational AI chatbot featuring instant replies, chat history sync, and custom personality prompt injections for a personalized user experience.",
    image: "/projects/omniai.png",
    liveUrl: "",
    githubUrl: "",
  },
];
