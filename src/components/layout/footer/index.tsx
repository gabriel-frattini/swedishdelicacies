import * as React from 'react';
import Logo from '@/icons/logo';
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footerStyle}>
      <div className={styles.blurb}>
        <div className={styles.logos}>
          <Logo />
        </div>
      </div>
      <nav className={styles.links} aria-label="footer">
        <ul className={styles.footerNavList}></ul>
      </nav>
      <div className={styles.copyright}>
        Copyright &copy; {new Date().getFullYear()} · All rights reserved
      </div>
    </footer>
  );
}
