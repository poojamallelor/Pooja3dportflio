import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CaseStudyModal from "./CaseStudyModal";

export default function JavaProjectInteractive({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeProject = projects[activeIndex];

  return (
    <div className="relative mt-16 w-full max-w-7xl mx-auto">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr_1.5fr] items-start">
        
        {/* LEFT PANE: Navigation Selector */}
        <div className="flex overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0 gap-4 sticky top-32 z-10 hide-scrollbar">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => setActiveIndex(idx)}
                className={`group relative flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${
                  isActive 
                    ? "bg-surface-2 shadow-lg" 
                    : "hover:bg-surface-2/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 rounded-2xl border border-magenta/30 bg-magenta/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span 
                  className={`relative z-10 font-mono text-sm tracking-widest transition-colors ${
                    isActive ? "text-magenta" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span 
                  className={`relative z-10 hidden md:block whitespace-nowrap text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {project.title.length > 25 ? project.title.substring(0, 22) + "..." : project.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* CENTER PANE: Project Information */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="mono-label text-magenta">
                  {activeProject.category}
                </span>
                <span className="mono-label">{activeProject.year}</span>
              </div>
              
              <h3 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl text-foreground drop-shadow-sm">
                {activeProject.title}
              </h3>
              
              <p className="text-base leading-relaxed text-muted-foreground max-w-xl">
                {activeProject.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {activeProject.technologies.map((t, i) => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground shadow-sm"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative overflow-hidden rounded-full bg-magenta px-8 py-3.5 font-mono text-xs tracking-widest text-white transition-transform hover:scale-105 active:scale-95"
                  style={{ boxShadow: "0 0 20px rgba(255, 0, 255, 0.2)" }}
                >
                  <span className="relative z-10">EXPLORE PROJECT</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                </button>
                
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-3.5 font-mono text-xs tracking-widest text-foreground transition-all hover:bg-white/5 hover:border-white/40"
                  >
                    VIEW SOURCE CODE
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT PANE: Architecture Visualization */}
        <div className="hidden lg:block relative h-full min-h-[400px]">
          <div className="sticky top-32 rounded-3xl border border-white/10 bg-surface-1 p-8 shadow-2xl overflow-hidden">
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-30 blur-[80px] transition-opacity duration-700"
              style={{ background: "var(--gradient-aurora)" }}
            />
            
            <h4 className="mono-label text-muted-foreground mb-8 text-center">Architecture Flow</h4>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center gap-3 relative z-10"
              >
                {activeProject.architecture && activeProject.architecture.map((layer, i) => (
                  <div key={layer} className="flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                      className="rounded-lg border border-magenta/20 bg-magenta/5 px-6 py-3 font-mono text-xs tracking-widest text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-magenta/50 hover:bg-magenta/10 cursor-default"
                    >
                      {layer}
                    </motion.div>
                    
                    {i < activeProject.architecture.length - 1 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 24, opacity: 1 }}
                        transition={{ delay: 0.1 + (i * 0.15), duration: 0.3 }}
                        className="w-px bg-gradient-to-b from-magenta/50 to-transparent my-1"
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <CaseStudyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={activeProject} 
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
