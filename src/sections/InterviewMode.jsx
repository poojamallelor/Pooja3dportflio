import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { interviewQuestions } from "../data/interview";

/**
 * InterviewMode.jsx
 * Technical Interview Mode: a self-quizzing accordion where each answer
 * expands in place, so a recruiter can verify fundamentals in one pass.
 */
export default function InterviewMode() {
  const [open, setOpen] = useState(interviewQuestions[0]?.id ?? null);

  return (
    <Section id="interview">
      <SectionHeading
        index="10"
        kicker="Technical Interview Mode"
        title="Ask me the fundamentals."
        description="Eleven questions I expect in a Java full stack interview, answered in my own words."
      />

      <div className="mt-16 grid gap-2">
        {interviewQuestions.map((q) => {
          const isOpen = open === q.id;
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className={`panel overflow-hidden rounded-2xl transition-colors ${
                isOpen ? "border-violet/50" : ""
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : q.id)}
                className="flex w-full items-center gap-5 px-6 py-5 text-left"
              >
                <span className="mono-label shrink-0 text-violet">
                  {String(q.id).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-medium sm:text-lg">
                  {q.question}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-xl leading-none text-muted-foreground"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 pl-[4.6rem] text-sm leading-relaxed text-muted-foreground">
                      {q.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
