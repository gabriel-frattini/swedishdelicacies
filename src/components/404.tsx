import * as React from 'react';

import styles from '@/pages/404.module.css';
import { Layout } from './layout';

const optimisticCollections = {
  collections: {
    edges: [
      {
        node: {
          handle: 'frontpage',
          id: 'gid://shopify/Collection/276446216332',
        },
      },
      {
        node: {
          handle: 'test',
          id: 'gid://shopify/Collection/276546158732',
        },
      },
      {
        node: {
          handle: 'candy',
          id: 'gid://shopify/Collection/276547076236',
        },
      },
      {
        node: {
          handle: 'chocolate',
          id: 'gid://shopify/Collection/276547240076',
        },
      },
      {
        node: {
          handle: 'sour-herring-surstromming',
          id: 'gid://shopify/Collection/276547272844',
        },
      },
      {
        node: {
          handle: 'licorice',
          id: 'gid://shopify/Collection/276547338380',
        },
      },
      {
        node: {
          handle: 'dala-horse-dalahastar',
          id: 'gid://shopify/Collection/276547993740',
        },
      },
      {
        node: {
          handle: 'cookies',
          id: 'gid://shopify/Collection/276548124812',
        },
      },
      {
        node: {
          handle: 'other-scandinavian-stuff',
          id: 'gid://shopify/Collection/276548223116',
        },
      },
    ],
  },
};
export default function NotFound() {
  return (
    <Layout collections={optimisticCollections.collections} activePage={'none'}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.paragraph}>
          Sorry, we couldn't find what you were looking for
        </p>
      </div>
    </Layout>
  );
}
