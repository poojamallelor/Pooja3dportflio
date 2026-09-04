import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AIAssistant from "./AIAssistant";
import { X, Bot } from "lucide-react";

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mb-4 w-[350px] sm:w-[400px] pointer-events-auto origin-bottom-right"
          >
            <div className="relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface z-20 shadow-lg transition-colors"
              >
                <X size={16} />
              </button>
              <div className="shadow-2xl shadow-violet/20 rounded-xl overflow-hidden h-[500px]">
                {/* Embedded inside here, adjusting height a bit for the floating version if needed */}
                <AIAssistant />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-16 h-16 rounded-full flex items-center justify-center pointer-events-auto transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-violet/30"
      >
        <div className="absolute inset-0 rounded-full bg-background border border-violet/30 backdrop-blur-md overflow-hidden flex items-center justify-center pointer-events-none">
           <Bot className={`w-8 h-8 transition-colors ${isHovered ? 'text-magenta' : 'text-violet'}`} />
        </div>
        
        <div className="absolute inset-0 rounded-full border border-violet/40 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity pointer-events-none" />
        
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-12 right-0 whitespace-nowrap bg-surface-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-violet/30 shadow-glow text-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
          >
            Ask about me
          </motion.div>
        )}
      </button>
    </div>
  );
}
