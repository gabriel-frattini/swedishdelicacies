import * as React from 'react';
import CartIcon from '../icons/cart';
import styles from './cart-button.module.css';
import Link from 'next/link';

export function CartButton({ quantity }: any) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      href="/cart"
      className={styles.cartButton}
      replace
    >
      <>
        <CartIcon />
        {quantity > 0 && <div className={styles.badge}>{quantity}</div>}
      </>
    </Link>
  );
}
