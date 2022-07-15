import * as React from 'react';
import { any } from 'zod';
import styles from './check-filter.module.css';

interface pageProps {
  items: {
    edges: [
      {
        node: string;
      },
    ];
  };
  name: any;
  selectedItems: any;
  setSelectedItems: any;
  open?: boolean;
}

export function CheckFilter({
  items,
  name,
  selectedItems = [],
  setSelectedItems,
  open = true,
}: pageProps) {
  const toggleItem = ({ currentTarget: input }: any) => {
    if (input.checked) {
      setSelectedItems([...selectedItems, input.value]);
    } else {
      const idx = selectedItems.indexOf(input.value);
      if (idx === -1) {
        return;
      }
      const newItems = [
        ...selectedItems.slice(0, idx),
        ...selectedItems.slice(idx + 1),
      ];
      setSelectedItems(newItems);
    }
  };

  const clearItems = () => {
    setSelectedItems([]);
  };
  return (
    <details open={open} className={styles.filter}>
      {name && (
        <summary>
          <div className={styles.summary}>
            {name}{' '}
            {selectedItems.length ? (
              <button className={styles.clearButton} onClick={clearItems}>
                Clear
              </button>
            ) : undefined}
          </div>
        </summary>
      )}
      <div className={styles.filterOptions}>
        {items.edges.map((item, idx) => (
          <label
            className={
              selectedItems.includes(item.node)
                ? styles.selectedLabel
                : undefined
            }
            key={idx}
          >
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={toggleItem}
              value={item.node}
              checked={selectedItems.includes(item.node)}
            />{' '}
            {item.node || 'None'}
          </label>
        ))}
      </div>
    </details>
  );
}
