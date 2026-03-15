"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import Section from '../Section/Section';
import styles from './Contact.module.css';

// MANUAL STEP REQUIRED: Go to Formspree dashboard → your form → 
// Settings → turn ON "Custom Email" and set From Name to 
// "Subrahmanyeswar Portfolio" and Reply-To to the submitter email.
// This is the #1 fix for spam issues with Formspree.

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "mqaeavvy";
      
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Portfolio Contact: ${formData.subject} — from ${formData.name}`,
          _replyto: formData.email,
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  return (
    <Section id="contact" className={styles.contact}>
      <div className={styles.grid}>
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={styles.info}
        >
          <span className={styles.label}>[ CONTACT ]</span>
          <h2 className={styles.title}>Let&apos;s Build Something Intelligent</h2>
          <p className={styles.description}>
            Open to AI/ML Engineer roles and collaborative research opportunities. 
            Whether you have a technical question or a project in mind, I&apos;m just a message away.
          </p>

          <div className={styles.directLinks}>
            <a href={`mailto:${portfolioData.personal.email}`} className={styles.link}>
              <span className={styles.linkIcon}>✉</span>
              {portfolioData.personal.email}
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <span className={styles.linkIcon}>↗</span>
              LinkedIn
            </a>
          </div>

          <a 
            href="/resume.pdf" 
            download 
            className={styles.resumeBtn}
          >
            Download Resume (PDF) 📥
          </a>
        </motion.div>

        {/* Right Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={styles.formContainer}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Honeypot field */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="Subrahmanyeswar" 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="subbu@example.com" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required 
                placeholder="Project Collaboration" 
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={5} 
                placeholder="Hi Subbu, I'm interested in..." 
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>

            {status === 'success' && (
              <p className={styles.successMsg}>
                Got it! I&apos;ll reply to {formData.name || 'you'} at {formData.email} within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg}>
                Something went wrong. Please email me directly at subrahmanyeswarkolluru@gmail.com
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
