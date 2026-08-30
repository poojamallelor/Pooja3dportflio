import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import Section from "../components/Section";
import { profile } from "../data/portfolio";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Transforms for parallax effects
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const infoCards = [
    { id: "01", title: "CSE", detail: "Computer Science & Engineering" },
    { id: "02", title: "CGPA", detail: "8.1" },
    { id: "03", title: "FOCUS", detail: "Java Full Stack Development" },
    { id: "04", title: "BUILD", detail: "React • Spring Boot • MySQL" },
  ];

  return (
    <Section id="about" className="relative overflow-hidden pt-24 pb-32">
      {/* Premium Dark Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-[1300px] mx-auto"
      >
        
        {/* LEFT COLUMN: Interactive Profile Photo Presentation */}
        <div className="relative flex justify-center items-center w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] perspective-1000">
          
          {/* Subtle Ambient Glow Behind */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 blur-[80px] rounded-full scale-75"
            animate={{ 
              scale: [0.75, 0.85, 0.75], 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Orbit Rings */}
          <motion.div 
            className="absolute size-full max-w-[550px] max-h-[550px] rounded-full border border-white/5 border-dashed"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute size-[110%] max-w-[650px] max-h-[650px] rounded-full border border-white/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />

          {/* The Interactive 3D Container */}
          <motion.div
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="relative w-full max-w-[400px] aspect-[3/4] group preserve-3d cursor-crosshair"
          >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-b from-cyan-400/50 via-white/10 to-violet-500/50 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            
            {/* Glassmorphism Frame */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-surface-1 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.03]">
              
              {/* Actual Profile Photo */}
              <img 
                src="/profile.jpeg" 
                alt="Pooja Mallelor - Professional Profile"
                className="w-full h-full object-cover object-center filter saturate-[1.1] contrast-[1.05]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex flex-col items-center justify-center bg-surface-2 p-8 text-center border-dashed border-2 border-white/20 rounded-[2.5rem]">
                      <span class="text-3xl mb-4">📸</span>
                      <p class="font-mono text-sm text-muted-foreground">Waiting for profile.jpeg to be uploaded to the public directory.</p>
                    </div>
                  `;
                }}
              />
              
              {/* Overlay styling for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-white/5 mix-blend-overlay pointer-events-none" />
              
              {/* Dynamic Light Sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full ease-in-out pointer-events-none" style={{ transitionDuration: '1.5s' }} />
            </div>

            {/* Small Floating Particles */}
            <motion.div 
              className="absolute -top-6 -right-6 size-12 rounded-full bg-cyan-400/20 blur-xl"
              animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-10 -left-6 size-16 rounded-full bg-violet-500/20 blur-xl"
              animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: About Information */}
        <div className="relative flex flex-col justify-center gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase">
              <span className="w-8 h-[1px] bg-cyan-400/50" />
              About Me
            </span>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-foreground drop-shadow-sm">
              Building with logic. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Creating with purpose.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed"
          >
            <p className="text-base sm:text-lg">
              {profile.objective}
            </p>
          </motion.div>

          {/* Compact Info Cards */}
          <motion.div 
            className="grid grid-cols-2 gap-4 sm:gap-6 mt-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {infoCards.map((card) => (
              <motion.div 
                key={card.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 transition-colors hover:bg-white/[0.04] hover:border-white/10"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-4xl transition-transform group-hover:scale-110 group-hover:-translate-y-1">
                  {card.id}
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-cyan-400/80 uppercase">
                    {card.title}
                  </span>
                  <span className="font-medium text-sm sm:text-base text-foreground leading-tight">
                    {card.detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-1000 { perspective: 1000px; }
      `}} />
    </Section>
  );
}
