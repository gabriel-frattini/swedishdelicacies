import * as React from 'react';
import { formatPrice } from '../utils/format-price';
import styles from './product-card.module.css';
import { SingleProductType } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: {
    node: SingleProductType;
  };
  eager?: any;
}

export function ProductCard({ product: { node }, eager }: Props) {
  const { title, priceRange, handle, images, vendor, collections } = node;
  const price = formatPrice(
    priceRange.minVariantPrice.currencyCode,
    parseInt(priceRange.minVariantPrice.amount),
  );

  const defaultImageHeight = 200;
  const defaultImageWidth = 400;
  return (
    <Link
      href={`/products/${
        collections.edges.length && collections.edges[0].node.handle
      }/${handle}`}
      replace
      aria-label={`View ${title} product page`}
    >
      <div className={styles.productCardStyle}>
        {images ? (
          <div
            className={styles.productImageStyle}
            data-name="product-image-box"
          >
            <Image
              alt={images.edges[0].node.altText ?? title}
              src={images.edges[0].node.originalSrc}
              width={defaultImageWidth}
              height={defaultImageHeight}
              objectFit="contain"
              loading={eager ? 'eager' : 'lazy'}
            />
          </div>
        ) : (
          <div
            style={{ height: defaultImageHeight, width: defaultImageWidth }}
          />
        )}
        <div className={styles.productDetailsStyle}>
          <div className={styles.productVendorStyle}>{vendor}</div>
          <h2 className={styles.productHeadingStyle}>{title}</h2>
          <div className={styles.productPrice}>{price}</div>
        </div>
      </div>
    </Link>
  );
}
