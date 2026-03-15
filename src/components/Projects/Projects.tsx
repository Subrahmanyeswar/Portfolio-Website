"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import styles from "./Projects.module.css";

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
      delayChildren: 0.1,
    },
  },
};

/* ── UI Components ── */

const GitHubIcon = () => (
  <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const ExternalIcon = () => (
  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

export default function Projects() {
  const { projects } = portfolioData;
  const featuredProject = projects.find(p => p.featured && p.name === "Aeternum Hub") || projects[0];
  const gridProjects = projects.filter(p => p !== featuredProject);
  const totalCount = projects.length.toString().padStart(2, "0");

  const [expandedProjects, setExpandedProjects] = React.useState<Record<string, boolean>>({});

  const toggleProject = (projectName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedProjects(prev => ({
      ...prev,
      [projectName]: !prev[projectName]
    }));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <h2 className={styles.heading}>Featured Work</h2>
        <span className={styles.counter}>({totalCount})</span>
      </motion.div>

      {/* Featured Card */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <a 
          href={featuredProject.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.featuredCard}
        >
          <div className={styles.projectInfo}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <h3 className={styles.projectName}>{featuredProject.name}</h3>
            </div>
            <p className={styles.projectTagline}>{featuredProject.tagline}</p>
            
            <div className={styles.techRow}>
              {featuredProject.tech.map(t => (
                <span key={t} className={styles.techPill}>{t}</span>
              ))}
            </div>

            <div className={styles.metricsRow}>
              {featuredProject.metrics.map(m => (
                <div key={m.label} className={styles.metricBadge}>
                  <span className={styles.metricValue}>{m.value}</span>
                  <span className={styles.metricLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.projectBullets}>
            {featuredProject.bullets.map((b, idx) => (
              <p key={idx} className={styles.bulletItem}>{b}</p>
            ))}
            
            {featuredProject.keyFeatures && (
              <div className={styles.featureGrid}>
                {featuredProject.keyFeatures.map((f, idx) => (
                  <div key={idx} className={styles.featureItem}>{f}</div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.projectActions}>
            <div className={styles.githubLink}>
              <GitHubIcon />
              <span>Source Archive</span>
            </div>
          </div>
        </a>
      </motion.div>

      {/* Small Grid Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-md)" }}>
          Selected Experiments & Systems
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className={styles.projectsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {gridProjects.map((project) => (
          <motion.a
            key={project.name}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.gridCard}
            variants={fadeUpVariant}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
               <h3 className={styles.gridCardName}>{project.name}</h3>
               {project.isResearch && (
                 <div className={styles.researchBadge} style={{ width: 'fit-content' }}>Research Published</div>
               )}
            </div>
            <p className={styles.gridCardTagline}>{project.tagline}</p>
            
            <div className={styles.techRow}>
              {(expandedProjects[project.name] ? project.tech : project.tech.slice(0, 4)).map(t => (
                <span key={t} className={styles.techPill}>{t}</span>
              ))}
              {project.tech.length > 4 && (
                <button 
                  className={styles.gridMoreTech}
                  onClick={(e) => toggleProject(project.name, e)}
                >
                  {expandedProjects[project.name] ? "Show less" : `+${project.tech.length - 4} more`}
                </button>
              )}
            </div>

            <div className={styles.gridBullets}>
              {project.bullets.slice(0, 2).map((b, idx) => (
                <div key={idx} className={styles.gridBulletItem}>{b}</div>
              ))}
              
              {project.keyFeatures && (
                <div className={styles.featureGrid} style={{ gridTemplateColumns: '1fr', padding: 'var(--space-sm)' }}>
                  {project.keyFeatures.slice(0, 3).map((f, idx) => (
                    <div key={idx} className={styles.featureItem} style={{ fontSize: '0.75rem' }}>{f}</div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.gridAction}>
              <span>Explore System</span>
              <ExternalIcon />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
