// @ts-check
import * as React from 'react';
import styles from './currency-field.module.css';

export function CurrencyField({
  symbol,
  symbolAtEnd,
  style,
  className,
  ...props
}: any) {
  return (
    <span
      className={[className, styles.wrap, symbolAtEnd && styles.symbolAfter]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <span className={styles.currencySymbol}>EUR</span>
      <input type="numeric" className={styles.input} data-currency={'EUR'} />
    </span>
  );
}
