import * as React from 'react';
import styles from './more-button.module.css';
import Link from 'next/link';

export function MoreButton({ ...props }) {
  return <Link className={styles.MoreButton} {...props} />;
}
