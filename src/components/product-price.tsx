import { formatPrice } from '@/utils/format-price';
import * as React from 'react';
import { string, z } from 'zod';
import styles from './product-price.module.css';

interface pageProps {
  initialPrice: string;
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export const ProductPrice = ({
  compareAtPriceRange,
  initialPrice,
}: pageProps) => {
  const price = formatPrice(
    compareAtPriceRange.maxVariantPrice.currencyCode,
    parseInt(initialPrice),
  );

  const onSale = compareAtPriceRange.minVariantPrice.amount !== initialPrice;

  return (
    <h2 className={styles.priceValue}>
      <span className={styles.onSale}>
        {onSale &&
          formatPrice(
            compareAtPriceRange.minVariantPrice.currencyCode,
            parseInt(initialPrice),
          )}
      </span>
      <span className={`${onSale ? styles.oldSale : styles.regularSale}`}>
        {formatPrice(
          compareAtPriceRange.maxVariantPrice.currencyCode,
          parseInt(compareAtPriceRange.maxVariantPrice.amount),
        )}
      </span>
      <p>inc.vat</p>
    </h2>
  );
};
