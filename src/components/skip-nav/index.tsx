import * as React from 'react';
import styles from './skip-nav.module.css';

const defaultId = `skip-to-content`;

export function SkipNavLink({
  children = `Skip to content`,
  contentId,
  ...props
}: any) {
  const id = contentId || defaultId;

  return (
    <a
      className={styles.navLink}
      {...props}
      href={`#${id}`}
      data-skip-to-content
    >
      {children}
    </a>
  );
}

/**
 * Wrap the main content of a page with this, thus also the <main> tag
 */
export function SkipNavContent({ children, id: idProp, ...props }: any) {
  const id = idProp || defaultId;

  return (
    <main {...props} id={id}>
      {children}
    </main>
  );
}
