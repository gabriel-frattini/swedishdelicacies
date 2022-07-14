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
import {
  getAllMetaFields,
  getAllProducts,
  getAllProductsWithMetaFields,
} from '@/lib/queries';
import { AllProductsType } from '@/lib/types';
import { useRouter } from 'next/router';

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

function SearchPage({
  data: {
    collections,
    products: initialdata,
    shop: { productTags, productTypes, productVendors },
  },
}: PageProps) {
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

  const [hash, setHash] = React.useState(null);
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
      allProductTypes: productTypes,
      allVendors: productVendors,
      allTags: productTags,
    },
    sortKey,
    false,
    DEFAULT_PRODUCTS_PER_PAGE,
    initialdata.edges,
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

  const currencyCode = getCurrencySymbol(
    initialdata.edges?.[0]?.node?.priceRange?.minVariantPrice?.currencyCode,
  );

  return (
    <>
      <Layout collections={collections}>
        <h1 className={styles.visuallyHidden}>Search Results</h1>
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
              <label>
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
              </label>
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
                tags={productTags}
                vendors={productVendors}
                productTypes={productTypes}
                currencyCode={currencyCode}
              />
            </div>
          </section>
          <section
            className={styles.results}
            aria-busy={isFetching}
            aria-hidden={styles.modalOpen}
          >
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
              <ul className={styles.productListStyle}>
                {products.map((node, index) => (
                  <li className={styles.productListItem} key={node.id}>
                    <ProductCard eager={index === 0} product={node} />
                  </li>
                ))}
              </ul>
            )}
            {!isFetching && products.length === 0 && (
              <div className={styles.emptyState}>No results found</div>
            )}
            {hasPreviousPage || hasNextPage ? (
              <Pagination
                previousPage={fetchPreviousPage}
                hasPreviousPage={hasPreviousPage}
                nextPage={fetchNextPage}
                hasNextPage={hasNextPage}
              />
            ) : undefined}
          </section>
        </div>
      </Layout>
    </>
  );
}

function SearchBar({ defaultTerm, setFilters }) {
  const [term, setTerm] = React.useState(defaultTerm);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilters = React.useCallback(
    debounce((value) => {
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
function Pagination({ previousPage, hasPreviousPage, nextPage, hasNextPage }) {
  return (
    <nav className={styles.pagination}>
      <button
        className={styles.paginationButton}
        disabled={!hasPreviousPage}
        onClick={previousPage}
        aria-label="Previous page"
      >
        <CgChevronLeft />
      </button>
      <button
        className={styles.paginationButton}
        disabled={!hasNextPage}
        onClick={nextPage}
        aria-label="Next page"
      >
        <CgChevronRight />
      </button>
    </nav>
  );
}

export default function SearchPageTemplate(props) {
  return <SearchPage {...props} />;
}

export async function getStaticProps() {
  const { data } = await getAllProductsWithMetaFields();
  return {
    props: { data },
  };
}
