import * as React from 'react';
import slugify from '@sindresorhus/slugify';
import styles from './navigation.module.css';
import Link from 'next/link';
import { AllCollectionsType } from '@/lib/types';

interface NavbarProps {
  collections: AllCollectionsType;
}

export const Navigation = ({ collections }: NavbarProps) => {
  return (
    <nav className={styles.navStyle}>
      <Link key="All" href="/products/">
        <a className={styles.navLink}>All Products</a>
      </Link>
      {collections.edges.map((edge) => (
        <Link
          key={edge.node.handle}
          replace
          href={`/products/${edge.node.handle}`}
        >
          <a className={styles.navLink}>{edge.node.handle}</a>
        </Link>
      ))}
    </nav>
  );
};
