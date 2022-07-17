import * as React from 'react';
import { StoreContext } from '../../../context/store-context';
import Logo from '../../../icons/logo';
import { Navigation } from '../navigation';
import SearchIcon from '../../../icons/search';
import { Toast } from '../../toast';
import styles from './header.module.css';
import Link from 'next/link';
import { AllCollectionsType } from '@/lib/types';
import { CartButton } from '../../cart-button';

interface HeaderProps {
  collections: AllCollectionsType;
}

export const Header: React.FC<HeaderProps> = ({ collections }: HeaderProps) => {
  const { checkout, loading, didJustAddToCart } =
    React.useContext(StoreContext);

  const items = checkout ? checkout.lineItems : [];

  const quantity = items.reduce((total: number, item: any) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link replace href="/" className={styles.logoCss}>
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <div className={styles.nav}>
          <Navigation collections={collections} />
        </div>
        <Link replace href="/search">
          <a className={styles.searchButton}>
            <SearchIcon />
          </a>
        </Link>
        <Link href="/cart" replace>
          <a className={styles.cartButton}>
            <CartButton quantity={quantity} />
          </a>
        </Link>
      </header>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          'Updating...'
        ) : (
          <>
            Added to cart{' '}
            <svg
              width="14"
              height="14"
              fill="#1a3050"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#1a3050"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#1a3050"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#1a3050"
              />
            </svg>
          </>
        )}
      </Toast>
    </div>
  );
};
