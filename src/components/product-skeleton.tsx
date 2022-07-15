import React from 'react';
import styles from './product-skeleton.module.css';

interface Props {}

const ProductSkeleton: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.productBox}>
        <div className={styles.productImageWrapper}>
          <div className={styles.productImageListItem}></div>
        </div>

        <div className={styles.productInfoWrapper}>
          <h1 className={styles.header}></h1>
          <p className={styles.productDescription}></p>

          <fieldset className={styles.optionsWrapper}></fieldset>
          <div className={styles.addToCartStyle}></div>
          <div className={styles.metaSection}>
            <div className={styles.metaShipping}>
              <div>
                <p className={styles.tagList}></p>
              </div>
              <div>
                <p className={styles.tagList}></p>
              </div>
              <div>
                <p className={styles.tagList}></p>
              </div>
            </div>
            <div className={styles.metaProduct}>
              <span className={styles.labelFont}></span>
              <span className={styles.tagList}></span>
              <span className={styles.labelFont}></span>
              <span className={styles.tagList}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
