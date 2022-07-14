import queryString from 'query-string';

export interface queryTypes {
  term: string;
  sortKey: string;
  maxPrice: number;
  minPrice: number;
  productTypes: string[];
  tags: string[];
  vendors: string[];
}

function arrayify(value: any) {
  if (!value) {
    return [];
  }
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
}

function makeFilter(field: string, selectedItems: string[]) {
  if (!selectedItems?.length) return;
  if (selectedItems && !Array.isArray(selectedItems)) {
    selectedItems = [selectedItems];
  }
  return `(${selectedItems
    .map((item) => `${field}:${JSON.stringify(item)}`)
    .join(' OR ')})`;
}

export function createQuery(filters: queryTypes) {
  const { term, tags, productTypes, minPrice, maxPrice, vendors } = filters;
  const parts = [
    term,
    makeFilter('tag', tags),
    makeFilter('product_type', productTypes),
    makeFilter('vendor', vendors),
    // Exclude empty filter values
  ].filter(Boolean);
  if (maxPrice) {
    parts.push(`variants.price:<="${maxPrice}"`);
  }
  if (minPrice) {
    parts.push(`variants.price:>="${minPrice}"`);
  }

  return parts.join(' ');
}

/**
 * Extracts default search values from the query string or object
 * @param {string|object} query
 */

export function getValuesFromQuery(query: any): queryTypes {
  const isClient = typeof query === 'string';
  const {
    q: term,
    s: sortKey,
    x: maxPrice,
    n: minPrice,
    p,
    t,
    v,
  } = isClient ? queryString.parse(query) : query;
  return {
    term,
    sortKey,
    maxPrice,
    minPrice,
    productTypes: arrayify(p),
    tags: arrayify(t),
    vendors: arrayify(v),
  };
}
