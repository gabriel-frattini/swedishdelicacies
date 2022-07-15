import { formatPrice } from '@/utils/format-price';
import * as React from 'react';
import { StoreContext } from '../context/store-context';
import styles from './add-to-cart.module.css';

interface CompProps {
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
  variantId: string;
  quantity: number;
  available: boolean;
}

export function AddToCart({
  variantId,
  quantity,
  available,
  initialPrice,
  compareAtPriceRange,
}: CompProps) {
  const { addVariantToCart, loading } = React.useContext(StoreContext);

  function addToCart(e: any) {
    e.preventDefault();
    addVariantToCart(variantId, quantity.toString());
  }
  const calculateDiscount = (num: any, denom: any) => {
    const numerator = Number(num);
    const denominator = Number(denom);
    return Math.round(((denominator - numerator) / denominator) * 100);
  };

  const onSale =
    parseInt(compareAtPriceRange.minVariantPrice.amount) !==
    parseInt(initialPrice);

  return (
    <>
      <button
        type="submit"
        className={styles.addToCart}
        onClick={addToCart}
        disabled={!available || loading}
      >
        {available ? 'Add to Cart' : 'Out of Stock'}
      </button>
      {onSale && (
        <p className={styles.youSave}>
          You save{' '}
          {calculateDiscount(
            initialPrice,
            compareAtPriceRange.minVariantPrice.amount,
          )}{' '}
          %
        </p>
      )}
    </>
  );
}
