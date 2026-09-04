import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Terminal from "../components/Terminal";
import AIAssistant from "../components/AIAssistant";
import SectionHeading from "../components/SectionHeading";

export default function DeveloperSystem() {
  const [activeMode, setActiveMode] = useState("terminal");

  return (
    <section id="dev-system" className="relative py-24 z-10 px-6 max-w-6xl mx-auto">
      <SectionHeading 
        title={activeMode === "terminal" ? "DEVELOPER TERMINAL" : "PORTFOLIO AI"} 
        subtitle={activeMode === "terminal" 
          ? "Explore my developer profile through the command line." 
          : "Ask anything about my skills, projects, experience and achievements."
        }
      />
      
      <div className="flex justify-center mb-8 relative z-20">
        <div className="flex bg-surface-2/50 p-1 rounded-full border border-border backdrop-blur-sm">
          <button
            onClick={() => setActiveMode("terminal")}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeMode === "terminal" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeMode === "terminal" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-violet/20 border border-violet/40 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">TERMINAL MODE</span>
          </button>
          <button
            onClick={() => setActiveMode("ai")}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeMode === "ai" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeMode === "ai" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-magenta/20 border border-magenta/40 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">AI MODE</span>
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {activeMode === "terminal" ? (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <Terminal />
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              className="h-[600px]"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <AIAssistant />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-violet/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
}
