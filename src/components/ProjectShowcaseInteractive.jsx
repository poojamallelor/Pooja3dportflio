import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectShowcaseInteractive({ projects, theme = "react" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const activeProject = projects[activeIndex];

  // Colors based on theme category
  const colors = {
    fullstack: {
      accent: "text-violet",
      bgHover: "hover:bg-violet/10",
      borderActive: "border-violet/30",
      bgActive: "bg-violet/5",
      gradient: "from-violet/20 to-transparent",
    },
    react: {
      accent: "text-cyan",
      bgHover: "hover:bg-cyan/10",
      borderActive: "border-cyan/30",
      bgActive: "bg-cyan/5",
      gradient: "from-cyan/20 to-transparent",
    },
    javascript: {
      accent: "text-amber",
      bgHover: "hover:bg-amber/10",
      borderActive: "border-amber/30",
      bgActive: "bg-amber/5",
      gradient: "from-amber/20 to-transparent",
    }
  };

  const currentTheme = colors[theme] || colors.react;

  return (
    <div ref={containerRef} className="relative mt-12 sm:mt-16 w-full max-w-[1400px] mx-auto min-h-[700px] xl:min-h-[600px]">
      {/* Desktop: 3 columns. Tablet: 2 columns (Nav | Content stacked). Mobile: fully stacked */}
      <div className="flex flex-col lg:grid lg:grid-cols-[60px_1fr] xl:grid-cols-[80px_1fr_400px] gap-8 xl:gap-16 items-start">
        
        {/* LEFT PANE: Navigation Selector */}
        <div className="flex overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0 gap-4 sticky top-32 z-20 hide-scrollbar w-full lg:w-auto">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => setActiveIndex(idx)}
                className={`group relative flex items-center justify-center shrink-0 w-16 h-16 lg:w-full lg:h-16 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? `bg-surface-2 shadow-lg ${currentTheme.borderActive}` 
                    : "hover:bg-surface-2/50 border border-transparent"
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
                {/* On mobile, show the title next to the number if active */}
                {isActive && (
                  <span className="lg:hidden ml-3 relative z-10 text-sm font-medium whitespace-nowrap pr-4">
                    {project.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Center content wrapper for Tablet layout grouping */}
        <div className="flex flex-col xl:contents gap-8 w-full">
          
          {/* CENTER PANE: Universal Image Frame */}
          <div className="relative w-full max-w-5xl mx-auto perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, rotateX: 3, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
                exit={{ opacity: 0, rotateX: -3, scale: 0.98, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="group relative w-full rounded-2xl xl:rounded-3xl border border-white/10 bg-surface-1 shadow-2xl overflow-hidden preserve-3d"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                }}
              >
                {/* Elegant background behind the image for varying aspect ratios */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-20`} />
                <div className="absolute inset-0 bg-white/[0.02]" />

                {/* THE CORE IMAGE WRAPPER (Strict 16/10) */}
                <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  {activeProject.image ? (
                    <motion.img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground font-mono text-sm">
                      [ IMAGE UNAVAILABLE ]
                    </div>
                  )}

                  {/* Light Reflection Effect */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full ease-in-out" style={{ transitionDuration: '1.5s' }} />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 bg-background/30 backdrop-blur-sm">
                    {activeProject.liveUrl ? (
                      <a href={activeProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full bg-white/10 border border-white/20 px-6 py-3 font-mono text-sm tracking-widest text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/20 hover:shadow-lg">
                        EXPLORE PROJECT
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </a>
                    ) : (
                      <span className="flex items-center gap-3 rounded-full bg-black/50 border border-white/10 px-6 py-3 font-mono text-sm tracking-widest text-white backdrop-blur-md">
                        NO DEMO AVAILABLE
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PANE: Project Information */}
          <div className="relative w-full flex flex-col justify-center xl:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-5 sm:gap-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] sm:text-xs tracking-widest text-muted-foreground border border-white/10 px-2 sm:px-3 py-1 rounded-md">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className={`mono-label ${currentTheme.accent} text-[10px] sm:text-xs`}>
                    {activeProject.category || "Full Stack"}
                  </span>
                  {(activeProject.badge || activeProject.year) && (
                    <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] tracking-widest text-white">
                      {activeProject.badge || activeProject.year}
                    </span>
                  )}
                </div>
                
                <h3 className="font-display text-3xl sm:text-4xl leading-tight md:text-5xl text-foreground drop-shadow-sm">
                  {activeProject.title}
                </h3>
                
                <div className="rounded-xl border border-white/10 bg-surface-2/60 backdrop-blur-md p-5 shadow-glow transition-all duration-300 hover:shadow-[0_0_20px_2px_rgba(139,92,246,0.4)]">
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/95">
                    {activeProject.description}
                  </p>
                </div>
                
                {/* Highlights or Achievement Connection (Fallback for Full Stack objects) */}
                {(activeProject.highlights || activeProject.achievementConnection) && (
                  <div className="mt-2 space-y-2">
                    <h4 className="font-mono text-[11px] tracking-widest text-foreground uppercase">Key Highlights</h4>
                    {activeProject.highlights ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeProject.highlights.map((highlight, i) => (
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.05) }}
                            key={i}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className={`size-1.5 rounded-full bg-current ${currentTheme.accent}`} />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className={`rounded-lg border ${currentTheme.borderActive} ${currentTheme.bgActive} p-3 sm:p-4`}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🏆</span>
                          <span className={`font-mono text-[10px] tracking-widest ${currentTheme.accent} uppercase`}>
                            Achievement
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-foreground">
                          {activeProject.achievementConnection}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-2 flex flex-wrap gap-2">
                  {activeProject.technologies.map((t, i) => (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-muted-foreground shadow-sm"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                {/* Custom Flow Visualization */}
                {activeProject.flow && (
                  <div className="mt-2 rounded-xl border border-white/5 bg-surface-2/30 p-4">
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

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-4">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative overflow-hidden rounded-full bg-white px-5 sm:px-6 py-3 font-mono text-[10px] sm:text-xs tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
                    >
                      <span className="relative z-10 font-bold flex items-center gap-2">
                        LIVE DEMO 
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </span>
                      <div className="absolute inset-0 bg-black/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                    </a>
                  )}
                  
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-5 sm:px-6 py-3 font-mono text-[10px] sm:text-xs tracking-widest text-foreground transition-all hover:bg-white/5 hover:border-white/40"
                    >
                      VIEW GITHUB
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 transition-opacity group-hover:opacity-100"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
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
