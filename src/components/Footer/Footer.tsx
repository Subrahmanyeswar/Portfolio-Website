import { portfolioData } from '@/data/portfolio';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'System', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: portfolioData.personal.github },
    { name: 'LinkedIn', href: portfolioData.personal.linkedin },
    { name: 'HuggingFace', href: portfolioData.personal.huggingface },
    { name: 'Email', href: `mailto:${portfolioData.personal.email}` },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          {/* Logo & Tagline */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.initials}>{portfolioData.personal.initials}</span>
            </div>
            <p className={styles.tagline}>{portfolioData.personal.tagline}</p>
          </div>

          {/* Navigation */}
          <div className={styles.nav}>
            <h4 className={styles.header}>Navigation</h4>
            <ul className={styles.list}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className={styles.social}>
            <h4 className={styles.header}>Social</h4>
            <ul className={styles.list}>
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy; {currentYear} {portfolioData.personal.name}. Built with Next.js + Tailwind.
          </div>
          <div className={styles.performance}>
            Site performance: <span>Lighthouse 95+</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
