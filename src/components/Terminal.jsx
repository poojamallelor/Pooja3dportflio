import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "../data/portfolio";

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: "output", text: `Welcome to POOJA.DEV Terminal.` },
    { type: "output", text: `Type "help" to see available commands.` }
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;
    
    setHistory(prev => [...prev, { type: "input", text: `> ${cmd}` }]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    let output = "";

    switch(trimmedCmd) {
      case "help":
        output = "Available commands: help, about, skills, stack, projects, experience, education, achievements, hackathons, contact, github, linkedin, clear, whoami";
        break;
      case "whoami":
        output = "Pooja Parshuram Mallelor\nJava Full Stack Developer\nReact.js • Java • Spring Boot • REST APIs • MySQL";
        break;
      case "about":
        output = profile.about || "Aspiring Software Developer passionate about building robust backend systems and modern frontend applications.";
        break;
      case "skills":
      case "stack":
        output = "Languages: C, Java\nCore: OOP, DSA, DBMS\nFrontend: HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, Bootstrap\nBackend: Java, Spring Boot, JDBC, REST APIs\nDatabase: MySQL\nTools: VS Code, Eclipse, Android Studio, GitHub, MySQL Workbench";
        break;
      case "projects":
        output = "Project Categories:\n- FULL STACK (Career Pilot, NextHire)\n- JAVA / BACKEND (Bank System, Payroll)\n- REACT / FRONTEND (RAG-Based AI, Mid AI)\n- JAVASCRIPT / FRONTEND (Weather App)";
        break;
      case "experience":
        output = "Java Developer Intern — Techno Stack (Feb 2025)\nProjects: Calculator, Bank Management System, Student Management System\n\nZensar Technologies (Feb 2026)\nCore Java, Adv Java, SQL, Python";
        break;
      case "education":
        output = "B.Tech Computer Science & Engineering\nN.K. Orchid College of Engineering & Technology, Solapur\n2023–Present | Expected graduation: 2027 | CGPA: 8.1";
        break;
      case "achievements":
        output = "- NPTEL Programming in Java — Silver Certificate (Top 1%, Score: 86%)\n- NPTEL DBMS — Elite Certificate (Score: 72%)\n- Filed a patent for Scheduler Project Idea\n- Published research paper on Learning Disability Detection System\n- HackerRank Java 5 Star";
        break;
      case "hackathons":
        output = "- Build and Beyond — 1st Prize, 2026\n- Hack-AI-thon — Special Recognition for Innovation\n- AGTechathon 1.0 — 24-hour National-Level Hackathon\n- Smart India Hackathon — participated twice";
        break;
      case "contact":
      case "linkedin":
      case "github":
        output = "Email: poojamallelor@gmail.com\nLinkedIn: https://linkedin.com/in/poojamallelor\nGitHub: https://github.com/poojamallelor";
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        output = `Command not found: ${cmd}\nTry: whoami`;
    }

    if (output) {
      setHistory(prev => [...prev, { type: "output", text: output }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div 
      className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-glow panel border-border backdrop-blur-md flex flex-col font-mono text-sm group"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center px-4 py-3 border-b border-border bg-background/50 backdrop-blur-sm z-10 relative">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="flex-1 text-center text-muted-foreground/80 text-xs tracking-wider">
          pooja@developer ~
        </div>
      </div>
      
      <div className="absolute inset-0 bg-background/90 opacity-95 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)] mix-blend-overlay" />
      
      <div ref={containerRef} className="flex-1 overflow-y-auto p-6 relative z-10 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {history.map((entry, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`whitespace-pre-wrap leading-relaxed ${entry.type === "input" ? "text-violet-400 font-semibold" : "text-foreground/90"}`}
            >
              {entry.text}
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="flex items-center mt-4">
          <span className="text-violet-400 font-bold mr-3">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-foreground/90 font-mono"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
