import * as React from 'react';
import slugify from '@sindresorhus/slugify';
import debounce from 'debounce';
import { CgChevronRight, CgChevronLeft } from 'react-icons/cg';
import { Layout } from '@/components/layout';
import CrossIcon from '../icons/cross';
import SortIcon from '../icons/sort';
import FilterIcon from '../icons/filter';
import SearchIcon from '../icons/search';
import { ProductCard } from '../components/product-card';
import { useProductSearch } from '../utils/hooks';
import { getValuesFromQuery } from '../utils/search';
import { getCurrencySymbol } from '../utils/format-price';
import { Spinner } from '../components/progress';
import { Filters } from '../components/filters';
import styles from './search-page.module.css';
import { getAllProductsWithMetaFields } from '@/lib/queries';
import { useRouter } from 'next/router';

import { queryTypes } from '@/utils/search';
import { useSearchType } from '@/utils/hooks';
import { AllProductsType, SingleProductType } from '@/lib/types';

const DEFAULT_PRODUCTS_PER_PAGE = 24;

interface PageProps {
  data: {
    collections: AllProductsType['data']['collections'];
    products: AllProductsType['data']['products'];
    shop: {
      productTypes: {
        edges: [node: string];
      };
      productVendors: {
        edges: [node: string];
      };
      productTags: {
        edges: [node: string];
      };
    };
  };
}

export default function SearchPage({ data }: PageProps) {
  // These default values come from the page query string
  const router = useRouter();
  const queryParams = getValuesFromQuery(router.query);

  const [filters, setFilters] = React.useState(queryParams);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialFilters = React.useMemo(() => queryParams, []);
  const [sortKey, setSortKey] = React.useState(queryParams.sortKey);
  // // We clear the hash when searching, we want to make sure the next page will be fetched due the #more hash.
  const shouldLoadNextPage = React.useRef(false);

  // // This modal is only used on mobile
  const [showModal, setShowModal] = React.useState(false);

  const [hash, setHash] = React.useState('');
  React.useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const {
    products,
    isFetching,
    filterCount,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useProductSearch(
    filters,
    {
      allProductTypes: data.shop ? data.shop.productTypes.edges : [],
      allVendors: data.shop ? data.shop.productVendors.edges : [],
      allTags: data.shop ? data.shop.productTags.edges : [],
    },
    sortKey,
    false,
    DEFAULT_PRODUCTS_PER_PAGE,
    data.products,
    initialFilters,
  );

  // Scroll up when navigating
  React.useEffect(() => {
    if (!showModal) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
        // eslint-disable-next-line react-hooks/exhaustive-deps
      });
    }
  }, [products, showModal]);

  // // Stop page from scrolling when modal is visible
  React.useEffect(() => {
    if (showModal) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [showModal]);

  // // Automatically load the next page if "#more" is in the URL
  React.useEffect(() => {
    if (hash === '#more') {
      // save state so we can fetch it when the first page got fetched to retrieve the cursor
      shouldLoadNextPage.current = true;
    }

    if (shouldLoadNextPage.current) {
      if (hasNextPage) {
        fetchNextPage();
      }

      shouldLoadNextPage.current = false;
    }
  }, [hash, hasNextPage, fetchNextPage]);

  if (!Object.keys(data).length) {
    return null;
  }
  return (
    <>
      <Layout collections={data.collections}>
        <div className={styles.main}>
          <div className={styles.search}>
            <SearchBar defaultTerm={filters.term} setFilters={setFilters} />
            <button
              className={[
                styles.filterButton,
                filterCount ? styles.activeFilters : undefined,
              ].join(' ')}
              onClick={() => setShowModal((show) => !show)}
              // This is hidden because the filters are already visible to
              // screenreaders, so the modal isnt needed.
              aria-hidden
            >
              <FilterIcon />
            </button>
            <div className={styles.sortSelector}>
              {/* <label>
                <span>Sort by:</span>
                <select
                  value={sortKey}
                  // eslint-disable-next-line
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="RELEVANCE">Relevance</option>
                  <option value="PRICE">Price</option>
                  <option value="TITLE">Title</option>
                  <option value="CREATED_AT">New items</option>
                  <option value="BEST_SELLING">Trending</option>
                </select>
              </label> */}
              <SortIcon className={styles.sortIcon} />
            </div>
          </div>
          <section
            className={[styles.filterStyle, showModal && styles.modalOpen].join(
              ' ',
            )}
          >
            <div className={styles.filterTitle}>
              <h2>Filter</h2>
              <button aria-hidden onClick={() => setShowModal(false)}>
                <CrossIcon />
              </button>
            </div>
            <div className={styles.filterWrap}>
              <Filters
                setFilters={setFilters}
                filters={filters}
                tags={data.shop.productTags}
                vendors={data.shop.productVendors}
                productTypes={data.shop.productTypes}
                currencyCode={'EUR'}
              />
            </div>
          </section>
          <section className={styles.results}>
            {isFetching ? (
              <p className={styles.progressStyle}>
                <Spinner aria-valuetext="Searching" /> Searching
                {filters.term ? ` for "${filters.term}"…` : `…`}
              </p>
            ) : (
              <p className={styles.resultsStyle}>
                Search results{' '}
                {filters.term && (
                  <>
                    for "<span>{filters.term}</span>"
                  </>
                )}
              </p>
            )}
            {!isFetching && (
              <ul className={styles.productList}>
                {products &&
                  products.edges.map((node, index) => (
                    <li className={styles.productListItem} key={index}>
                      <ProductCard eager={index === 0} product={node} />
                    </li>
                  ))}
              </ul>
            )}
            {!isFetching && products && products.edges.length === 0 && (
              <div className={styles.emptyState}>No results found</div>
            )}
            {hasPreviousPage || hasNextPage ? (
              <Pagination
                fetchPreviousPage={fetchPreviousPage}
                hasPreviousPage={hasPreviousPage}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
              />
            ) : undefined}
          </section>
        </div>
      </Layout>
    </>
  );
}
interface searchProps {
  defaultTerm: string;
  setFilters: React.Dispatch<React.SetStateAction<queryTypes>>;
}

function SearchBar({ defaultTerm, setFilters }: searchProps) {
  const [term, setTerm] = React.useState(defaultTerm);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilters = React.useCallback(
    debounce((value: string) => {
      setFilters((filters) => ({ ...filters, term: value }));
    }, 200),
    [setFilters],
  );

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
      <SearchIcon aria-hidden className={styles.searchIcon} />
      <input
        type="text"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          debouncedSetFilters(e.target.value);
        }}
        placeholder="Search..."
      />
      {term ? (
        <button
          className={styles.clearSearch}
          type="reset"
          onClick={() => {
            setTerm('');
            setFilters((filters) => ({ ...filters, term: '' }));
          }}
          aria-label="Clear search query"
        >
          <CrossIcon />
        </button>
      ) : undefined}
    </form>
  );
}
/**
 * Shopify only supports next & previous navigation
 */
function Pagination({
  fetchPreviousPage,
  hasPreviousPage,
  fetchNextPage,
  hasNextPage,
}: Pick<
  useSearchType,
  'fetchNextPage' | 'hasNextPage' | 'fetchPreviousPage' | 'hasPreviousPage'
>) {
  return (
    <nav className={styles.pagination}>
      <button
        className={styles.paginationButton}
        disabled={!hasPreviousPage}
        onClick={fetchPreviousPage}
        aria-label="Previous page"
      >
        <CgChevronLeft />
      </button>
      <button
        className={styles.paginationButton}
        disabled={!hasNextPage}
        onClick={fetchNextPage}
        aria-label="Next page"
      >
        <CgChevronRight />
      </button>
    </nav>
  );
}

export async function getServerSideProps() {
  const { data } = await getAllProductsWithMetaFields();
  if (data) {
    return {
      props: { data },
    };
  }

  return {
    props: { data: {} },
  };
}
