// @ts-check
import * as React from 'react';
import styles from './currency-field.module.css';

interface ComponentProps {
  price: string;
  onPriceChange: () => void;
  symbol?: string;
}

export function CurrencyField({
  symbol,
  onPriceChange,
  price,
}: ComponentProps) {
  return (
    <span
      className={[styles.wrap, styles.symbolAfter].filter(Boolean).join(' ')}
    >
      <span className={styles.currencySymbol}>EUR</span>
      <input
        className={styles.input}
        data-currency={symbol}
        onChange={onPriceChange}
        value={price}
      />
    </span>
  );
}
