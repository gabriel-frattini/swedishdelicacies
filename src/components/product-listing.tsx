import * as React from 'react';
import { ProductCard } from './product-card';
import styles from './product-listing.module.css';
import { AllproductsByHandleType } from '@/lib/types';
// To optimize LCP we mark the first product card as eager so the image gets loaded faster

type ProductListingType = Omit<
  AllproductsByHandleType['data']['collectionByHandle'],
  'handle' | 'title'
>;

export function ProductListing({ products }: ProductListingType) {
  return (
    <div className={styles.listingContainerStyle}>
      {products.edges.map((p, index) => (
        <ProductCard product={p} key={index} eager={index === 0} />
      ))}
    </div>
  );
}
