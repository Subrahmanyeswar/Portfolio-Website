"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import styles from "./Skills.module.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className={styles.header}
      >
        <motion.h2 className={styles.heading} variants={fadeUpVariant}>
          Technical Arsenal<span className={styles.accentDot}>.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        className={styles.gridContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((category) => (
          <motion.div
            key={category.category}
            className={styles.categoryCard}
            variants={fadeUpVariant}
          >
            <h3 className={styles.categoryLabel}>{category.category}</h3>
            <div className={styles.pillsContainer}>
              {category.skills.map((skill) => (
                <span key={skill} className={styles.skillPill}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
