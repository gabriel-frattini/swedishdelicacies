import * as React from 'react';

import { queryClient } from '@/lib/queryClient';
import { getAllProducts, getSingleProductByHandle } from '@/lib/queries';
import { AllProductsType } from '@/lib/types';

import { Layout } from '@/components/layout';
import { ProductListing } from '@/components/product-listing';
import { Seo } from '@/components/seo';

import styles from './index.module.css';
import { useRouter } from 'next/router';

export default function Products({ data }: AllProductsType) {
  const router = useRouter();
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
    router.push('/404');
    return;
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
  try {
    const { data } = await getAllProducts();

    if (data) {
      return {
        props: { data },
      };
    }

    return {
      props: { data: {} },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { data: {} },
    };
  }
}
