"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Education", href: "#education" },
  { name: "System", href: "#terminal" },
  { name: "Contact", href: "#contact" },
];

// We need the IDs for the scroll spy
const sectionIds = navLinks.map((link) => link.href.substring(1));

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track active section for highlight
  const activeSection = useScrollSpy(sectionIds, 300);

  // Top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle transparent to solid transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Smooth scroll to element
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Offset for sticky navbar
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    } else if (href === "#hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className={styles.progressBar}
        style={{ scaleX, transformOrigin: "0%" }}
      />

      <header
        className={`${styles.navbar} ${
          isScrolled ? styles.navbarScrolled : ""
        }`}
      >
        <div className={styles.navContainer}>
          {/* Logo (Left) */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className={styles.logoWrapper}
          >
            <span className={styles.monogram}>SK</span>
            <span className={styles.logoTitle}>AI Engineer</span>
          </a>

          {/* Desktop Nav (Right) */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`${styles.navLink} ${
                    isActive ? styles.navLinkActive : ""
                  }`}
                >
                  {link.name}
                  
                  {/* Active highlight pill (Framer Motion layoutId) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className={styles.activeHighlight}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
            
            <a 
              href="/resume.pdf?v=2" 
              download="Subrahmanyeswar Kolluru Resume.pdf"
              className={styles.resumeBtn}
            >
              Resume 📥
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`${styles.mobileNavLink} ${
                    activeSection === link.href.substring(1)
                      ? styles.mobileNavLinkActive
                      : ""
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/resume.pdf?v=2" 
                download="Subrahmanyeswar Kolluru Resume.pdf"
                className={styles.mobileResumeBtn}
              >
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
