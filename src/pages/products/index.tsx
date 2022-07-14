import * as React from 'react';

import { StoreContext } from '@/context/store-context'
 
import { getAllProducts, getSingleProductByHandle } from '@/lib/queries';
import { AllProductsType } from '@/lib/types';

import { Layout } from '../../components/layout';
import { ProductListing } from '../../components/product-listing';
import { Seo } from '../../components/seo';
import { MoreButton } from '../../components/more-button';

import styles from './index.module.css';

export default function Products({ data }: AllProductsType) {

  const { queryClient } = React.useContext(StoreContext);

  const { collections, products } = data;
  React.useEffect(() => {
    products.edges.forEach((product) => {
      const handle = product.node.handle;
      queryClient.prefetchQuery('getSingleProductByHandle', async () => {
        await getSingleProductByHandle(handle);
      });
    });
  }, []);

  return (
    <Layout collections={collections}>
      <Seo title="All Products" />
      <h1 className={styles.title}>Products</h1>
      <ProductListing products={products} />

      {products && products.pageInfo.hasNextPage && (
        <MoreButton href={'search#more'}>More products</MoreButton>
      )}
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
    props: { data: null },
  };
}
