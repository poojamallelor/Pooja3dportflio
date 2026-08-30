import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

/**
 * Premium Case Study Modal for displaying project details.
 */
export default function CaseStudyModal({ isOpen, onClose, project }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/60"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="pointer-events-auto relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-1 shadow-2xl"
              style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), var(--shadow-glow)" }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-surface-1/80 px-6 py-4 backdrop-blur-xl md:px-10 md:py-6">
                <div>
                  <span className="mono-label text-magenta">
                    {project.category || "Case Study"}
                  </span>
                  <h2 className="mt-1 font-display text-2xl md:text-3xl">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="group rounded-full bg-white/5 p-3 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:rotate-90"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="grid gap-12 md:grid-cols-3">
                  
                  {/* Left Column (Main Content) */}
                  <div className="md:col-span-2 space-y-12">
                    <section>
                      <h3 className="mono-label mb-4 text-muted-foreground">
                        Overview
                      </h3>
                      <p className="text-base leading-relaxed text-foreground md:text-lg">
                        {project.description}
                      </p>
                    </section>

                    {project.problem && (
                      <section>
                        <h3 className="mono-label mb-4 text-coral">Problem</h3>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {project.problem}
                        </p>
                      </section>
                    )}

                    {project.solution && (
                      <section>
                        <h3 className="mono-label mb-4 text-emerald-400">Solution</h3>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {project.solution}
                        </p>
                      </section>
                    )}

                    {project.features && (
                      <section>
                        <h3 className="mono-label mb-4 text-muted-foreground">
                          Key Features
                        </h3>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {project.features.map((feature, idx) => (
                            <motion.li
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                              key={idx}
                              className="flex items-center gap-3 text-sm text-muted-foreground"
                            >
                              <div className="size-1.5 rounded-full bg-magenta/50" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>

                  {/* Right Column (Meta & Links) */}
                  <div className="space-y-10">
                    <section>
                      <h3 className="mono-label mb-4 text-muted-foreground">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                            key={idx}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] tracking-wider text-muted-foreground"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </section>

                    {(project.githubUrl || project.liveUrl) && (
                      <section>
                        <h3 className="mono-label mb-4 text-muted-foreground">
                          Links
                        </h3>
                        <div className="flex flex-col gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-magenta px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                            >
                              LIVE DEMO
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:border-white/30"
                            >
                              VIEW SOURCE CODE
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                          )}
                        </div>
                      </section>
                    )}
                  </div>
                  
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
