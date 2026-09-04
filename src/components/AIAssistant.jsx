import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot } from "lucide-react";
import { getAIResponse } from "../data/chatbotData";

const suggestions = [
  "Who is Pooja?",
  "Why should I hire you?",
  "Tell me about your Java projects",
  "Tell me about your React projects",
  "What are your strongest skills?"
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I am Pooja's AI Portfolio Assistant. You can ask me anything about her skills, projects, experience, or achievements." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const query = (text || input).trim();
    if (!query) return;

    setMessages(prev => [...prev, { role: "user", text: query }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(query);
      setMessages(prev => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-glow panel border-border backdrop-blur-md flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-border bg-background/50 backdrop-blur-sm z-10">
        <div className="w-12 h-12 relative rounded-full overflow-hidden border border-violet/30 bg-violet/5 flex items-center justify-center">
          <Bot className="w-6 h-6 text-violet" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">PORTFOLIO AI</h3>
          <p className="text-xs text-muted-foreground">Online & Ready to answer</p>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-violet/20 border border-violet/30 text-foreground" 
                    : "bg-surface-2 border border-border text-foreground/90"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start"
            >
              <div className="bg-surface-2 border border-border rounded-2xl px-5 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet/50 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-magenta/50 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-violet/50 animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm z-10">
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 mb-2 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleSend(suggestion)}
              className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-border bg-surface hover:bg-violet/10 hover:border-violet/30 transition-colors text-muted-foreground hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about Pooja..."
            className="flex-1 bg-surface-2 border border-border rounded-full px-5 py-2.5 text-sm text-foreground outline-none focus:border-violet/50 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="bg-violet text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-violet/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
