"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { portfolioData } from "@/data/portfolio";
import styles from "./Hero.module.css";
import NeuralNetAnimation from "./NeuralNetAnimation";

/* ── SVG Icons ── */
const LinkedInIcon = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const HuggingFaceIcon = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 7.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm3 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM8.25 13.5c0 0 1.125 2.25 3.75 2.25s3.75-2.25 3.75-2.25.375-.375.75 0 .375.75 0 .75c0 0-1.5 3-4.5 3s-4.5-3-4.5-3c-.375-.375 0-.75 0-.75s.375-.375.75 0z" />
  </svg>
);

const MailIcon = () => (
  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13 2 4" />
  </svg>
);

/* ── Animation variants ── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const slideInLeftVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const initialsVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.5, ease: EASE },
  },
};

/* ── Component ── */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { personal, heroSubtitles, heroStats } = portfolioData;

  const { text, showCursor } = useTypewriter({
    words: heroSubtitles,
    typingSpeed: 70,
    deletingSpeed: 35,
    pauseDuration: 2200,
  });

  // Scroll-based fade out
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -40]);

  return (
    <motion.section
      ref={heroRef}
      className={styles.hero}
      style={{ opacity: heroOpacity, y: heroY }}
      id="hero"
    >
      {/* Neural Network Visualization */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 opacity-80" style={{ pointerEvents: 'none' }}>
        <NeuralNetAnimation />
      </div>

      {/* Main content */}
      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Label */}
        <motion.p className={styles.label} variants={fadeUpVariant}>
          [ AI Engineer / ML Engineer ]
        </motion.p>

        {/* Name */}
        <motion.h1 className={styles.name} variants={fadeUpVariant}>
          {personal.name.toUpperCase()}
        </motion.h1>

        {/* Typewriter */}
        <motion.div className={styles.typewriterLine} variants={fadeUpVariant}>
          <span>{text}</span>
          <span
            className={`${styles.cursor} ${
              showCursor ? styles.cursorVisible : styles.cursorHidden
            }`}
          />
        </motion.div>

        {/* Stat pills */}
        <motion.div
          className={styles.statsRow}
          variants={containerVariants}
        >
          {heroStats.map((stat) => (
            <motion.div
              key={stat.label}
              className={styles.statPill}
              variants={slideInLeftVariant}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statDivider} />
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className={styles.ctaRow} variants={fadeUpVariant}>
          <a href="#projects" className={styles.btnPrimary}>
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download="Subrahmanyeswar_Kolluru_AI_Engineer_Resume_FINAL.pdf"
            className={styles.btnOutline}
          >
            Download Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div className={styles.socialRow} variants={fadeUpVariant}>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a
            href={personal.huggingface}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <HuggingFaceIcon />
            <span>HuggingFace</span>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className={styles.socialLink}
          >
            <MailIcon />
            <span>Email</span>
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
