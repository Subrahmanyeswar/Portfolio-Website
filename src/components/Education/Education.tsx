"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import styles from "./Education.module.css";

export default function Education() {
  const { education } = portfolioData;

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.mainInfo}>
        <div className={styles.logoMonogram}>
          {education.logo ? (
            <Image 
              src={education.logo} 
              alt={education.institutionShort} 
              width={64} 
              height={64} 
              className={styles.logoImage}
            />
          ) : (
            education.institutionShort
          )}
        </div>
        <div className={styles.textGroup}>
          <h3 className={styles.degree}>{education.degree}</h3>
          <p className={styles.institution}>{education.institution}</p>
          <p className={styles.period}>{education.period} • {education.location}</p>
        </div>
      </div>

      <div className={styles.sideGroup}>
        <div className={styles.cgpaPill}>
          <span className={styles.cgpaLabel}>CGPA</span>
          <span className={styles.cgpaValue}>{education.cgpa}</span>
        </div>
        <div className={styles.statusBadge}>
          <div className={styles.statusDot} />
          <span>Currently in 4th Year</span>
        </div>
      </div>
    </motion.div>
  );
}
