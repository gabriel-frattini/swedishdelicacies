import * as React from 'react';

import { getAllProducts, getSingleProductByHandle } from '@/lib/queries';
import { AllProductsType } from '@/lib/types';

import { Layout } from '@/components/layout';
import { ProductListing } from '@/components/product-listing';
import { Seo } from '@/components/seo';

import styles from './index.module.css';
import { GetStaticProps } from 'next';
import NotFound from '@/components/404';

export default function Products({ data }: AllProductsType) {
  const { collections, products } = data;

  if (Object.keys(data).length === 0) {
    return <NotFound />;
  }

  return (
    <Layout collections={collections} activePage={'0'}>
      <Seo title="All Products" />
      <h1 className={styles.title}>Products</h1>
      <ProductListing products={products} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
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
};
