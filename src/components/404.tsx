import * as React from 'react';

import { AllCollectionsType } from '@/lib/types';

import styles from '@/pages/404.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Page Not Found</h1>
      <p className={styles.paragraph}>
        Sorry, we couldn't find what you were looking for
      </p>
    </div>
  );
}
