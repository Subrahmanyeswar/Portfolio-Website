"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import styles from "./Achievements.module.css";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

export default function Achievements() {
  return (
    <div className={styles.grid}>
      {portfolioData.achievements.map((item, idx) => (
        <motion.div
          key={idx}
          className={styles.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
          transition={{ delay: idx * 0.1 }}
        >
          <span className={styles.number}>
            {(idx + 1).toString().padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
