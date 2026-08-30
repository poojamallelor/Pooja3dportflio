import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FrontendProjectInteractive({ projects, theme = "react" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  
  const activeProject = projects[activeIndex];
  
  // Theme styling mapping
  const colors = {
    react: {
      accent: "text-cyan",
      bgHover: "hover:bg-cyan/10",
      borderActive: "border-cyan/30",
      bgActive: "bg-cyan/5",
      shadowGlow: "rgba(0, 255, 255, 0.2)",
      gradient: "from-cyan/20 to-transparent",
    },
    javascript: {
      accent: "text-amber",
      bgHover: "hover:bg-amber/10",
      borderActive: "border-amber/30",
      bgActive: "bg-amber/5",
      shadowGlow: "rgba(255, 191, 0, 0.2)",
      gradient: "from-amber/20 to-transparent",
    }
  };
  
  const currentTheme = colors[theme] || colors.react;

  return (
    <div ref={containerRef} className="relative mt-16 w-full max-w-[1400px] mx-auto min-h-[600px]">
      <div className="flex flex-col lg:grid lg:grid-cols-[80px_1fr_400px] gap-8 xl:gap-16 items-start">
        
        {/* LEFT PANE: Navigation Selector */}
        <div className="flex overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0 gap-4 sticky top-32 z-20 hide-scrollbar w-full lg:w-auto">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => setActiveIndex(idx)}
                className={`group relative flex items-center justify-center lg:size-16 rounded-2xl p-4 lg:p-0 transition-all duration-300 ${
                  isActive 
                    ? `bg-surface-2 shadow-lg ${currentTheme.borderActive}` 
                    : "hover:bg-surface-2/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId={`active-indicator-${theme}`}
                    className={`absolute inset-0 rounded-2xl border ${currentTheme.borderActive} ${currentTheme.bgActive}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span 
                  className={`relative z-10 font-mono text-sm tracking-widest transition-colors ${
                    isActive ? currentTheme.accent : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="lg:hidden ml-3 relative z-10 text-sm font-medium whitespace-nowrap">
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* CENTER PANE: Large Cinematic Image Preview */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] perspective-1000 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, rotateX: 5, scale: 0.95 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: -5, scale: 0.95 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-surface-1 shadow-2xl preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
              
              {activeProject.image && (
                <motion.img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />
              )}

              {/* Hover overlay & Explore prompt */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-background/20 backdrop-blur-[2px]">
                {activeProject.liveUrl ? (
                  <a href={activeProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full bg-white/10 border border-white/20 px-6 py-3 font-mono text-sm tracking-widest text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/20 shadow-lg">
                    EXPLORE PROJECT
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                ) : (
                  <span className="flex items-center gap-3 rounded-full bg-black/40 border border-white/10 px-6 py-3 font-mono text-sm tracking-widest text-white backdrop-blur-md">
                    DEMO UNAVAILABLE
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT PANE: Project Information */}
        <div className="relative w-full flex flex-col justify-center lg:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground border border-white/10 px-2 py-1 rounded-md">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className={`mono-label ${currentTheme.accent}`}>
                  {activeProject.category}
                </span>
                {activeProject.badge && (
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] tracking-widest text-white">
                    {activeProject.badge}
                  </span>
                )}
              </div>
              
              <h3 className="font-display text-4xl leading-tight md:text-5xl text-foreground drop-shadow-sm">
                {activeProject.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-muted-foreground">
                {activeProject.description}
              </p>
              
              {activeProject.highlights && (
                <div className="mt-2 space-y-2">
                  <h4 className="font-mono text-[11px] tracking-widest text-foreground uppercase">Key Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProject.highlights.map((highlight, i) => (
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        key={i}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <div className={`size-1.5 rounded-full bg-current ${currentTheme.accent}`} />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {activeProject.technologies.map((t, i) => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground shadow-sm"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* Custom Flow Visualization */}
              {activeProject.flow && (
                <div className="mt-4 rounded-xl border border-white/5 bg-surface-2/30 p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                    {activeProject.flow.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-white/80">{item}</span>
                        {i < activeProject.flow.length - 1 && (
                          <span className={currentTheme.accent}>→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-4">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative overflow-hidden rounded-full bg-white px-6 py-3 font-mono text-xs tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 font-bold">LIVE DEMO →</span>
                    <div className="absolute inset-0 bg-black/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  </a>
                )}
                
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 font-mono text-xs tracking-widest text-foreground transition-all hover:bg-white/5 hover:border-white/40"
                  >
                    VIEW GITHUB →
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}} />
    </div>
  );
}
