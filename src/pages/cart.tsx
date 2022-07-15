import * as React from 'react';
import Link from 'next/link';
import { StoreContext } from '../context/store-context';

import { formatPrice } from '../utils/format-price';
import { getAllCollections, getRecommendedProducts } from '@/lib/queries';
import { AllCollectionsType, AllProductsType } from '@/lib/types';

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

  const { data, isLoading } = useQuery(
    'getRecommendedProducts',
    async () => await getRecommendedProducts(),
  );

  return (
    <Layout collections={collections}>
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
              Checkout
            </button>
            <RecommendedSection data={data} />
          </>
        )}
      </div>
    </Layout>
  );
}

const RecommendedSection = ({ data }: AllProductsType) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  if (!data) {
    return <div></div>;
  }
  console.log(data.products.edges);
  return (
    <section className={styles.recommendedSection}>
      <h2 className={styles.recommendedText}>Other customers also bought</h2>
      <ul className={styles.recommendedListing}>
        {data.products.edges.map((node, idx) => (
          <li key={idx} className={styles.recommendedProduct}>
            <ProductCard product={node} />
            <div className={styles.quickbuy}>
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChangeQuantity={(event: any) =>
                  setQuantity(event.currentTarget.value)
                }
                quantity={quantity}
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
          </li>
        ))}
      </ul>
    </section>
  );
};

export async function getStaticProps() {
  const collections = await getAllCollections();

  return {
    props: { collections },
  };
}
