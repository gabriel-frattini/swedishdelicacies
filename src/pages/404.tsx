import * as React from 'react';

import { Layout } from '../components/layout';
import { AllCollectionsType } from '@/lib/types';

import styles from './404.module.css';
import { getAllCollections } from '@/lib/queries';
import { object } from 'zod';

interface pageProps {
  collections: AllCollectionsType;
}

export default function NotFoundPage({ collections }: pageProps) {
  
  if (Object.keys(collections).length === 0) {
    return <></>;
  }
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
  try {
    const collections = await getAllCollections();
    if (collections) {
      return {
        props: { collections },
      };
    }
    return {
      props: { collections: {} },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { collections: {} },
    };
  }
}
