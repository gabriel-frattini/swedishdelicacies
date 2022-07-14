import * as React from 'react';
import Image from 'next/image';
import debounce from 'lodash.debounce';

import { StoreContext } from '../context/store-context';
import { formatPrice } from '../utils/format-price';
import DeleteIcon from '../icons/delete';
import { NumericInput } from './numeric-input';
import styles from './line-item.module.css';

export function LineItem({ item }) {
  const { removeLineItem, checkout, updateLineItem, loading } =
    React.useContext(StoreContext);
  const [quantity, setQuantity] = React.useState(item.quantity);

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.originalSrc,
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
  const debouncedUli = React.useCallback((value) => uli(value), []);

  const handleQuantityChange = (value) => {
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


  return (
    <tr>
      <td>
        {image && (
          <Image
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
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
      <td className={styles.priceColumn}>{price}</td>
      <td>
        <NumericInput
          disabled={loading}
          value={quantity}
          aria-label="Quantity"
          onIncrement={doIncrement}
          onDecrement={doDecrement}
          onChange={(e) => handleQuantityChange(e.currentTarget.value)}
        />
      </td>
      <td className={styles.totals}>{subtotal}</td>
    </tr>
  );
}
