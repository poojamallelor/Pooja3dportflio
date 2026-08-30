/**
 * Section.jsx
 * Shared page-section shell: consistent id, vertical rhythm and max width
 * so every DOM section sits identically above the 3D world.
 */
export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative px-6 py-24 sm:py-28 lg:px-16 lg:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
