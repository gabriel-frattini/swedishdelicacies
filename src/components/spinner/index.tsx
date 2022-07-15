import * as React from 'react';
import styles from './progress.module.css';

export function Spinner(props) {
  return <span role="progressbar" className={styles.spinner} {...props} />;
}
