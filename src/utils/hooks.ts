import { useEffect, useState, useMemo } from 'react';
import queryString from 'query-string';
import { useQuery } from 'react-query';
import { createQuery } from './search';
import { getProductsFromQuery } from '@/lib/queries';
import { AllProductsType } from '@/lib/types';

function makeQueryStringValue(allItems: any, selectedItems: any) {
  if (allItems.length === selectedItems.length) {
    return [];
  }
  return selectedItems;
}

export function useProductSearch(
  filters,
  { allTags, allProductTypes, allVendors },
  sortKey,
  pause = false,
  count = 20,
  initialData = [],
  initialFilters,
) {
  const [query, setQuery] = useState(createQuery(filters));
  const [cursors, setCursors] = useState<{
    before: string | null;
    after: string | null;
  }>({
    before: null,
    after: null,
  });
  const [initialRender, setInitialRender] = useState(true);
  const { term, tags, productTypes, minPrice, maxPrice, vendors } = filters;

  // Relevance is non-deterministic if there is no query, so we default to "title" instead
  const initialSortKey = filters.term ? 'RELEVANCE' : 'TITLE';

  // only fetch after the filters have changed
  const shouldPause = useMemo(
    () => query === createQuery(initialFilters) || pause,
    [query, pause, initialFilters],
  );
  const [result, setResult] = useState<AllProductsType['data']>();
  const { isLoading } = useQuery(
    ['getProductsBySearch', query],
    async () =>
      await getProductsFromQuery({
        variables: {
          query,
          sortKey: sortKey || initialSortKey,
          first: !cursors.before ? count : null,
          last: cursors.before ? count : null,
          after: cursors.after,
          before: cursors.before,
        },
      }).then((res) => setResult(res)),
  );

  useEffect(() => {
    const qs = queryString.stringify({
      // Don't show if falsy
      q: term || undefined,
      x: maxPrice || undefined,
      n: minPrice || undefined,
      // Don't show if sort order is default
      s: sortKey === initialSortKey ? undefined : sortKey,
      // Don't show if all values are selected
      p: makeQueryStringValue(allProductTypes, productTypes),
      v: makeQueryStringValue(allVendors, vendors),
      t: makeQueryStringValue(allTags, tags),
      c: cursors.after || undefined,
    });

    const url = new URL(window.location.href);
    url.search = qs;
    url.hash = '';
    window.history.replaceState({}, '', url.toString());
    setQuery(createQuery(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, cursors, sortKey]);

  const fetchPreviousPage = () => {
    // when we go back we want all products before the first one of our array
    const previousCursor = result ? result.products.edges[0].cursor : null;
    setCursors({
      before: previousCursor,
      after: null,
    });
  };
  const fetchNextPage = () => {
    // when we go forward we want all products after the first one of our array
    const prods = result ? result.products.edges : [];
    const nextCursor = prods[prods.length - 1].cursor;
    setCursors({
      before: null,
      after: nextCursor,
    });
  };

  const filterCount =
    (filters.tags.length === allTags.length ? 0 : filters.tags.length) +
    (filters.productTypes.length === allProductTypes.length
      ? 0
      : filters.productTypes.length) +
    (filters.vendors.length === allVendors.length
      ? 0
      : filters.vendors.length) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  let hasPreviousPage;
  let hasNextPage;

  const products = useMemo(() => {
    if (query === createQuery(initialFilters)) {
      return initialData;
    }
    if (result && initialRender) setInitialRender(false);
    return result?.products.edges || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, result, initialData, initialFilters]);
  if (result) {
    hasPreviousPage = result ? result.products.pageInfo.hasPreviousPage : false;
    hasNextPage = result ? result.products.pageInfo.hasNextPage : false;
  }

  const isFetching = isLoading;
  return {
    data: result,
    isFetching,
    hasPreviousPage,
    hasNextPage,
    products,
    filterCount,
    fetchNextPage,
    fetchPreviousPage,
  };
}
