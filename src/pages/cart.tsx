import * as React from 'react';
import Link from 'next/link';
import debounce from 'lodash.debounce';

import { StoreContext } from '../context/store-context';

import { formatPrice } from '../utils/format-price';
import { getAllCollections, getRecommendedProducts } from '@/lib/queries';
import {
  AllCollectionsType,
  AllProductsType,
  SingleProductType,
} from '@/lib/types';

import ShippingBanner from '@/components/shipping';
import { Layout } from '../components/layout';
import { LineItem } from '../components/line-item';
import { ProductCard } from '@/components/product-card';

import styles from './cart.module.css';
import { useQuery } from 'react-query';
import { NumericInput } from '@/components/numeric-input';
import { AddToCart } from '@/components/add-to-cart';

interface pageProps {
  collections: AllCollectionsType;
}

export default function CartPage({ collections }: pageProps) {
  const { checkout, loading } = React.useContext(StoreContext);
  const emptyCart = checkout.lineItems.length === 0;
  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  const { data, isLoading } = useQuery<AllProductsType['data']>(
    'getRecommendedProducts',
    async () => await getRecommendedProducts(),
  );

  return (
    <Layout collections={collections} activePage="">
      <div className={styles.wrap}>
        {emptyCart ? (
          <div className={styles.emptyStateContainer}>
            <h1 className={styles.emptyStateHeading}>Your cart is empty</h1>
            <p>
              Looks like you haven’t found anything yet. We understand that
              sometimes it’s hard to choose — maybe this helps:
            </p>
            <Link replace href="/search?s=BEST_SELLING">
              <p className={styles.emptyStateLink}>View trending products</p>
            </Link>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Your cart</h1>
            <ShippingBanner
              currencyCode={checkout.currencyCode}
              total={checkout.totalPrice}
              freeShippingLimit={300}
            />
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.imageHeader}>Image</th>
                  <th className={styles.productHeader}>Product</th>
                  <th className={styles.collapseColumn}>Price</th>
                  <th>Qty.</th>
                  <th
                    className={[styles.totals, styles.collapseColumn].join(' ')}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className={styles.summary}>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.labelColumn}>Subtotal</td>
                  <td className={styles.totals}>
                    {formatPrice(
                      checkout.currencyCode,
                      parseInt(checkout.subtotalPrice),
                    )}
                  </td>
                </tr>
                <tr className={styles.summary}>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.labelColumn}>Taxes</td>
                  <td className={styles.totals}>
                    {formatPrice(
                      checkout.currencyCode,
                      parseInt(checkout.totalTax),
                    )}
                  </td>
                </tr>
                <tr className={styles.summary}>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.labelColumn}>Shipping</td>
                  <td className={styles.totals}>Calculated at checkout</td>
                </tr>
                <tr className={styles.grandTotal}>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.labelColumn}>Total Price</td>
                  <td className={styles.totals}>
                    {formatPrice(
                      checkout.currencyCode,
                      parseInt(checkout.totalPrice),
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={styles.checkoutButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                fill="#1a3050"
              >
                <path d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V10q0-.825.588-1.413Q5.175 8 6 8h1V6q0-2.075 1.463-3.538Q9.925 1 12 1t3.538 1.462Q17 3.925 17 6v2h1q.825 0 1.413.587Q20 9.175 20 10v10q0 .825-.587 1.413Q18.825 22 18 22ZM9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6ZM6 20h12V10H6v10Zm6-3q.825 0 1.413-.587Q14 15.825 14 15q0-.825-.587-1.413Q12.825 13 12 13q-.825 0-1.412.587Q10 14.175 10 15q0 .825.588 1.413Q11.175 17 12 17Zm0-2Z" />
              </svg>
              Checkout
            </button>
            <section className={styles.recommendedSection}>
              <h2 className={styles.recommendedText}>
                Other customers also bought
              </h2>
              <ul className={styles.recommendedListing}>
                {data?.products.edges.map(({ node }, idx) => (
                  <li key={idx} className={styles.recommendedProduct}>
                    <RecommendedProductCard node={node} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}

interface RecommendedCardProps {
  node: SingleProductType;
}

const RecommendedProductCard = (node: RecommendedCardProps) => {
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleQuantityChange = (value: any) => {
    if (value !== '' && Number(value) < 1) {
      return;
    }
    setQuantity(value);
    if (Number(value) >= 1) {
    }
  };

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1);
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1);
  }

  if (!node) {
    return <div></div>;
  }
  return (
    <>
      <ProductCard product={node} />
      <div className={styles.quickbuy}>
        <NumericInput
          quantity={quantity}
          aria-label="Quantity"
          onIncrement={doIncrement}
          onDecrement={doDecrement}
          onChangeQuantity={(e) => handleQuantityChange(e.currentTarget.value)}
          min="1"
          max="20"
        />
        <AddToCart
          available={true}
          simple={true}
          quantity={quantity}
          variantId={node.node.variants.nodes[0].id}
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const collections = await getAllCollections();

  return {
    props: { collections },
  };
}
