import React from 'react';
import { formatPrice } from '../../utils/format-price';

import styles from './shipping-banner.module.css';

interface PageProps {
  total: string;
  currencyCode: string;
  freeShippingLimit: number;
}

const ShippingBanner = ({
  total,
  currencyCode,
  freeShippingLimit,
}: PageProps) => {
  const shippingLeft = Number(freeShippingLimit) - Number(total);

  const shippingProgress = Math.round(
    (Number(total) / freeShippingLimit) * 100,
  );

  return (
    <>
      {Number(total) >= freeShippingLimit ? (
        <div className={styles.banner}>
          <span className={styles.bannerText}>
            You have <strong>Free Shipping</strong>
            &#127881;
          </span>
          <div className={styles.progresswrapper}>
            <p className={styles.progress} style={{ width: '100%' }}></p>
          </div>
        </div>
      ) : (
        <div className={styles.banner}>
          <span className={styles.bannerText}>
            You are{' '}
            <strong>
              {currencyCode} {shippingLeft}
            </strong>{' '}
            away from <strong>Free Shipping</strong>
            &#128666;
          </span>
          <div className={styles.progresswrapper}>
            <p
              className={styles.progress}
              style={{ width: `${shippingProgress}%` }}
            ></p>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingBanner;
