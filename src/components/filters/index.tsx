import * as React from 'react';

import { CheckFilter } from '../check-filter';
import { CurrencyField } from '../currency-field';

import styles from './filters.module.css';

import { queryTypes } from '@/utils/search';

interface CompProps {
  currencyCode: string;
  productTypes: { edges: [{ node: string }] };
  tags: { edges: [{ node: string }] };
  vendors: { edges: [{ node: string }] };
  filters: queryTypes;
  setFilters: (filters: any) => void;
}

export function Filters({
  currencyCode,
  productTypes,
  tags,
  vendors,
  filters,
  setFilters,
}: CompProps) {
  const updateFilter = (key: string, value: string | number) => {
    setFilters((filters: CompProps['filters']) => ({
      ...filters,
      [key]: value,
    }));
  };

  const updateNumeric = (key: string, value: string) => {
    updateFilter(key, value);
  };

  return (
    <>
      <CheckFilter
        name="Type"
        items={productTypes}
        selectedItems={filters.productTypes}
        setSelectedItems={(value: string) =>
          updateFilter('productTypes', value)
        }
      />
      <hr />
      <details className={styles.priceFilterStyle} open={true}>
        <summary>
          <div className={styles.summary}>
            Price
            {(filters.maxPrice || filters.minPrice) && (
              <button
                className={styles.clearButton}
                onClick={() =>
                  setFilters((filters: CompProps['filters']) => ({
                    ...filters,
                    maxPrice: '',
                    minPrice: '',
                  }))
                }
              >
                Reset
              </button>
            )}
          </div>
        </summary>
        <div className={styles.priceFields}>
          <CurrencyField
            symbol="EUR"
            aria-label="Minimum price"
            price={filters.minPrice}
            onPriceChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateNumeric('minPrice', event.currentTarget.value)
            }
          />{' '}
          –{' '}
          <CurrencyField
            symbol="EUR"
            aria-label="Maximum price"
            price={filters.maxPrice}
            onPriceChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateNumeric('maxPrice', event.currentTarget.value)
            }
          />
        </div>
      </details>
      <hr />
      <CheckFilter
        name="Brands"
        items={vendors}
        selectedItems={filters.vendors}
        setSelectedItems={(value: string) => updateFilter('vendors', value)}
      />
      <hr />
      <CheckFilter
        open={true}
        name="Tags"
        items={tags}
        selectedItems={filters.tags}
        setSelectedItems={(value: string) => updateFilter('tags', value)}
      />
    </>
  );
}
