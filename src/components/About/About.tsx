"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter/AnimatedCounter";
import { portfolioData } from "@/data/portfolio";
import styles from "./About.module.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function About() {
  const { personal, heroStats, projects } = portfolioData;

  // Derive stats logic directly from portfolio.ts data context
  const fpsStat = parseInt(heroStats.find((s) => s.label === "Edge AI")?.value || "447");
  const accStat = parseInt(heroStats.find((s) => s.label === "Face Recognition")?.value || "95");
  const cgpaStat = 8.27; // From education
  const projectsCount = projects.length;

  return (
    <div className={styles.container}>
      {/* Text Column */}
      <motion.div
        className={styles.textContent}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className={styles.heading} variants={fadeUpVariant}>
          Building AI Systems That Actually Work<span className={styles.accentDot}>.</span>
        </motion.h2>
        <motion.p className={styles.bio} variants={fadeUpVariant}>
          {personal.tagline} I specialize in engineering robust pipelines that bridge the
          gap between experimental machine learning models and high-performance, real-world
          applications.
        </motion.p>
        <motion.p className={styles.bio} variants={fadeUpVariant}>
          From architecting multi-agent orchestrations with CrewAI to deploying
          sub-50ms inference engines on edge devices via TensorRT, I build intelligent
          solutions focused on latency, accuracy, and absolute reliability.
        </motion.p>
      </motion.div>

      {/* Stats Column */}
      <motion.div
        className={styles.statsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.statCard} variants={fadeUpVariant}>
          <span className={styles.statNumber}>
            <AnimatedCounter to={fpsStat} duration={2500} />
          </span>
          <span className={styles.statLabel}>FPS Edge Inference</span>
        </motion.div>

        <motion.div className={styles.statCard} variants={fadeUpVariant}>
          <span className={styles.statNumber}>
            <AnimatedCounter to={accStat} duration={2000} suffix="%" />
            <span style={{ color: "var(--color-accent)", fontSize: "0.8em" }}>+</span>
          </span>
          <span className={styles.statLabel}>Face Rec. Accuracy</span>
        </motion.div>

        <motion.div className={styles.statCard} variants={fadeUpVariant}>
          <span className={styles.statNumber}>
            <AnimatedCounter to={cgpaStat} duration={2000} />
          </span>
          <span className={styles.statLabel}>CGPA — B.Tech AI & ML</span>
        </motion.div>

        <motion.div className={styles.statCard} variants={fadeUpVariant}>
          <span className={styles.statNumber}>
            <AnimatedCounter to={projectsCount} duration={1500} />
            <span style={{ color: "var(--color-accent)", fontSize: "0.8em" }}>+</span>
          </span>
          <span className={styles.statLabel}>Production Systems</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
