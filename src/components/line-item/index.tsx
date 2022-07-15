import * as React from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';

import { StoreContext } from '../../context/store-context';
import { formatPrice } from '../../utils/format-price';
import DeleteIcon from '../../icons/delete';
import { NumericInput } from '../numeric-input';
import styles from './line-item.module.css';
import { SingleLineItemType } from '@/lib/types';

export function LineItem({ item }: SingleLineItemType) {
  const { removeLineItem, checkout, updateLineItem, loading } =
    React.useContext(StoreContext);
  const [quantity, setQuantity] = React.useState(item.quantity);

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  };
  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount),
  );

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity,
  );

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id);
  };

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300,
  );
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value: any) => uli(value), []);

  const handleQuantityChange = (value: any) => {
    if (value !== '' && Number(value) < 1) {
      return;
    }
    setQuantity(value);
    if (Number(value) >= 1) {
      debouncedUli(value);
    }
  };

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1);
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1);
  }

  const variantIsOnSale = !!item.variant.compareAtPrice;

  return (
    <tr>
      <td>
        {variantImage && (
          <Image
            key={variantImage.src}
            src={variantImage.originalSrc}
            alt={variantImage.altText ?? item.variant.title}
            width={160}
            height={100}
          />
        )}
      </td>
      <td>
        <h2 className={styles.title}>{item.title}</h2>
        <div className={styles.variant}>
          {item.variant.title === 'Default Title' ? '' : item.variant.title}
        </div>
        <div className={styles.remove}>
          <button onClick={handleRemove}>
            <DeleteIcon /> Remove
          </button>
        </div>
      </td>
      <td className={styles.priceColumn}>
        <p className={styles.sale}>
          {variantIsOnSale && item.variant.compareAtPrice}
        </p>
        <p className={[variantIsOnSale && styles.oldPrice].join(' ')}>
          {formatPrice(
            item.variant.priceV2.currencyCode,
            parseInt(item.variant.priceV2.amount),
          )}
        </p>
      </td>
      <td>
        <NumericInput
          disabled={loading}
          quantity={quantity}
          aria-label="Quantity"
          onIncrement={doIncrement}
          onDecrement={doDecrement}
          onChangeQuantity={(e) => handleQuantityChange(e.currentTarget.value)}
          min="1"
          max="20"
        />
      </td>
      <td className={styles.totals}>
        <p className={styles.saleSubtotal}>
          {variantIsOnSale &&
            formatPrice(
              checkout.currencyCode,
              Number(item.variant.priceV2.amount) * quantity,
            )}
        </p>
        <p className={[variantIsOnSale && styles.oldSubtotal].join(' ')}>
          {subtotal}
        </p>
      </td>
    </tr>
  );
}
