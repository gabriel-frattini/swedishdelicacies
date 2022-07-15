import * as React from 'react';

import { Layout } from '../components/layout';
import { AllCollectionsType } from '@/lib/types';

import styles from './404.module.css';
import { getAllCollections } from '@/lib/queries';

interface pageProps {
  collections: AllCollectionsType;
}

export default function NotFoundPage({ collections }: pageProps) {
  return (
    <Layout collections={collections}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.paragraph}>
          Sorry, we couldn't find what you were looking for
        </p>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const collections = await getAllCollections();

  return {
    props: { collections },
  };
}
