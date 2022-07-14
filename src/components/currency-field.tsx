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
      <span className={styles.currencySymbol}>{symbol}</span>
      <input
        type="numeric"
        className={styles.nput}
        data-currency={symbol}
        {...props}
      />
    </span>
  );
}
