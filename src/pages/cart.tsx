import * as React from 'react';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { StoreContext } from '../context/store-context';
import { LineItem } from '../components/line-item';
import { formatPrice } from '../utils/format-price';
import styles from './cart.module.css';
import { getAllCollections } from '@/lib/queries';

export default function CartPage({ collections }: any) {
  const { checkout, loading } = React.useContext(StoreContext);
  const emptyCart = checkout.lineItems.length === 0;

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

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
            <Link
              replace
              href="/search?s=BEST_SELLING"
              className={styles.emptyStateLink}
            >
              View trending products
            </Link>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Your cart</h1>
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
                {/* {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))} */}

                <tr className={styles.summary}>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.collapseColumn}></td>
                  <td className={styles.labelColumn}>Subtotal</td>
                  <td className={styles.totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount,
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
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount,
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
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount,
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
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const collections = await getAllCollections();

  return {
    props: { collections },
  };
}
