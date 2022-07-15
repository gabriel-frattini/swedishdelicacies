import * as React from 'react';

import { queryClient } from '@/lib/queryClient';
import { getAllProducts, getSingleProductByHandle } from '@/lib/queries';
import { AllProductsType } from '@/lib/types';

import { Layout } from '@/components/layout';
import { ProductListing } from '@/components/product-listing';
import { Seo } from '@/components/seo';
import { MoreButton } from '@/components/more-button';

import styles from './index.module.css';

export default function Products({ data }: AllProductsType) {
  const { collections, products } = data;
  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      products.edges.forEach((product) => {
        const handle = product.node.handle;
        queryClient.prefetchQuery('getSingleProductByHandle', async () => {
          await getSingleProductByHandle(handle);
        });
      });
    }
  }, []);

  if (!Object.keys(data).length) {
    return null;
  }

  return (
    <Layout collections={collections}>
      <Seo title="All Products" />
      <h1 className={styles.title}>Products</h1>
      <ProductListing products={products} />
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await getAllProducts();

  if (data) {
    return {
      props: { data },
    };
  }

  return {
    props: { data: {} },
  };
}
