import * as React from 'react';

import { Layout } from '../../components/layout';
import { ProductListing } from '../../components/product-listing';
import { Seo } from '../../components/seo';
import { MoreButton } from '../../components/more-button';

import styles from './index.module.css';

import {
  getAllCollections,
  getAllProductsByHandle,
  getSingleProductByHandle,
} from '@/lib/queries';
import { AllCollectionsType, AllproductsByHandleType } from '@/lib/types';

import { GetStaticPaths, GetStaticProps } from 'next';
import { queryClient } from '@/lib/queryClient';

export default function ProductTypeIndex({ data }: AllproductsByHandleType) {
  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      collectionByHandle.products.edges.forEach((product) => {
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

  const { collectionByHandle, collections } = data;

  return (
    <Layout collections={collections}>
      <Seo title={`Category: ${collectionByHandle.handle}`} />
      <h2 className={styles.subtitle}>{collectionByHandle.description}</h2>
      <h1 className={styles.title}>{collectionByHandle.handle}</h1>

      <ProductListing products={collectionByHandle.products} />
      {collectionByHandle.products.pageInfo.hasNextPage && (
        <MoreButton href={`/search?p=${collectionByHandle.handle}#more`}>
          More Products
        </MoreButton>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { edges }: AllCollectionsType = await getAllCollections();

  const paths = edges.map((param) => ({
    params: { collectionHandle: param.node.handle },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const param = JSON.stringify(context.params).split(':')[1].slice(1, -2);

  const { data } = await getAllProductsByHandle(param);

  if (data) {
    return {
      props: { data },
    };
  }
  return {
    props: { data: {} },
  };
};
