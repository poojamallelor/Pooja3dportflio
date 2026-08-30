import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import { profile, contact } from "../data/portfolio";

/**
 * Contact.jsx
 * Closing contact block with direct channels and the site footer.
 */
const channels = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", value: contact.linkedinHandle, href: contact.linkedinUrl },
  { label: "GitHub", value: contact.githubHandle, href: contact.githubUrl },
];

export default function Contact() {
  return (
    <Section id="contact" className="pb-0">
      <SectionHeading
        index="12"
        kicker="Contact"
        title="Let's build something worth shipping."
        description={profile.contactStatement}
      />

      <div className="mt-16 grid gap-3 sm:grid-cols-2">
        {channels.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noreferrer" : undefined}
            data-cursor="OPEN"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.07 }}
            className="panel group flex items-center justify-between rounded-2xl px-6 py-6 transition-colors hover:border-violet/60"
          >
            <span className="mono-label">{c.label}</span>
            <span className="text-sm transition-colors group-hover:text-violet sm:text-base">
              {c.value}
            </span>
          </motion.a>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <MagneticButton href={`mailto:${contact.email}`} cursor="EMAIL">
          Email Me
        </MagneticButton>
        <MagneticButton
          href={profile.resume}
          variant="ghost"
          download
          cursor="RESUME"
        >
          Download Resume
        </MagneticButton>
      </div>

      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-border py-10">
        <p className="mono-label">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <p className="mono-label text-violet">{profile.role} · Solapur, India</p>
      </footer>
    </Section>
  );
}
