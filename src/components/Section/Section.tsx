import { ReactNode } from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full max-w-[1200px] mx-auto px-6 py-24 md:py-32 ${className}`}
    >
      {children}
    </section>
  );
}
